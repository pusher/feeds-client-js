import PusherPlatform from "pusher-platform-js";
import Feed from "./feed";
import FeedsAuthorizer from "./feeds-authorizer";
import { servicePath, feedIdRegex, serviceIdRegex } from "./constants";
import { parseResponse, queryString } from "./utils";

export default class PusherFeeds {
  constructor({ serviceId, cluster, authData = {}, authEndpoint } = {}) {
    this.authData = authData;
    this.authEndpoint = authEndpoint;
    if (!serviceId || !serviceId.match(serviceIdRegex)) {
      throw new TypeError(`Invalid serviceId: ${ serviceId }`);
    }
    this.listAuthorizer = new FeedsAuthorizer({
      authEndpoint: this.authEndpoint,
      authData: {
        ...this.authData,
        path: "feeds",
        action: "READ",
      }
    });
    this.firehoseAuthorizer = new FeedsAuthorizer({
      authEndpoint: this.authEndpoint,
      authData: {
        ...this.authData,
        path: "firehose/items",
        action: "READ",
      }
    });
    this.app = new PusherPlatform.App({ serviceId, cluster });
  }

  list({ prefix, limit } = {}) {
    return parseResponse(this.app.request({
      method: "GET",
      path: `${ servicePath }/feeds` + queryString({ prefix, limit }),
      authorizer: this.listAuthorizer,
    }));
  }

  feed(feedId) {
    if (!feedId || !feedId.match(feedIdRegex)) {
      throw new TypeError(`Invalid feedId: ${ feedId }`);
    }
    const readAuthorizer = feedId.startsWith("private-") ? new FeedsAuthorizer({
      authEndpoint:  this.authEndpoint,
      authData: {
        ...this.authData,
        path: `feeds/${ feedId }/items`,
        action: "READ",
      }
    }) : null;
    return new Feed({
      app: this.app,
      feedId,
      readAuthorizer,
    });
  }

  firehose(options) {
    // TODO wrap onEvent to expose onPublish, onSubscribe, and onUnsubscribe
    return this.app.subscribe({
      ...options,
      path: `${ servicePath }/firehose/items`,
      authorizer: this.firehoseAuthorizer,
    });
  }
}

import { App } from "pusher-platform-js";
import Feed from "./feed";
import FeedsAuthorizer from "./feeds-authorizer";
import { servicePath, feedIdRegex, serviceIdRegex } from "./constants";
import { parseResponse, queryString } from "./utils";

export default class PusherFeeds {
  constructor(options) {
    options = options || {};
    this.authData = options.authData || {};
    this.authEndpoint = options.authEndpoint;
    if (!options.serviceId || !options.serviceId.match(serviceIdRegex)) {
      throw new TypeError(`Invalid serviceId: ${ options.serviceId }`);
    }
    this.authorizer = new FeedsAuthorizer({
      authEndpoint: this.authEndpoint,
      authData: {
        ...this.authData,
        type: "ADMIN",
      }
    });
    // TODO appId -> serviceId upstream
    this.app = new App({
      appId: options.serviceId,
      cluster: options.cluster,
      authorizer: this.authorizer,
    });
  }

  list(options) {
    options = options || {};
    return parseResponse(this.app.request({
      method: "GET",
      path: `${ servicePath }/feeds` + queryString({
        prefix: options.prefix,
        limit: options.limit,
      }),
      authorizer: this.authorizer,
    }));
  }

  feed(options) {
    options = options || {};
    if (!options.feedId || !options.feedId.match(feedIdRegex)) {
      throw new TypeError(`Invalid feedId: ${ options.feedId }`);
    }
    const readAuthorizer = feedId.startsWith("private-") ? new FeedsAuthorizer({
        authEndpoint:  this.authEndpoint,
        authData: {
          ...this.authData,
          feed_id: feedId,
          type: "READ",
        }
      }) : null;
    const writeAuthorizer = new FeedsAuthorizer({
      authEndpoint: this.authEndpoint,
      authData: {
        ...this.authData,
        feed_id: feedId,
        type: "WRITE",
      }
    });
    return new Feed({
      app: this.app,
      feedId,
      readAuthorizer,
      writeAuthorizer,
    });
  }

  firehose(options) {
    return this.app.subscribe({
      path: `${ servicePath }/firehose/items`,
      authorizer: this.authorizer,
      ...options,
    });
  }
}

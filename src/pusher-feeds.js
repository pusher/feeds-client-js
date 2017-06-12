import { App } from "pusher-platform-js";
import Feed from "./feed";
import FeedsAuthorizer from "./feeds-authorizer";
import { servicePath, feedIdRegex, serviceIdRegex } from "./constants";
import { parseResponse, queryString } from "./utils";

export default class PusherFeeds {
  constructor({ serviceId, cluster, authEndpoint }) {
    this.authEndpoint = authEndpoint;
    if (!serviceId || !serviceId.match(serviceIdRegex)) {
      throw new TypeError(`Invalid serviceId: ${ serviceId }`);
    }
    this.authorizer = new FeedsAuthorizer({
      authEndpoint: this.authEndpoint,
      authData: {
        type: "ADMIN",
      }
    });
    // TODO appId -> serviceId upstream
    this.app = new App({
      appId: serviceId,
      cluster,
      authorizer: this.authorizer,
    });
  }

  list({ prefix, limit }) {
    return parseResponse(this.app.request({
      method: "GET",
      path: `${ servicePath }/feeds` + queryString({ prefix, limit }),
      authorizer: this.authorizer,
    }));
  }

  feed({ feedId }) {
    if (!feedId || !feedId.match(feedIdRegex)) {
      throw new TypeError(`Invalid feedId: ${ feedId }`);
    }
    const readAuthorizer = feedId.startsWith("private-") ? new FeedsAuthorizer({
        authEndpoint:  this.authEndpoint,
        authData: {
          feed_id: feedId,
          type: "READ",
        }
      }) : null;
    const writeAuthorizer = new FeedsAuthorizer({
      authEndpoint: this.authEndpoint,
      authData: {
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
}

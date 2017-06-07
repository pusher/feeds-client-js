// TODO App -> Service upstream
import { App as Service } from "pusher-platform-js";
import Feed from "./feed";
import FeedAuthorizer from "./feed-authorizer";

const feedIdRegex = /^[a-zA-Z0-9-]+$/;
const serviceIdRegex = /^[a-zA-Z0-9-]+$/;

export default class PusherFeeds {
  constructor({ serviceId, cluster, authEndpoint }) {
    this.authEndpoint = authEndpoint;
    if (!serviceId || !serviceId.match(serviceIdRegex)) {
      throw new TypeError(`Invalid serviceId: ${ serviceId }`);
    }
    // TODO appId -> serviceId upstream
    this.service = new Service({ appId: serviceId, cluster });
  }

  feed({ feedId, authorizer, authEndpoint }) {
    if (!feedId || !feedId.match(feedIdRegex)) {
      throw new TypeError(`Invalid feedId: ${ feedId }`);
    }
    if (!authorizer && feedId.startsWith("private-")) {
      authorizer = new FeedAuthorizer({
        feedId,
        authEndpoint: authEndpoint || this.authEndpoint,
      });
    }
    return new Feed({ service: this.service, feedId, authorizer });
  }
}

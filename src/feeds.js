import PusherPlatform from "pusher-platform-js";
import Feed from "./feed";
import TokenProvider from "./token-provider";
import { servicePath, feedIdRegex, serviceIdRegex } from "./constants";
import { parseResponse, queryString } from "./utils";

export default class Feeds {
  constructor({ serviceId, cluster, authData = {}, authEndpoint } = {}) {
    this.authData = authData;
    this.authEndpoint = authEndpoint;
    if (!serviceId || !serviceId.match(serviceIdRegex)) {
      throw new TypeError(`Invalid serviceId: ${ serviceId }`);
    }
    this.listTokenProvider = new TokenProvider({
      authEndpoint: this.authEndpoint,
      authData: {
        ...this.authData,
        path: "feeds",
        action: "READ",
      }
    });
    this.firehoseTokenProvider = new TokenProvider({
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
      tokenProvider: this.listTokenProvider,
    }));
  }

  feed(feedId) {
    if (!feedId || !feedId.match(feedIdRegex)) {
      throw new TypeError(`Invalid feedId: ${ feedId }`);
    }
    const readTokenProvider = feedId.startsWith("private-") ? new TokenProvider({
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
      readTokenProvider,
    });
  }

  firehose({ onPublish, onSubscribe, onUnsubscribe, ...options } = {}) {
    if (
      typeof onPublish !== "function" &&
      typeof onSubscribe !== "function" &&
      typeof onUnsubscribe !== "function"
    ) {
      throw new TypeError(`One of onPublish, onSubscribe, or onUnsubscribe must be a function`);
    }
    const onEvent = event => {
      if (event.event_type === 0 && onPublish) {
        onPublish(event);
      } else if (event.event_type === 1 && onSubscribe) {
        onSubscribe(event);
      } else if (event.event_type === 2 && onUnsubscribe) {
        onUnsubscribe(event);
      }
    }
    return this.app.subscribe({
      ...options,
      onEvent,
      path: `${ servicePath }/firehose/items`,
      tokenProvider: this.firehoseTokenProvider,
    });
  }
}

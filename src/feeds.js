import PusherPlatform from "pusher-platform-js";
import Feed from "./feed";
import TokenProvider from "./token-provider";
import { servicePath, feedIdRegex, serviceIdRegex } from "./constants";
import { parseResponse, queryString } from "./utils";

export default class Feeds {
  constructor({
    serviceId,
    cluster,
    authData = {},
    authEndpoint,
    logLevel,
    logger,
  } = {}) {
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
    if (!logger && logLevel) {
      logger = new PusherPlatform.ConsoleLogger(logLevel);
    }
    this.app = new PusherPlatform.App({ serviceId, cluster, logger });
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
    validateFirehoseCallbacks({ onPublish, onSubscribe, onUnsubscribe });
    const onEvent = event => {
      if (event.body.event_type === 0 && onPublish) {
        onPublish(event);
      } else if (event.body.event_type === 1 && onSubscribe) {
        onSubscribe(event);
      } else if (event.body.event_type === 2 && onUnsubscribe) {
        onUnsubscribe(event);
      }
    };
    return this.app.subscribe({
      ...options,
      onEvent,
      path: `${ servicePath }/firehose/items`,
      tokenProvider: this.firehoseTokenProvider,
    });
  }
}

function validateFirehoseCallbacks(callbacks) {
  const defined = Object.keys(callbacks)
    .filter(k => callbacks[k] !== undefined)
    .map(k => ({ name: k, callback: callbacks[k] }));
  defined.forEach(({ name, callback }) => {
    if (typeof callback !== "function") {
      throw new TypeError(`${ name } must be a function, got ${ callback }`);
    }
  });
  if (defined.length === 0) {
    throw new TypeError(`Must provide at least one of onPublish, onSubscribe, or onUnsubscribe`);
  }
}

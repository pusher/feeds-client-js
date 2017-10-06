import PusherPlatform from "pusher-platform";
import Feed from "./feed";
import TokenProvider from "./token-provider";
import { feedIdRegex } from "./constants";
import { parseResponse, queryString } from "./utils";

export default class Feeds {
  constructor({
    authData = {},
    authEndpoint,
    host,
    instanceId,
    logLevel,
    logger,
  } = {}) {
    this.authData = authData;
    this.authEndpoint = authEndpoint;
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
    this.instance = new PusherPlatform.Instance({
      host,
      instanceId,
      logger,
      serviceName: "feeds",
      serviceVersion: "v1",
    });
  }

  list({ prefix, limit } = {}) {
    return parseResponse(this.instance.request({
      method: "GET",
      path: "feeds" + queryString({ prefix, limit }),
    }, this.listTokenProvider));
  }

  feed(feedId) {
    if (!feedId || !feedId.match(feedIdRegex)) {
      throw new TypeError(`Invalid feedId: ${ feedId }`);
    }
    const readTokenProvider = feedId.startsWith("private-") ? new TokenProvider({
      authEndpoint: this.authEndpoint,
      authData: {
        ...this.authData,
        path: `feeds/${ feedId }/items`,
        action: "READ",
      }
    }) : null;
    return new Feed({
      instance: this.instance,
      feedId,
      readTokenProvider,
    });
  }

  firehose({ onPublish, onSubscribe, onUnsubscribe, ...options } = {}) {
    validateFirehoseCallbacks({ onPublish, onSubscribe, onUnsubscribe });
    const onEvent = event => {
      if (event.body.type === 0 && onPublish) {
        onPublish(event.body.data);
      } else if (event.body.type === 1 && onSubscribe) {
        onSubscribe(event.body.data);
      } else if (event.body.type === 2 && onUnsubscribe) {
        onUnsubscribe(event.body.data);
      } else if (event.body.type > 2) {
        throw new TypeError(`Unsupported firehose event type '${
          event.body.type
        }'`);
      }
    };
    return this.instance.subscribeNonResuming({
      ...options,
      path: "firehose/items",
      tokenProvider: this.firehoseTokenProvider,
      listeners: {
        onEvent,
        onOpen: options.onOpen,
        onSubscribe: options.onSubscribe,
        onError: options.onError,
        onEnd: options.onEnd,
      }
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
    throw new TypeError("Must provide at least one of onPublish, onSubscribe, or onUnsubscribe");
  }
}

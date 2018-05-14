import { parseResponse, queryString } from "./utils";

export default class Feed {
  constructor({ instance, feedId, readTokenProvider }) {
    this.instance = instance;
    this.feedId = feedId;
    this.readTokenProvider = readTokenProvider;
  }

  subscribe({ onOpen, onItem, ...options } = {}) {
    if (onOpen && typeof onOpen !== "function") {
      throw new TypeError(`onOpen must be a function, got ${ onOpen }`);
    }
    if (typeof onItem !== "function") {
      throw new TypeError("Must provide an `onItem` callback");
    }
    const onEvent = event => {
      if (event.body.type === 0 && onOpen) {
        onOpen(event.body.data);
      } else if (event.body.type === 1 && onItem) {
        onItem(event.body.data);
      } else if (event.body.type > 1) {
        throw new TypeError(`Unsupported event type '${
          event.body.type
        }'`);
      }
    };
    return this.instance.subscribeResuming({
      ...options,
      // Mapping our itemId to platform library eventId
      initialEventId: options.lastItemId,
      path: `feeds/${ this.feedId }/items` + queryString({
        previous_items: options.previousItems,
      }),
      tokenProvider: this.readTokenProvider,
      listeners: {
        onEvent,
        onSubscribe: options.onSubscribe,
        onRetrying: options.onRetrying,
        onError: options.onError,
        onEnd: options.onEnd,
      }
    });
  }

  paginate({ cursor, limit = 50 } = {}) {
    return parseResponse(this.instance.request({
      method: "GET",
      path: `feeds/${ this.feedId }/items` + queryString({
        cursor,
        limit,
      }),
      tokenProvider: this.readTokenProvider,
    }));
  }
}

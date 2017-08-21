import { parseResponse, queryString } from "./utils";

export default class Feed {
  constructor({ instance, feedId, readTokenProvider }) {
    this.instance = instance;
    this.feedId = feedId;
    this.readTokenProvider = readTokenProvider;
    this.subscribed = false;
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
      } else {
        throw new TypeError(`Unsupported event type '${
          event.body.type
        }'`);
      }
    };
    return this.instance.resumableSubscribe({
      ...options,
      // Mapping our itemId to platform library eventId
      lastEventId: options.lastItemId,
      path: `feeds/${ this.feedId }/items` + queryString({
        previous_items: options.previousItems,
      }),
      tokenProvider: this.readTokenProvider,
      onEvent,
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

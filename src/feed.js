import { parseResponse, queryString } from "./utils";

class EventHandler {
  constructor({ onOpen = (() => {}), onItem }) {
    this.onOpen = onOpen;
    this.onItem = onItem;
    this.subscribed = false;
  }

  handle(event) {
    if (this.subscribed) {
      this.onItem({ id: event.eventId, ...event.body });
      return;
    }
    this.subscribed = true;
    this.onOpen(event.body);
  }
}

export default class Feed {
  constructor({ instance, feedId, readTokenProvider }) {
    this.instance = instance;
    this.feedId = feedId;
    this.readTokenProvider = readTokenProvider;
    this.subscribed = false;
  }

  subscribe(options = {}) {
    if (typeof options.onItem !== "function") {
      throw new TypeError("Must provide an `onItem` callback");
    }
    const eventHandler = new EventHandler(options);
    return this.instance.resumableSubscribe({
      ...options,
      // Mapping our itemId to platform library eventId
      lastEventId: options.lastItemId,
      path: `feeds/${ this.feedId }/items` + queryString({
        previous_items: options.previousItems,
      }),
      tokenProvider: this.readTokenProvider,
      onEvent: event => eventHandler.handle(event),
      // We highjack onOpen to parse our subscription success event
      onOpen: null,
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

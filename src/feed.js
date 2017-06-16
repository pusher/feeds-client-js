import { servicePath } from "./constants";
import { parseResponse, queryString } from "./utils";

export default class Feed {
  constructor({ app, feedId, readTokenProvider }) {
    this.app = app;
    this.feedId = feedId;
    this.readTokenProvider = readTokenProvider;
  }

  subscribe(options = {}) {
    return this.app.resumableSubscribe({
      ...options,
      path: this.itemsPath + queryString({
        tail_size: options.tailSize,
      }),
      tokenProvider: this.readTokenProvider,
      onEvent: options.onItem,
    });
  }

  getHistory({ fromId, limit = 50 } = {}) {
    return parseResponse(this.app.request({
      method: "GET",
      path: this.itemsPath + queryString({
        from_id: fromId,
        limit: limit,
      }),
      tokenProvider: this.readTokenProvider,
    }));
  }

  get itemsPath() {
    return `${ servicePath }/feeds/${ this.feedId }/items`;
  }
}

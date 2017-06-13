import { servicePath } from "./constants";
import { parseResponse, queryString } from "./utils";

export default class Feed {
  constructor({ app, feedId, readAuthorizer }) {
    this.app = app;
    this.feedId = feedId;
    this.readAuthorizer = readAuthorizer;
  }

  subscribe(options) {
    return this.app.resumableSubscribe({
      path: this.itemsPath + queryString({
        tail_size: options.tailSize,
      }),
      authorizer: this.readAuthorizer,
      onEvent: options.onItem,
      ...options,
    });
  }

  getHistory({ fromId, limit }) {
    return parseResponse(this.app.request({
      method: "GET",
      path: this.itemsPath + queryString({
        from_id: fromId,
        limit: limit,
      }),
      authorizer: this.readAuthorizer,
    }));
  }

  get itemsPath() {
    return `${ servicePath }/feeds/${ this.feedId }/items`;
  }
}

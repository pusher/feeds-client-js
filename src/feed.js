import { servicePath } from "./constants";
import { parseResponse, queryString } from "./utils";

export default class Feed {
  constructor({ app, feedId, readAuthorizer, writeAuthorizer }) {
    this.app = app;
    this.feedId = feedId;
    this.readAuthorizer = readAuthorizer;
    this.writeAuthorizer = writeAuthorizer;
  }

  subscribe(options) {
    return this.app.resumableSubscribe({
      path: this.itemsPath + queryString({
        tail_size: options.tailSize,
      }),
      authorizer: this.readAuthorizer,
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

  publish(item) {
    return publishBatch([ item ]);
  }

  publishBatch(items) {
    return parseResponse(this.app.request({
      method: "POST",
      path: this.itemsPath,
      body: { items },
      authorizer: this.writeAuthorizer,
    }));
  }

  get itemsPath() {
    return `${ servicePath }/feeds/${ this.feedId }/items`;
  }
}

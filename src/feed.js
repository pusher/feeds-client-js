import { App } from "pusher-platform-js";
import FeedAuthorizer from "./feed-authorizer";

const servicePath = "services/feeds/v1/";
const feedIdRegex = /^[a-zA-Z0-9-]+$/;

export class Feed {
  constructor(options) {
    if (!options.feedId.match(feedIdRegex)) {
      throw new TypeError(`Invalid feedId: ${ options.feedId }`);
    }
    this.feedId = options.feedId;
    if (!options.authorizer) {
      options.authorizer = new FeedAuthorizer(options);
    }
    this.app = new App(options);
  }

  subscribe(options) {
    let queryString = "";
    if (options.tailSize) {
      queryString = `?tail_size=${ options.tailSize }`;
    }
    return this.app.resumableSubscribe({
      path: this.itemsPath + queryString,
      ...options,
    });
  }

  getHistory(options) {
    let queryString = "";
    let queryParams = [];
    if (options && options.fromId) {
      queryParams.push(`from_id=${ options.fromId }`);
    }
    if (options && options.limit) {
      queryParams.push(`limit=${ options.limit }`);
    }
    if (queryParams.length > 0) {
      queryString = `?${ queryParams.join("&") }`;
    }
    return new Promise((resolve, reject) => {
      return this.app.request({
        method: "GET",
        path: this.itemsPath + queryString,
      }).then((response) => {
        try {
          resolve(JSON.parse(response));
        } catch (err) {
          reject(err);
        }
      }).catch(reject);
    });
  }

  get itemsPath() {
    return `${ servicePath }/feeds/${ this.feedId }/items`;
  }
}

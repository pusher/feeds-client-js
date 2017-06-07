const servicePath = "services/feeds/v1/";

export default class Feed {
  constructor({ service, feedId, authorizer }) {
    this.service = service;
    this.feedId = feedId;
    this.authorizer = authorizer;
  }

  subscribe(options) {
    let queryString = "";
    if (options.tailSize) {
      queryString = `?tail_size=${ options.tailSize }`;
    }
    return this.service.resumableSubscribe({
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
      return this.service.request({
        method: "GET",
        path: this.itemsPath + queryString,
      }).then(response => {
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

const cacheExpiryTolerance = 60;
const defaultAuthEndpoint = "/feeds/tokens";

function requestBody(feedId) {
  return `grant_type=client_credentials&feed_id=${ feedId }&type=READ`;
}

function now() {
  return Math.floor(Date.now() / 1000);
}

export default class FeedAuthorizer {
  constructor({ feedId, authEndpoint }) {
    this.feedId = feedId;
    this.authEndpoint = authEndpoint || defaultAuthEndpoint;
  }

  authorize() {
    if (this.cacheIsStale) {
      return this.makeAuthRequest().then(responseBody => {
        this.cache(responseBody.access_token, responseBody.expires_in);
        return this.cachedToken;
      });
    }
    return Promise.resolve(this.cachedToken);
  }

  get cacheIsStale() {
    return !this.cachedToken || now() > this.cacheValidUntil;
  }

  cache(token, expiresIn) {
    this.cachedToken = token;
    this.cacheValidUntil = now() + expiresIn - cacheExpiryTolerance;
  }

  makeAuthRequest() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", this.authEndpoint);
      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Couldn't get token from ${ this.authEndpoint }; got ${ xhr.status } ${ xhr.statusText }.`));
        }
      });
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.send(requestBody(this.feedId));
    });
  }
}

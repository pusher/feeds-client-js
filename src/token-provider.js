import {
  cacheExpiryTolerance,
  defaultAuthEndpoint,
  tokenProviderTimeout,
} from "./constants";

import { urlEncode, unixTimeNow } from "./utils";

export default class TokenProvider {
  constructor({ authEndpoint, authData }) {
    this.authEndpoint = authEndpoint || defaultAuthEndpoint;
    this.authData = authData;
  }

  fetchToken() {
    if (this.cacheIsStale) {
      return this.makeAuthRequest().then(responseBody => {
        this.cache(responseBody.access_token, responseBody.expires_in);
        return this.cachedToken;
      });
    }
    return Promise.resolve(this.cachedToken);
  }

  get cacheIsStale() {
    return !this.cachedToken || unixTimeNow() > this.cacheValidUntil;
  }

  cache(token, expiresIn) {
    this.cachedToken = token;
    this.cacheValidUntil = unixTimeNow() + expiresIn - cacheExpiryTolerance;
  }

  makeAuthRequest() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", this.authEndpoint);
      xhr.timeout = tokenProviderTimeout;
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Couldn't fetch token from ${
            this.authEndpoint
          }; got ${ xhr.status } ${ xhr.statusText }.`));
        }
      };
      xhr.ontimeout = () => {
        reject(new Error(`Request timed out while fetching token from ${
          this.authEndpoint
        }`));
      }
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.send(urlEncode({
        ...this.authData,
        grant_type: "client_credentials",
      }));
    });
  }
}

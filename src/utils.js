export function parseResponse(promise) {
  return new Promise((resolve, reject) => {
    promise.then(response => {
      try {
        resolve(JSON.parse(response));
      } catch (err) {
        reject(err);
      }
    }).catch(reject);
  });
}

export function urlEncode(data) {
  return Object.keys(data)
    .filter(key => data[key] !== undefined)
    .map(key => `${ key }=${ encodeURIComponent(data[key]) }`)
    .join("&");
}

export function queryString(data) {
  const encodedData = urlEncode(data);
  return encodedData ? `?${ encodedData }` : "";
}

export function unixTimeNow() {
  return Math.floor(Date.now() / 1000);
}

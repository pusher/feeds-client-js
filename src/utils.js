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
  return Object.keys(data).map(key => {
    return data[key] != undefined ?
      `${ key }=${ encodeURIComponent(data[key]) }` : "";
  }).join("&");
}

export function queryString(data) {
  const encodedData = urlEncode(data);
  return encodedData ? `?${ encodedData }` : "";
}

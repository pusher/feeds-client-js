# feeds-client-js
The Javascript client for Pusher Feeds.

## Installation
yarn:

```sh
$ yarn add https://github.com/pusher/feeds-client-js
```

In a script tag:

```html
<script src="https://github.com/pusher/feeds-client-js/blob/master/target/pusher-feeds-client.js"
```

## Quick start

The default export is a `PusherFeeds` class.

Instantiate a service object:

```js
const pusherFeeds = new PusherFeeds({ serviceId: your_service_id });
```

Create a feed object:

```js
const yourFeed = pusherFeeds.feed({ feedId: your_feed_id });
```

Subscribe to your feed, and log new events:

```js
yourFeed.subscribe({ onEvent: console.log });
```

## Reference

### `PusherFeeds`

Takes a single options object with the following properties.

- `serviceId`: [required] your service ID; get this from [your dashboard](https://dash.pusher.com)

- `cluster`: [optional] the cluster that your service lives on, defaults to `api-ceres.kube.pusherplatform.io`

- `authEndpiont`: [optional] the endpoint to use to request tokens for access to private channels; see [TODO](auth docs)

### `pusherFeeds.feed`

Returns a reference to a particular feed, from which subscriptions and history queries can then be made. Takes a single options object with the following properties.

- `feedId`: [required] the unique identifier of the feed

- `authorizer`: [optional] provide a custom authorizer (advanced usage, you probably just want to provide an `authEndpiont` in the `PusherFeeds` constructor!) [NOTE in fact, should we actually remove, or at least not document this? and the below property? It might cause unnecessary confusion... We are possibly making thing unnecessarily configurable too early]

- `authEndpoint`: [optional] the endpiont to use to request tokens for access to _this specific feed_ (advanced usage, in most cases you will use the same endpoint for all feeds, so you probably want to set this property in the `PusherFeeds` constructor instead!) [NOTE see above]

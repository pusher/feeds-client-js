# feeds-client-js

The Javascript client for Pusher Feeds.

## Installation

[yarn](https://yarnpkg.com/):

```sh
$ yarn add https://github.com/pusher/feeds-client-js
```

In a script tag:

```html
<script src="https://github.com/pusher/feeds-client-js/blob/master/target/pusher-feeds-client.js"></script> [TODO does this actually work?]
```

## Quick start

The default export is a `PusherFeeds` class.

Instantiate an instance of PusherFeeds:

```js
const pusherFeeds = new PusherFeeds({ serviceId: your_service_id });
```

Create a feed object:

```js
const yourFeed = pusherFeeds.feed(your_feed_id);
```

Subscribe to your feed, and log new items:

```js
yourFeed.subscribe({ onItem: console.log });
```

## Reference

### `PusherFeeds`

Takes a single options object with the following properties.

- `serviceId`: [required] your service ID; get this from [your
  dashboard](https://dash.pusher.com)

- `cluster`: [optional] the cluster that your service lives on, defaults to
  `api-ceres.kube.pusherplatform.io`

- `authEndpiont`: [optional] the endpoint to use to request tokens for access
  to private feeds; see [auth docs](TODO)

- `authData`: [optional] data to pass to the auth endpoint along with token
  requests

### `pusherFeeds.list`

List non-empty feeds. This method requires `ADMIN` permission – see [auth
docs](TODO). Takes a single options object with the following properties.

- `prefix`: [optional] only return those feeds that start with this string

- `limit`: [optional] return at most this many matches

### `pusherFeeds.firehose`

Subscribe to the firehose for this provisioned service to see all events and
subscriptions on a single subscription. This method requires `ADMIN` permission
– see [auth docs](TODO). Takes a single options object with the following
properties

- `onOpending`: [optional] callback to fire when the subscription is opening

- `onOpen`: [optional] callback to fire when the subscription is open

- `onEvent`: [optional] callback to handle events, takes each event as a
  parameter

- `onEnd`: [optional] callback to fire when the subscription ends normally

- `onError`: [optional] callback to fire when the subscription is closed with
  error

### `pusherFeeds.feed`

Returns a reference to a particular feed, from which subscriptions and history
queries can then be made. Takes a `feedId`.

### `feed.subscribe`

Subscribe to receive new items published to `feed`. A subscription can be
resumed from some previously seen item by providing a `lastEventId`, or can be
initiated with some initial state by providing a `tailSize`. Private feeds require `READ` permission – see [auth docs](TODO). Takes a single
options object with the following properties.

- `lastEventId`: [optional] retrieve every item published after `lastEventId`,
  and then live items as they are published

- `tailSize`: [optional] if this parameter is provided, then the most recent
  `tailSize` items will be retrieved, followed by live items as they are
  published (`lastEventId` takes precedence if both are provided)

- `onOpending`: [optional] callback to fire when the subscription is opening

- `onOpen`: [optional] callback to fire when the subscription is open

- `onItem`: [optional] callback to handle items, takes each item as a parameter

- `onEnd`: [optional] callback to fire when the subscription ends normally

- `onError`: [optional] callback to fire when the subscription is closed with
  error

Returns a `subscription` object with an `unsubscribe` method.

Items are passed to the `onItem` callback with the following format

```js
{
  eventId: event_id, // this corresponds to the published item_id
  headers: headers, // ignore this for now!
  body: {
    created: timestamp,
    data: item_data
  }
}
```

### `feed.getHistory`

Query a `feed` for historical items. Private feeds require `READ` permission – see [auth docs](TODO). Takes a single options object with the
following properties.

- `fromId`: [optional] look back in the past from this ID; retrieves items
  _older_ than this ID – if not provided, retrieves the most recently published
  items

- `limit`: [optional] limit the number of items to retrieve

Returns a [promise](https://mdn.io/promise) resolving with a single object of
the following format.

```js
{
  items: [
    ...
    {
      id: item_id,
      created: timestamp,
      data: item_data
    }
    ...
  ]
}
```

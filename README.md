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
const yourFeed = pusherFeeds.feed({ feedId: your_feed_id });
```

Subscribe to your feed, and log new events:

```js
yourFeed.subscribe({ onEvent: console.log });
```

## Reference

### `PusherFeeds`

Takes a single options object with the following properties.

- `serviceId`: [required] your service ID; get this from [your
  dashboard](https://dash.pusher.com)

- `cluster`: [optional] the cluster that your service lives on, defaults to
  `api-ceres.kube.pusherplatform.io`

- `authEndpiont`: [optional] the endpoint to use to request tokens for access
  to private channels; see [auth docs](TODO)

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

Returns a `subscription` object with an `unsubscribe` method.

### `pusherFeeds.feed`

Returns a reference to a particular feed, from which subscriptions and history
queries can then be made. Takes a single options object with the following
properties.

- `feedId`: [required] the unique identifier of the feed

- `authorizer`: [optional] provide a custom authorizer for this feed (advanced
  usage, you probably just want to provide an `authEndpiont` in the
  `PusherFeeds` constructor!) [NOTE in fact, should we actually remove, or at
  least not document this? and the below property? It might cause unnecessary
  confusion... We are possibly making thing unnecessarily configurable too
  early]

- `authEndpoint`: [optional] the endpiont to use to request tokens for access
  to _this specific feed_ (advanced usage, in most cases you will use the same
  endpoint for all feeds, so you probably want to set this property in the
  `PusherFeeds` constructor instead!) [NOTE see above]

### `feed.subscribe`

Subscribe to reveive new items published to `feed`. A subscription can be
resumed from some previously seen event by providing a `lastEventId`, or can be
initiated with some initial state by providing a `tailSize`. Private feeds require `READ` permission – see [auth docs](TODO). Takes a single
options object with the following properties.

- `lastEventId`: [optional] retrieve every item published after `lastEventId`,
  and then live events as they happen

- `tailSize`: [optional] if this parameter is provided, then the most recent
  `tailSize` events will be retrieved, followed by live events as they happen
  (`lastEventId` takes precedence if both are provided)

- `onOpending`: [optional] callback to fire when the subscription is opening

- `onOpen`: [optional] callback to fire when the subscription is open

- `onEvent`: [optional] callback to handle events, takes each event as a
  parameter

- `onEnd`: [optional] callback to fire when the subscription ends normally

- `onError`: [optional] callback to fire when the subscription is closed with
  error

Returns a `subscription` object with an `unsubscribe` method.

Events are passed to the `onEvent` callback with the following format

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

### `feed.publish`

Publish an item to a feed. Requires `WRITE` permission – see [auth docs](TODO). Takes a single `item` parameter, published to the feed as JSON.

### `feed.publishBatch`

As above, but takes a list of `items`, publishing each in turn.

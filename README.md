# Client JavaScript reference

The JavaScript client for Pusher Feeds. If you aren't already here, you can
find the source [on Github](https://github.com/pusher/feeds-client-js).

For more information on the Feeds service, [see
here](https://pusher.com/feeds). For full documentation, [see
here](https://pusher-mimir.herokuapp.com/feeds)

## Installation

[yarn](https://yarnpkg.com/):

```sh
$ yarn add pusher-feeds-client
```

In a script tag:

```html
<script src="https://unpkg.com/pusher-feeds-client"></script>
```

## Instantiate a Feeds object

The constructor `Feeds` takes a single options object with the following
properties.

- `serviceId`: [required] your service ID; get this from [your
  dashboard](https://dash.pusher.com)

- `cluster`: [optional] the cluster that your service lives on

- `authEndpiont`: [optional] the endpoint to use to request tokens for access
  to [private feeds](https://pusher-mimir.herokuapp.com/feeds/private-feeds/)

- `authData`: [optional] data to pass to the auth endpoint along with token
  requests

- `logLevel`: [optional] a number between 1 and 5, corresponding to `VERBOSE`,
  `DEBUG`, `INFO`, `WARNING`, and `ERROR` respectively. 1 logs everything, 5
  only logs errors etc.

- `logger`: [optional] a cutom logger implementation, must conform to the
  following interface

```ts
interface Logger {
    verbose(message: string, error?: Error);
    debug(message: string, error?: Error);
    info(message: string, error?: Error);
    warn(message: string, error?: Error);
    error(message: string, error?: Error);
}
```

### Example

```js
const feeds = new Feeds({ serviceId: your_service_id });
```

## Get a reference to a feed

Given the `feeds` object above, `feeds.feed` Returns a reference to a
particular feed, from which subscriptions and history queries can then be made.
Takes a `feedId`.

### Example

```js
const yourFeed = feeds.feed(your_feed_id);
```

## Subscribe to a feed

Given a feed object such as `yourFeed` above, use `yourFeed.subscribe` to
receive new items published to `yourFeed`. A subscription can be resumed from
some previously seen item by providing a `lastEventId`, or can be initiated
with a fixed number of previously seen items by providing the `previousItems`
option.  [Private
feeds](https://pusher-mimir.herokuapp.com/feeds/private-feeds/) require `"READ"`
permission. Takes a single options object with the following properties.

- `onItem`: [required] callback to handle items, takes each item as a parameter

- `lastEventId`: [optional] retrieve every item published after `lastEventId`,
  and then live items as they are published

- `previousItems`: [optional] if this parameter is provided, then the most recent
  `previousItems` items will be retrieved, followed by live items as they are
  published (`lastEventId` takes precedence if both are provided)

- `onOpen`: [optional] callback to fire when the subscription is open

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

### Example

```js
const subscription = feed.subscribe({
  previousItems: 10,
  onItem: ({ body: { created, data } }) => {
    // Update the DOM with the item data
  },
  onError: error => {
    console.error(`Error with subscription: ${error}`)
  },
});

// Unsubscribe after 5 seconds
setTimeout(subscription.unsubscribe, 5000);
```

## Querying history

Given a feed object such as `yourFeed` above, use `yourFeed.getHistory` to
query a feed for historical items. [Private
feeds](https://pusher-mimir.herokuapp.com/feeds/private-feeds/) require `"READ"`
permission. Takes a single (optional) options object with the following
properties.

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

### Example

```js
// Get the last 25 items (but don’t subscribe)
yourFeed.getHistory({ limit: 25 }).then(({ items }) => {
  // Update the DOM with the items
});
```

## List feeds for an instance

Given a feeds object `feeds`, `feeds.list` lists non-empty feeds. This method
requires `"READ"` permission on the path `"feeds"`, see the [auth
docs](https://pusher-mimir.herokuapp.com/feeds/private-feeds/).
Takes a single options object with the following properties.

- `prefix`: [optional] only return those feeds that start with this string

- `limit`: [optional] return at most this many matches

## Subscribe to the Firehose

Given a feeds object `feeds`, `feeds.firehose` subscribes to the firehose for
this instance to see all events and subscriptions on a single subscription.
This method requires `"READ"` permission on the path `"firehose/items"` – see
[auth docs](https://pusher-mimir.herokuapp.com/feeds/private-feeds/).  Takes a
single options object with the following properties

- `onPublish`: callback to fire when a Publish event is received

- `onSubscribe`: callback to fire when a Subscribe event is received

- `onUnsubscribe`: callback to fire when an Unsubscribe event is received

- `onOpen`: [optional] callback to fire when the subscription is open

- `onEnd`: [optional] callback to fire when the subscription ends normally

- `onError`: [optional] callback to fire when the subscription is closed with
  error

At least one of `onPublish`, `onSubscribe`, and `onUnsubscribe` must be
provided.

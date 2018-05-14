# Feeds Client JavaScript reference

The JavaScript client for Pusher Feeds. If you aren't already here, you can
find the source [on Github](https://github.com/pusher/feeds-client-js).

For more information on the Feeds service, [see
here](https://pusher.com/feeds). For full documentation, [see
here](https://docs.pusher.com/feeds)

## Installation

[yarn](https://yarnpkg.com/):

```sh
$ yarn add @pusher/feeds
```

In a script tag:

```html
<script src="https://unpkg.com/@pusher/feeds"></script>
```

## Instantiate a Feeds object

The constructor `Feeds` takes a single options object with the following
properties.

- `instanceLocator`: [required] get this from [your
  dashboard](https://dash.pusher.com)

- `authEndpiont`: [optional] the endpoint to use to request tokens for access
  to [private feeds](http://docs.pusher.com/feeds/concepts/private-feeds)

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
const feeds = new Feeds({ instanceLocator: your_instance_locator });
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
some previously seen item by providing a `lastItemId`, or can be initiated
with a fixed number of previously seen items by providing the `previousItems`
option.  [Private
feeds](http://docs.pusher.com/feeds/concepts/private-feeds) require `"READ"`
permission. Takes a single options object with the following properties.

- `onItem`: [required] callback to handle items, takes each item as a parameter

- `lastItemId`: [optional] retrieve every item published after `lastItemId`,
  and then live items as they are published

- `previousItems`: [optional] if this parameter is provided, then the most recent
  `previousItems` items will be retrieved, followed by live items as they are
  published (`lastItemId` takes precedence if both are provided)

- `onOpen`: [optional] callback to fire when the subscription is open, takes an
  object containing `next_cursor` and `remaining` as a parameter

- `onEnd`: [optional] callback to fire when the subscription ends normally

- `onError`: [optional] callback to fire when the subscription is closed with
  error

Returns a `subscription` object with an `unsubscribe` method.

Items are passed to the `onItem` callback with the following format

```js
{
  id: item_id, // this corresponds to the published item_id
  created: timestamp,
  data: item_data
}
```

### Example

```js
const subscription = feed.subscribe({
  previousItems: 10,
  onOpen: ({ next_cursor, remaining }) => {
    // Keep track of next_cursor and remaining if you might want to paginate
    // back through previous items later on [optional]
  },
  onItem: item => {
    // Update the DOM with the item
  },
  onError: error => {
    console.error(`Error with subscription: ${error}`)
  },
});

// Unsubscribe after 5 seconds
setTimeout(subscription.unsubscribe, 5000);
```

## Pagination

Given a feed object such as `yourFeed` above, use `yourFeed.paginate` to query a
feed for pages of previously published items. Items are returned in descending
order of item ID. [Private
feeds](http://docs.pusher.com/feeds/concepts/private-feeds) require `"READ"`
permission. Takes a single (optional) options object with the following
properties.

- `cursor`: [optional] the ID of the first item in the page – if not provided,
  retrieves the most recently published items

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
  ],
  next_cursor: next_cursor,
  remaining: remaining
}
```

`next_cursor` should be used as the `cursor` parameter to get the next page of
results. It will be `null` if there are no more results. `remaining` is a count
of the number of unseen items further back in the history of the feed.

### Example

```js
// Get a page containing the last 25 items (but don’t subscribe)
yourFeed.paginate({ limit: 25 }).then(({ items }) => {
  // Update the DOM with the items
});
```

## List feeds for an instance

Given a feeds object `feeds`, `feeds.list` lists non-empty feeds. This method
requires `"READ"` permission on the path `"feeds"`, see the [auth
docs](http://docs.pusher.com/feeds/concepts/private-feeds).
Takes a single options object with the following properties.

- `prefix`: [optional] only return those feeds that start with this string

- `limit`: [optional] return at most this many matches

## Subscribe to the Firehose

Given a feeds object `feeds`, `feeds.firehose` subscribes to the firehose for
this instance to see all events and subscriptions on a single subscription.
This method requires `"READ"` permission on the path `"firehose/items"` – see
[auth docs](http://docs.pusher.com/feeds/concepts/private-feeds).  Takes a
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

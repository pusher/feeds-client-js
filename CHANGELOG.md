# Changelog

## 0.10.0 -- 2017-11-08
### Changed
- Rename the constructor option `instanceId` to `instanceLocator`.

## 0.9.0 -- 2017-08-21
### Added
- The response to `paginate` now also contains a `remaining` key – the number
  of unseen items left in the feed.
- `onOpen` is now passed an object: `{ next_cursor, remaining }` with the same
  semantics as for `paginate`.

### Changed
- `firehose` events are now unwrapped at the SDK level. i.e. callbacks are
  passed `event.body.data` rather than `event`.

## 0.8.1 -- 2017-08-03
### Changed
- Rename `lastEventId` to `lastItemId`.

## 0.8.0 -- 2017-08-03
### Changed
- Rename `getHistory` to `paginate` and the paramater `fromId` to `cursor`.
  This is a breaking change.
- Changed structure of subscribed item in `onItem` callback to have same format
  as in `paginate` method.

## 0.7.0 -- 2017-07-20
### Changed
- Rename the constructor option `instance` to `instanceId`. This is a breaking
  change.

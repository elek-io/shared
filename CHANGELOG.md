# @elek-io/shared

## 0.4.0

### Minor Changes

- f492168: Values can now directly contain references to Assets and shared Values

### Patch Changes

- 406822b: fix: No need to overwrite sharedValues, since Entry already contains resolved shared Values

## 0.3.1

### Patch Changes

- 79e9d8b: fix: provide array of Values when creating an Entry instead of just one
  fix: Only the content can be updated inside a shared Value
  fix: ListSharedValuesProps now correctly inherits generic type from SharedValue

## 0.3.0

### Minor Changes

- 2b188d1: - Values are now embedded into Entry files, sharing the same language. Shared Values are saved as seperate files and referenced by ID and language. The Entry type (not EntryFile type) returns shared Values already resolved with it's content.
  - Required string Values now actually need to have some content

## 0.2.0

### Minor Changes

- 41d882f: Core constructor props can now include the environment and are optional

## 0.1.1

### Patch Changes

- 7bd1889: Added coverage badge and some unit tests

## 0.1.0

### Minor Changes

- 7f10beb: Init

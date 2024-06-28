# @elek-io/shared

## 0.6.2

### Patch Changes

- 3c6caa3: Fixed "TypeError: Cannot read properties of undefined (reading '\_parseSync')" because of circular dependency / recursive types

## 0.6.1

### Patch Changes

- 08deff7: Potential fix for "TypeError: Cannot read properties of undefined (reading '\_parseSync')"

## 0.6.0

### Minor Changes

- 22770fd: Instead of not setting keys at all, the user / Core / Client should set them as null to specify a value that is purposefully not set
- 7af2bb2: References to Assets and Entries are now translateble
- a14b2ea: Only string and reference based values can be unique

## 0.5.1

### Patch Changes

- 25c34f1: fix: boolean and range Values are always required

## 0.5.0

### Minor Changes

- 6f4f735: - Value definitions now have labels instead of names
  - Projects have to have a name and description
  - The defaultValue for range inputs is now required
  - Now exporting reference based values as types
  - Updated zod to 3.23 for support of date() and time() methods
  - Removed SharedValue schema and types for now (this is a later feature)
  - Added Entry references
  - Resolved Value references hold the resolved object directly without the additional reference
  - Direct Values can now all be translated directly without the need for multiple Entries for each translation

## 0.4.7

### Patch Changes

- e0cef8e: Removed locale schema and added exports for infered types as well as some translatable schema validation messages

## 0.4.6

### Patch Changes

- 38cb706: Exporting some type definitions for specific Value definitions

## 0.4.5

### Patch Changes

- 645b006: fix: folder name for shared Values is now "shared-values"

## 0.4.4

### Patch Changes

- 87cde27: fix: no need for shared Value definitions to carry a full definition schema for the reference

## 0.4.3

### Patch Changes

- cbd9a5f: Using union to be able to differentiate between referenced an direct Values

## 0.4.2

### Patch Changes

- a366e03: Resolved objects are now present directly inside the reference

## 0.4.1

### Patch Changes

- c523695: Added missing objectType for Value references

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

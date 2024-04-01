---
'@elek-io/shared': minor
---

- Values are now embedded into Entry files, sharing the same language. Shared Values are saved as seperate files and referenced by ID and language. The Entry type (not EntryFile type) returns shared Values already resolved with it's content.
- Required string Values now actually need to have some content

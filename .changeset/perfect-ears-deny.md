---
'@elek-io/shared': minor
---

- Value definitions now have labels instead of names
- Projects have to have a name and description
- The defaultValue for range inputs is now required
- Now exporting reference based values as types
- Updated zod to 3.23 for support of date() and time() methods
- Removed SharedValue schema and types for now (this is a later feature)
- Added Entry references
- Resolved Value references hold the resolved object directly without the additional reference
- Direct Values can now all be translated directly without the need for multiple Entries for each translation

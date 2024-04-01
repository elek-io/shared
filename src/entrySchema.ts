import z from 'zod';
import {
  fileTypeSchema,
  supportedLanguageSchema,
  uuidSchema,
} from './baseSchema.js';
import { baseFileWithLanguageSchema } from './fileSchema.js';
import {
  resolvedSharedValueReferenceSchema,
  sharedValueExportSchema,
  sharedValueReferenceSchema,
  valueSchema,
} from './valueSchema.js';

export const entryFileSchema = baseFileWithLanguageSchema.extend({
  fileType: z.literal(fileTypeSchema.Enum.entry).readonly(),
  values: z.array(valueSchema),
  sharedValues: z.array(sharedValueReferenceSchema),
});
export type EntryFile = z.infer<typeof entryFileSchema>;

export const entrySchema = entryFileSchema.extend({
  sharedValues: z.array(resolvedSharedValueReferenceSchema),
});
export type Entry = z.infer<typeof entrySchema>;

export const entryExportSchema = entrySchema.extend({
  values: z.array(sharedValueExportSchema),
});
export type EntryExport = z.infer<typeof entryExportSchema>;

export const createEntrySchema = entryFileSchema
  .omit({
    id: true,
    fileType: true,
    created: true,
    updated: true,
  })
  .extend({
    projectId: uuidSchema.readonly(),
    collectionId: uuidSchema.readonly(),
    values: valueSchema.omit({
      id: true,
    }),
  });
export type CreateEntryProps = z.infer<typeof createEntrySchema>;

export const readEntrySchema = z.object({
  id: uuidSchema.readonly(),
  projectId: uuidSchema.readonly(),
  collectionId: uuidSchema.readonly(),
  language: supportedLanguageSchema.readonly(),
});
export type ReadEntryProps = z.infer<typeof readEntrySchema>;

export const updateEntrySchema = entrySchema
  .omit({
    fileType: true,
    created: true,
    updated: true,
  })
  .extend({
    projectId: uuidSchema.readonly(),
    collectionId: uuidSchema.readonly(),
  });
export type UpdateEntryProps = z.infer<typeof updateEntrySchema>;

export const deleteEntrySchema = readEntrySchema.extend({});
export type DeleteEntryProps = z.infer<typeof deleteEntrySchema>;

export const countEntriesSchema = z.object({
  projectId: uuidSchema.readonly(),
  collectionId: uuidSchema.readonly(),
});
export type CountEntriesProps = z.infer<typeof countEntriesSchema>;

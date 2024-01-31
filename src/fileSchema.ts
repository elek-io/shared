import z from 'zod';
import {
  fileTypeSchema,
  supportedExtensionSchema,
  supportedLanguageSchema,
  uuidSchema,
} from './baseSchema.js';

/**
 * A basic file structure every elek.io file on disk has to follow
 */
export const baseFileSchema = z.object({
  /**
   * The ID of the file
   *
   * The ID is part of the files name.
   */
  id: uuidSchema.readonly(),
  /**
   * The type of the file is used to identify the content structure of it
   */
  fileType: fileTypeSchema.readonly(),
  /**
   * The timestamp of the file being created is set by the service of "fileType" while creating it
   */
  created: z.number().readonly(),
  /**
   * The timestamp of the file being updated is set by the service of "fileType" while updating it
   */
  updated: z.number().optional(),
});
export type BaseFile = z.infer<typeof baseFileSchema>;

export const baseFileWithLanguageSchema = baseFileSchema.extend({
  /**
   * The language of the file
   *
   * The language is part of the files name and together with it's ID the only unique identifier.
   * That's why the language cannot be changed after creating the file.
   *
   * @todo Maybe remove the above restriction by implementing logic to handle changing the files language inside all services
   */
  language: supportedLanguageSchema.readonly(),
});
export type BaseFileWithLanguage = z.infer<typeof baseFileWithLanguageSchema>;

export const fileReferenceSchema = z.object({
  id: uuidSchema,
  language: supportedLanguageSchema.optional(),
  extension: supportedExtensionSchema.optional(),
});
export type FileReference = z.infer<typeof fileReferenceSchema>;

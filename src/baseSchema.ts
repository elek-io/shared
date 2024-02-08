import z from 'zod';

export const localFileProtocolSchema = z.literal('elek-io-local-file');
export type LocalFileProtocol = z.infer<typeof localFileProtocolSchema>;

export const environmentSchema = z.enum(['production', 'development', 'test']);
export type Environment = z.infer<typeof environmentSchema>;

/**
 * All currently supported, BCP 47 compliant language tags
 *
 * The support depends on the tools and libraries we use.
 * We can't support a given language, if there is no support
 * for it from used third parties. Currently, to check if a langauge
 * tag can be added to this list, it needs to be supported by:
 * - DeepL translation API
 *
 * @see https://www.deepl.com/docs-api/other-functions/listing-supported-languages/
 */
export const supportedLanguageSchema = z.enum([
  /**
   * Bulgarian
   */
  'bg', //
  'cs', // Czech
  'da', // Danish
  'de', // German
  'el', // Greek
  'en', // (US) English
  'es', // Spanish
  'et', // Estonian
  'fi', // Finnish
  'fr', // French
  'hu', // Hungarian
  'it', // Italian
  'ja', // Japanese
  'lt', // Lithuanian
  'lv', // Latvian
  'nl', // Dutch
  'pl', // Polish
  'pt', // Portuguese
  'ro', // Romanian
  'ru', // Russian
  'sk', // Slovak
  'sl', // Slovenian
  'sv', // Swedish
  'zh', // (Simplified) Chinese
]);
export type SupportedLanguage = z.infer<typeof supportedLanguageSchema>;

export const supportedIconSchema = z.enum(['home', 'plus', 'foobar']);
export type SupportedIcon = z.infer<typeof supportedIconSchema>;

export const supportedMimeTypeSchema = z.enum([
  'image/avif',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
  'application/pdf',
  'application/zip',
  'video/mp4',
  'video/webm',
  'audio/webm',
  'audio/flac',
]);
export type SupportedMimeType = z.infer<typeof supportedMimeTypeSchema>;

export const supportedExtensionSchema = z.enum([
  'avif',
  'gif',
  'jpg',
  'jpeg',
  'png',
  'svg',
  'webp',
  'pdf',
  'zip',
  'mp4',
  'webm',
  'flac',
  'json',
]);
export type SupportedExtension = z.infer<typeof supportedExtensionSchema>;

export const supportedFileTypeSchema = z.object({
  extension: supportedExtensionSchema,
  mimeType: supportedMimeTypeSchema,
});
export type SupportedFileType = z.infer<typeof supportedFileTypeSchema>;

export const fileTypeSchema = z.enum([
  'project',
  'asset',
  'collection',
  'entry',
  'value',
]);
export type FileType = z.infer<typeof fileTypeSchema>;

export const versionSchema = z.string();
// .refine((version) => {
//   if (Semver.valid(version) !== null) {
//     return true;
//   }
//   return false;
// }, 'String must follow the Semantic Versioning format (https://semver.org/)');
export type Version = z.infer<typeof versionSchema>;

export const uuidSchema = z.string().uuid();
export type Uuid = z.infer<typeof uuidSchema>;

/**
 * A record that can be used to translate a value into all supported languages
 */
export const translatableStringSchema = z.record(
  supportedLanguageSchema,
  z.string()
);
export type TranslatableString = z.infer<typeof translatableStringSchema>;

export const localeSchema = z.object({
  /**
   * BCP 47 compliant, unique language tag
   */
  id: supportedLanguageSchema,
  /**
   * Display name
   */
  name: z.string(),
});
export type Locale = z.infer<typeof localeSchema>;

import z, { ZodBoolean, ZodOptional } from 'zod';
import { assetSchema } from './assetSchema.js';
import {
  objectTypeSchema,
  supportedAssetMimeTypeSchema,
  supportedLanguageSchema,
  translatableStringSchema,
  uuidSchema,
} from './baseSchema.js';
import { baseFileWithLanguageSchema } from './fileSchema.js';

export const ValueTypeSchema = z.enum([
  'string',
  'number',
  'boolean',
  'reference',
]);
export const ValueInputTypeSchema = z.enum([
  // String
  'text',
  'textarea',
  'email',
  'password',
  'url',
  'ip',
  'date',
  'time',
  'datetime',
  'telephone',
  // Number
  'number',
  'range',
  // Boolean
  'toggle',
  // Reference
  'asset',
  'sharedValue',
]);
export const ValueInputWidthSchema = z.enum(['12', '6', '4', '3']);

export const ValueDefinitionBaseSchema = z.object({
  id: uuidSchema.readonly(),
  name: translatableStringSchema,
  description: translatableStringSchema,
  isRequired: z.boolean(),
  isDisabled: z.boolean(),
  inputWidth: ValueInputWidthSchema,
});

/**
 * String based Values
 */

export const StringValueDefinitionBaseSchema = ValueDefinitionBaseSchema.extend(
  {
    valueType: z.literal(ValueTypeSchema.Enum.string),
    isUnique: z.boolean(),
    min: z.number().optional(),
    max: z.number().optional(),
    defaultValue: z.string().optional(),
  }
);

export const textValueDefinitionSchema = StringValueDefinitionBaseSchema.extend(
  {
    inputType: z.literal(ValueInputTypeSchema.Enum.text),
  }
);

export const textareaValueDefinitionSchema =
  StringValueDefinitionBaseSchema.extend({
    inputType: z.literal(ValueInputTypeSchema.Enum.textarea),
  });

export const emailValueDefinitionSchema =
  StringValueDefinitionBaseSchema.extend({
    inputType: z.literal(ValueInputTypeSchema.Enum.email),
  });

// @todo why should we support password Values? Client saves it in clear text anyways
// export const passwordFieldDefinitionSchema =
//   StringFieldDefinitionBaseSchema.extend({
//     inputType: z.literal(FieldInputTypeSchema.Enum.password),
//   });

export const urlValueDefinitionSchema = StringValueDefinitionBaseSchema.extend({
  inputType: z.literal(ValueInputTypeSchema.Enum.url),
});

export const ipValueDefinitionSchema = StringValueDefinitionBaseSchema.extend({
  inputType: z.literal(ValueInputTypeSchema.Enum.ip),
});

// @todo zod currently does not implement this as simple z.string().date()
// @see https://github.com/colinhacks/zod/discussions/879
// export const dateFieldDefinitionSchema = StringFieldDefinitionBaseSchema.extend(
//   {
//     inputType: z.literal(FieldInputTypeSchema.Enum.date),
//     // Overwrite from number to string because in this case we refere to the min and max dates that can be selected, which is formatted as a "yyyy-mm-dd" string
//     min: z.string().optional(),
//     max: z.string().optional(),
//   }
// );

// @todo zod currently does not implement this as simple z.string().time()
// @see https://github.com/colinhacks/zod/discussions/879
// export const timeFieldDefinitionSchema = StringFieldDefinitionBaseSchema.extend(
//   {
//     inputType: z.literal(FieldInputTypeSchema.Enum.time),
//     // Overwrite from number to string because in this case we refere to the min and max time that can be selected, which is formatted as a "hh:mm" string
//     min: z.string().optional(),
//     max: z.string().optional(),
//   }
// );

export const datetimeValueDefinitionSchema =
  StringValueDefinitionBaseSchema.extend({
    inputType: z.literal(ValueInputTypeSchema.Enum.datetime),
    // Overwrite from number to string because in this case we refere to the min and max time that can be selected, which is formatted as a "YYYY-MM-DDThh:mm" string
    // @todo min and max only accepts numbers (for lenght) not datetime strings to give a min or max date here
    // min: z.string().datetime().optional(),
    // max: z.string().datetime().optional(),
    min: z.undefined(),
    max: z.undefined(),
  });

export const telephoneValueDefinitionSchema =
  StringValueDefinitionBaseSchema.extend({
    inputType: z.literal(ValueInputTypeSchema.Enum.telephone),
    // Overwrite from number to undefined because in this case we do not use min and max
    min: z.undefined(),
    max: z.undefined(),
  });

/**
 * Number based Values
 */

export const NumberValueDefinitionBaseSchema = ValueDefinitionBaseSchema.extend(
  {
    valueType: z.literal(ValueTypeSchema.Enum.number),
    isUnique: z.boolean(),
    min: z.number().optional(),
    max: z.number().optional(),
    defaultValue: z.number().optional(),
  }
);

export const numberValueDefinitionSchema =
  NumberValueDefinitionBaseSchema.extend({
    inputType: z.literal(ValueInputTypeSchema.Enum.number),
  });

export const rangeValueDefinitionSchema =
  NumberValueDefinitionBaseSchema.extend({
    inputType: z.literal(ValueInputTypeSchema.Enum.range),
    // Overwrite from optional to required because a range needs min and max to work
    min: z.number(),
    max: z.number(),
  });

/**
 * Boolean based Values
 */

export const BooleanValueDefinitionBaseSchema =
  ValueDefinitionBaseSchema.extend({
    valueType: z.literal(ValueTypeSchema.Enum.boolean),
    defaultValue: z.boolean().optional(),
  });

export const toggleValueDefinitionSchema =
  BooleanValueDefinitionBaseSchema.extend({
    inputType: z.literal(ValueInputTypeSchema.Enum.toggle),
  });

/**
 * Reference based Values
 */

export const ReferenceValueDefinitionBaseSchema =
  ValueDefinitionBaseSchema.extend({
    valueType: z.literal(ValueTypeSchema.Enum.reference),
  });

export const assetValueDefinitionSchema =
  ReferenceValueDefinitionBaseSchema.extend({
    inputType: z.literal(ValueInputTypeSchema.Enum.asset),
    allowedMimeTypes: z.array(supportedAssetMimeTypeSchema).optional(),
    min: z.number().optional(),
    max: z.number().optional(),
  });

export const sharedValueDefinitionSchema =
  ReferenceValueDefinitionBaseSchema.extend({
    inputType: z.literal(ValueInputTypeSchema.Enum.sharedValue),
    // The referenced shared Value can have any of these definitions
    // but not any reference based definitions itself
    referenceValueDefinition: z.union([
      textValueDefinitionSchema,
      textareaValueDefinitionSchema,
      emailValueDefinitionSchema,
      // passwordFieldDefinitionSchema,
      urlValueDefinitionSchema,
      ipValueDefinitionSchema,
      // dateFieldDefinitionSchema,
      // timeFieldDefinitionSchema,
      datetimeValueDefinitionSchema,
      telephoneValueDefinitionSchema,
      numberValueDefinitionSchema,
      rangeValueDefinitionSchema,
      toggleValueDefinitionSchema,
    ]),
  });

/**
 * A Value definition can be any of the listed definitions above
 */

export const valueDefinitionSchema = z.union([
  textValueDefinitionSchema,
  textareaValueDefinitionSchema,
  emailValueDefinitionSchema,
  // passwordFieldDefinitionSchema,
  urlValueDefinitionSchema,
  ipValueDefinitionSchema,
  // dateFieldDefinitionSchema,
  // timeFieldDefinitionSchema,
  datetimeValueDefinitionSchema,
  telephoneValueDefinitionSchema,
  numberValueDefinitionSchema,
  rangeValueDefinitionSchema,
  toggleValueDefinitionSchema,
  assetValueDefinitionSchema,
  sharedValueDefinitionSchema,
]);
export type ValueDefinition = z.infer<typeof valueDefinitionSchema>;

export const valueContentReferenceToAssetSchema = z.object({
  referenceObjectType: z.literal(objectTypeSchema.Enum.asset),
  references: z.array(
    z.object({
      id: uuidSchema,
      language: supportedLanguageSchema,
    })
  ),
});
export type ValueContentReferenceToAsset = z.infer<
  typeof valueContentReferenceToAssetSchema
>;

export const resolvedValueContentReferenceToAssetSchema =
  valueContentReferenceToAssetSchema.extend({
    resolved: assetSchema,
  });
export type ResolvedValueContentReferenceToAsset = z.infer<
  typeof resolvedValueContentReferenceToAssetSchema
>;

export const valueContentReferenceToSharedValueSchema = z.object({
  referenceObjectType: z.literal(objectTypeSchema.Enum.sharedValue),
  references: z.object({
    id: uuidSchema,
    language: supportedLanguageSchema,
  }),
});
export type ValueContentReferenceToSharedValue = z.infer<
  typeof valueContentReferenceToSharedValueSchema
>;

export const sharedValueFileSchema = baseFileWithLanguageSchema.extend({
  objectType: z.literal(objectTypeSchema.Enum.sharedValue).readonly(),
  valueType: ValueTypeSchema.exclude(['reference']).readonly(),
  // valueType: ValueTypeSchema.readonly(), @todo do we allow shared Values to reference assets or others?
  content: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.string().optional(),
    z.number().optional(),
    z.boolean().optional(),
    // valueContentReferenceToAssetSchema, @todo do we allow shared Values to reference assets or others?
    // valueContentReferenceToSharedValueSchema,
  ]),
});
export type SharedValueFile = z.infer<typeof sharedValueFileSchema>;

export const sharedValueSchema = sharedValueFileSchema.extend({});
export type SharedValue = z.infer<typeof sharedValueSchema>;

export const sharedValueExportSchema = sharedValueSchema.extend({});
export type SharedValueExport = z.infer<typeof sharedValueExportSchema>;

export const resolvedValueContentReferenceToSharedValueSchema =
  valueContentReferenceToAssetSchema.extend({
    resolved: sharedValueSchema,
  });
export type ResolvedValueContentReferenceToSharedValue = z.infer<
  typeof resolvedValueContentReferenceToSharedValueSchema
>;

export const valueContentReferenceSchema = z.union([
  valueContentReferenceToAssetSchema,
  valueContentReferenceToSharedValueSchema,
]);
export type ValueContentReference = z.infer<typeof valueContentReferenceSchema>;

export const resolvedValueContentReferenceSchema = z.union([
  resolvedValueContentReferenceToAssetSchema,
  resolvedValueContentReferenceToSharedValueSchema,
]);
export type ResolvedValueContentReference = z.infer<
  typeof resolvedValueContentReferenceSchema
>;

export const valueSchema = z.object({
  objectType: z.literal(objectTypeSchema.Enum.value).readonly(),
  definitionId: uuidSchema.readonly(),
  valueType: ValueTypeSchema.readonly(),
  content: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.string().optional(),
    z.number().optional(),
    z.boolean().optional(),
    valueContentReferenceToAssetSchema,
    valueContentReferenceToSharedValueSchema,
  ]),
});
export type Value = z.infer<typeof valueSchema>;

export const resolvedValueSchema = valueSchema.extend({
  content: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.string().optional(),
    z.number().optional(),
    z.boolean().optional(),
    resolvedValueContentReferenceToAssetSchema,
    resolvedValueContentReferenceToSharedValueSchema,
  ]),
});
export type ResolvedValue = z.infer<typeof resolvedValueSchema>;

/**
 * Dynamic zod schema generation
 */

/**
 * Generates a zod schema to check a Values content, based on given ValueDefinition
 */
export function getValueContentSchemaFromDefinition(
  definition: ValueDefinition
) {
  switch (definition.valueType) {
    case ValueTypeSchema.Enum.boolean:
      return getBooleanValueContentSchema(definition);
    case ValueTypeSchema.Enum.number:
      return getNumberValueContentSchema(definition);
    case ValueTypeSchema.Enum.string:
      return getStringValueContentSchema(definition);
    case ValueTypeSchema.Enum.reference:
      return getReferenceValueContentSchema(definition);
    default:
      throw new Error(
        `Error generating schema for unsupported ValueType "${
          (definition as ValueDefinition).valueType
        }"`
      );
  }
}

/**
 * @todo use BooleanValueDefinition to be more specific and add default value logic
 */
function getBooleanValueContentSchema(definition: ValueDefinition) {
  let schema: ZodBoolean | ZodOptional<ZodBoolean> = z.boolean();

  if (definition.isRequired === false) {
    schema = schema.optional();
  }

  return schema;
}

/**
 * @todo use NumberValueDefinition to be more specific and add more value logic
 */
function getNumberValueContentSchema(definition: ValueDefinition) {
  let schema = z.number();

  switch (definition.inputType) {
    case ValueInputTypeSchema.Enum.number:
      if (definition.min) {
        schema = schema.min(definition.min);
      }
      if (definition.max) {
        schema = schema.max(definition.max);
      }
      break;
    case ValueInputTypeSchema.Enum.range:
      schema = schema.min(definition.min).max(definition.max);
      break;
    default:
      throw new Error(
        `Error generating schema for unsupported InputType "${definition.inputType}" of ValueType "${definition.valueType}"`
      );
  }

  if (definition.isRequired === false) {
    return schema.optional();
  }

  return schema;
}

/**
 * @todo use StringValueDefinition to be more specific and add more value logic
 */
function getStringValueContentSchema(definition: ValueDefinition) {
  let schema = z.string();

  switch (definition.inputType) {
    case ValueInputTypeSchema.Enum.text:
    case ValueInputTypeSchema.Enum.textarea:
    case ValueInputTypeSchema.Enum.email:
    case ValueInputTypeSchema.Enum.url:
    case ValueInputTypeSchema.Enum.ip:
      if (definition.min) {
        schema = schema.min(definition.min);
      }
      if (definition.max) {
        schema = schema.max(definition.max);
      }
      if (definition.inputType === ValueInputTypeSchema.Enum.email) {
        schema = schema.email();
      }
      if (definition.inputType === ValueInputTypeSchema.Enum.url) {
        schema = schema.url();
      }
      if (definition.inputType === ValueInputTypeSchema.Enum.ip) {
        schema = schema.ip();
      }
      break;
    case ValueInputTypeSchema.Enum.datetime:
      schema = schema.datetime();
      break;
    case ValueInputTypeSchema.Enum.telephone:
      // @todo add phone number refinement or custom schema
      // @see https://github.com/colinhacks/zod#custom-schemas
      schema = schema.regex(
        /^\+?[1-9]\d{1,14}$/,
        'Value is not a valid E.164 phone number'
      );
      break;
    default:
      throw new Error(
        `Error generating schema for unsupported InputType "${definition.inputType}" of ValueType "${definition.valueType}"`
      );
  }

  if (definition.isRequired === false) {
    return schema.optional();
  } else {
    return schema.trim().min(1, 'Required'); // @see https://github.com/colinhacks/zod/issues/2466
  }
}

/**
 * @todo what do we need inside the asset reference (inside the values content), to resolve and validate their schema?
 */
function getReferenceValueContentSchema(definition: ValueDefinition) {
  switch (definition.inputType) {
    case ValueInputTypeSchema.Enum.asset:
      if (definition.isRequired === true) {
        // @todo is overwriting the shape like this safe or does it alter the original object shape too?
        valueContentReferenceToAssetSchema.shape.references =
          valueContentReferenceToAssetSchema.shape.references.min(
            1,
            'Required'
          );
      }
      if (definition.min) {
        valueContentReferenceToAssetSchema.shape.references =
          valueContentReferenceToAssetSchema.shape.references.min(
            definition.min
          );
      }
      if (definition.max) {
        valueContentReferenceToAssetSchema.shape.references =
          valueContentReferenceToAssetSchema.shape.references.max(
            definition.max
          );
      }

      // Overwrite default schema with custom definitions
      return valueContentReferenceToAssetSchema;

    case ValueInputTypeSchema.Enum.sharedValue:
      // @todo add required check and more

      return valueContentReferenceToSharedValueSchema;

    default:
      throw new Error(
        `Error generating schema for unsupported InputType "${definition.inputType}" of ValueType "${definition.valueType}"`
      );
  }
}

/**
 * ---
 */

export const createSharedValueSchema = sharedValueFileSchema
  .pick({
    valueType: true,
    content: true,
    language: true,
  })
  .extend({
    projectId: uuidSchema.readonly(),
  });
export type CreateSharedValueProps = z.infer<typeof createSharedValueSchema>;

export const readSharedValueSchema = sharedValueFileSchema
  .pick({
    id: true,
    language: true,
  })
  .extend({
    projectId: uuidSchema.readonly(),
  });
export type ReadSharedValueProps = z.infer<typeof readSharedValueSchema>;

export const updateSharedValueSchema = sharedValueFileSchema
  .pick({
    id: true,
    language: true,
    content: true,
  })
  .extend({
    projectId: uuidSchema.readonly(),
  });
export type UpdateSharedValueProps = z.infer<typeof updateSharedValueSchema>;

export const deleteSharedValueSchema = sharedValueFileSchema
  .pick({
    id: true,
    language: true,
  })
  .extend({
    projectId: uuidSchema.readonly(),
  });
export type DeleteSharedValueProps = z.infer<typeof deleteSharedValueSchema>;

/**
 * @todo maybe we need to validate Values and shared Values
 */
export const validateValueSchema = sharedValueFileSchema
  .pick({
    id: true,
    language: true,
  })
  .extend({
    projectId: uuidSchema.readonly(),
    definition: valueDefinitionSchema.readonly(),
  });
export type ValidateValueProps = z.infer<typeof validateValueSchema>;

export const countValuesSchema = z.object({ projectId: uuidSchema.readonly() });
export type CountValuesProps = z.infer<typeof countValuesSchema>;

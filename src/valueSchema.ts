import z from 'zod';
import { assetSchema } from './assetSchema.js';
import {
  objectTypeSchema,
  supportedAssetMimeTypeSchema,
  supportedLanguageSchema,
  translatableStringSchema,
  uuidSchema,
} from './baseSchema.js';

export const ValueTypeSchema = z.enum([
  'string',
  'number',
  'boolean',
  'reference',
]);
export type ValueType = z.infer<typeof ValueTypeSchema>;

export const ValueInputTypeSchema = z.enum([
  // String
  'text',
  'textarea',
  'email',
  // 'password', @todo maybe if there is a usecase
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
  // 'sharedValue', // @todo
]);
export type ValueInputType = z.infer<typeof ValueInputTypeSchema>;

export const ValueInputWidthSchema = z.enum(['12', '6', '4', '3']);

export const ValueDefinitionBaseSchema = z.object({
  id: uuidSchema.readonly(),
  label: translatableStringSchema,
  description: translatableStringSchema,
  isRequired: z.boolean(),
  isDisabled: z.boolean(),
  inputWidth: ValueInputWidthSchema,
});
export type ValueDefinitionBase = z.infer<typeof ValueDefinitionBaseSchema>;

/**
 * String based Values
 */

export const StringValueDefinitionBaseSchema = ValueDefinitionBaseSchema.extend(
  {
    valueType: z.literal(ValueTypeSchema.Enum.string),
    isUnique: z.boolean(),
    defaultValue: z.string().optional(),
  }
);

export const textValueDefinitionSchema = StringValueDefinitionBaseSchema.extend(
  {
    inputType: z.literal(ValueInputTypeSchema.Enum.text),
    min: z.number().optional(),
    max: z.number().optional(),
  }
);
export type TextValueDefinition = z.infer<typeof textValueDefinitionSchema>;

export const textareaValueDefinitionSchema =
  StringValueDefinitionBaseSchema.extend({
    inputType: z.literal(ValueInputTypeSchema.Enum.textarea),
    min: z.number().optional(),
    max: z.number().optional(),
  });
export type TextareaValueDefinition = z.infer<
  typeof textareaValueDefinitionSchema
>;

export const emailValueDefinitionSchema =
  StringValueDefinitionBaseSchema.extend({
    inputType: z.literal(ValueInputTypeSchema.Enum.email),
    defaultValue: z.string().email().optional(),
  });
export type EmailValueDefinition = z.infer<typeof emailValueDefinitionSchema>;

// @todo why should we support password Values? Client saves it in clear text anyways
// export const passwordFieldDefinitionSchema =
//   StringFieldDefinitionBaseSchema.extend({
//     inputType: z.literal(FieldInputTypeSchema.Enum.password),
//   });

export const urlValueDefinitionSchema = StringValueDefinitionBaseSchema.extend({
  inputType: z.literal(ValueInputTypeSchema.Enum.url),
  defaultValue: z.string().url().optional(),
});
export type UrlValueDefinition = z.infer<typeof urlValueDefinitionSchema>;

export const ipValueDefinitionSchema = StringValueDefinitionBaseSchema.extend({
  inputType: z.literal(ValueInputTypeSchema.Enum.ip),
  defaultValue: z.string().ip().optional(),
});
export type IpValueDefinition = z.infer<typeof ipValueDefinitionSchema>;

export const dateValueDefinitionSchema = StringValueDefinitionBaseSchema.extend(
  {
    inputType: z.literal(ValueInputTypeSchema.Enum.date),
    defaultValue: z.string().date().optional(),
  }
);
export type DateValueDefinition = z.infer<typeof dateValueDefinitionSchema>;

export const timeValueDefinitionSchema = StringValueDefinitionBaseSchema.extend(
  {
    inputType: z.literal(ValueInputTypeSchema.Enum.time),
    defaultValue: z.string().time().optional(),
  }
);
export type TimeValueDefinition = z.infer<typeof timeValueDefinitionSchema>;

export const datetimeValueDefinitionSchema =
  StringValueDefinitionBaseSchema.extend({
    inputType: z.literal(ValueInputTypeSchema.Enum.datetime),
    defaultValue: z.string().datetime().optional(),
  });
export type DatetimeValueDefinition = z.infer<
  typeof datetimeValueDefinitionSchema
>;

export const telephoneValueDefinitionSchema =
  StringValueDefinitionBaseSchema.extend({
    inputType: z.literal(ValueInputTypeSchema.Enum.telephone),
    // defaultValue: z.string().e164(), @todo when zod v4 releases @see https://github.com/colinhacks/zod/pull/3476
  });
export type TelephoneValueDefinition = z.infer<
  typeof telephoneValueDefinitionSchema
>;

export const stringValueDefinitionSchema = z.union([
  textValueDefinitionSchema,
  textareaValueDefinitionSchema,
  emailValueDefinitionSchema,
  urlValueDefinitionSchema,
  ipValueDefinitionSchema,
  dateValueDefinitionSchema,
  timeValueDefinitionSchema,
  datetimeValueDefinitionSchema,
  telephoneValueDefinitionSchema,
]);
export type StringValueDefinition = z.infer<typeof stringValueDefinitionSchema>;

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
export type NumberValueDefinition = z.infer<typeof numberValueDefinitionSchema>;

export const rangeValueDefinitionSchema =
  NumberValueDefinitionBaseSchema.extend({
    inputType: z.literal(ValueInputTypeSchema.Enum.range),
    // Overwrite from optional to required because a range needs min, max and default to work
    min: z.number(),
    max: z.number(),
    defaultValue: z.number(),
  });
export type RangeValueDefinition = z.infer<typeof rangeValueDefinitionSchema>;

/**
 * Boolean based Values
 */

export const BooleanValueDefinitionBaseSchema = ValueDefinitionBaseSchema.omit({
  isRequired: true,
}).extend({
  valueType: z.literal(ValueTypeSchema.Enum.boolean),
  defaultValue: z.boolean(),
});

export const toggleValueDefinitionSchema =
  BooleanValueDefinitionBaseSchema.extend({
    inputType: z.literal(ValueInputTypeSchema.Enum.toggle),
  });
export type ToggleValueDefinition = z.infer<typeof toggleValueDefinitionSchema>;

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
export type AssetValueDefinition = z.infer<typeof assetValueDefinitionSchema>;

// export const sharedValueDefinitionSchema =
//   ReferenceValueDefinitionBaseSchema.extend({
//     inputType: z.literal(ValueInputTypeSchema.Enum.sharedValue),
//     // The shared Value can have any of the direct types
//     // but not any reference itself (a shared Value cannot have a reference to another shared Value / Asset or any other future reference)
//     sharedValueType: z.union([
//       z.literal(ValueTypeSchema.Enum.boolean),
//       z.literal(ValueTypeSchema.Enum.number),
//       z.literal(ValueTypeSchema.Enum.string),
//     ]),
//   });
// export type SharedValueValueDefinition = z.infer<
//   typeof sharedValueDefinitionSchema
// >;

/**
 * A Value definition can be any of the listed definitions above
 */

export const valueDefinitionSchema = z.union([
  stringValueDefinitionSchema,
  numberValueDefinitionSchema,
  rangeValueDefinitionSchema,
  toggleValueDefinitionSchema,
  assetValueDefinitionSchema,
  // sharedValueDefinitionSchema,
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
    references: z.array(
      z.object({
        id: uuidSchema,
        language: supportedLanguageSchema,
        resolved: assetSchema,
      })
    ),
  });
export type ResolvedValueContentReferenceToAsset = z.infer<
  typeof resolvedValueContentReferenceToAssetSchema
>;

// export const valueContentReferenceToSharedValueSchema = z.object({
//   referenceObjectType: z.literal(objectTypeSchema.Enum.sharedValue),
//   references: z.object({
//     id: uuidSchema,
//     language: supportedLanguageSchema,
//   }),
// });
// export type ValueContentReferenceToSharedValue = z.infer<
//   typeof valueContentReferenceToSharedValueSchema
// >;

// export const sharedValueFileSchema = baseFileWithLanguageSchema.extend({
//   objectType: z.literal(objectTypeSchema.Enum.sharedValue).readonly(),
//   valueType: ValueTypeSchema.exclude(['reference']).readonly(),
//   // valueType: ValueTypeSchema.readonly(), @todo do we allow shared Values to reference assets or others?
//   content: z.union([
//     z.string(),
//     z.number(),
//     z.boolean(),
//     z.string().optional(),
//     z.number().optional(),
//     z.boolean().optional(),
//     // valueContentReferenceToAssetSchema, @todo do we allow shared Values to reference assets or others?
//     // valueContentReferenceToSharedValueSchema,
//   ]),
// });
// export type SharedValueFile = z.infer<typeof sharedValueFileSchema>;

// export const sharedValueSchema = sharedValueFileSchema.extend({});
// export type SharedValue = z.infer<typeof sharedValueSchema>;

// export const sharedValueExportSchema = sharedValueSchema.extend({});
// export type SharedValueExport = z.infer<typeof sharedValueExportSchema>;

// export const resolvedValueContentReferenceToSharedValueSchema =
//   valueContentReferenceToSharedValueSchema.extend({
//     references: z.object({
//       id: uuidSchema,
//       language: supportedLanguageSchema,
//       resolved: sharedValueSchema,
//     }),
//   });
// export type ResolvedValueContentReferenceToSharedValue = z.infer<
//   typeof resolvedValueContentReferenceToSharedValueSchema
// >;

export const valueContentReferenceSchema = z.union([
  valueContentReferenceToAssetSchema,
  // valueContentReferenceToSharedValueSchema,
  z.object({}),
]);
export type ValueContentReference = z.infer<typeof valueContentReferenceSchema>;

export const resolvedValueContentReferenceSchema = z.union([
  resolvedValueContentReferenceToAssetSchema,
  // resolvedValueContentReferenceToSharedValueSchema,
  z.object({}),
]);
export type ResolvedValueContentReference = z.infer<
  typeof resolvedValueContentReferenceSchema
>;

export const directValueSchema = z.object({
  objectType: z.literal(objectTypeSchema.Enum.value).readonly(),
  definitionId: uuidSchema.readonly(),
  valueType: z
    .union([
      z.literal(ValueTypeSchema.Enum.boolean),
      z.literal(ValueTypeSchema.Enum.number),
      z.literal(ValueTypeSchema.Enum.string),
    ])
    .readonly(),
  content: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.string().optional(),
    z.number().optional(),
    z.boolean().optional(),
  ]),
});
export type DirectValue = z.infer<typeof directValueSchema>;

export const referencedValueSchema = z.object({
  objectType: z.literal(objectTypeSchema.Enum.value).readonly(),
  definitionId: uuidSchema.readonly(),
  valueType: z.literal(ValueTypeSchema.Enum.reference).readonly(),
  content: valueContentReferenceSchema,
});
export type ReferencedValue = z.infer<typeof referencedValueSchema>;

export const valueSchema = z.union([directValueSchema, referencedValueSchema]);
export type Value = z.infer<typeof valueSchema>;

export const resolvedReferencedValueSchema = referencedValueSchema.extend({
  content: resolvedValueContentReferenceSchema,
});
export type ResolvedReferencedValue = z.infer<
  typeof resolvedReferencedValueSchema
>;

export const resolvedValueSchema = z.union([
  resolvedReferencedValueSchema,
  directValueSchema,
]);
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
        // @ts-expect-error
        `Error generating schema for unsupported ValueType "${definition.valueType}"`
      );
  }
}

function getBooleanValueContentSchema(definition: ToggleValueDefinition) {
  return z.boolean();
}

function getNumberValueContentSchema(
  definition: NumberValueDefinition | RangeValueDefinition
) {
  let schema = z.number();

  if ('min' in definition && definition.min) {
    schema = schema.min(definition.min);
  }
  if ('max' in definition && definition.max) {
    schema = schema.max(definition.max);
  }

  if (definition.isRequired === false) {
    return schema.optional();
  }

  return schema;
}

function getStringValueContentSchema(definition: StringValueDefinition) {
  let schema = z.string().trim(); // Additionally trim whitespace

  if ('min' in definition && definition.min) {
    schema = schema.min(definition.min);
  }
  if ('max' in definition && definition.max) {
    schema = schema.max(definition.max);
  }

  switch (definition.inputType) {
    case ValueInputTypeSchema.Enum.email:
      schema = schema.email();
      break;
    case ValueInputTypeSchema.Enum.url:
      schema = schema.url();
      break;
    case ValueInputTypeSchema.Enum.ip:
      schema = schema.ip();
      break;
    case ValueInputTypeSchema.Enum.date:
      schema = schema.date();
      break;
    case ValueInputTypeSchema.Enum.time:
      schema = schema.time();
      break;
    case ValueInputTypeSchema.Enum.datetime:
      schema = schema.datetime();
      break;
    case ValueInputTypeSchema.Enum.telephone:
      // @todo z.string().e164() when zod v4 releases @see https://github.com/colinhacks/zod/pull/3476
      break;
  }

  if (definition.isRequired === false) {
    return schema.optional();
  }

  return schema.min(1, 'shared.stringValueRequired'); // @see https://github.com/colinhacks/zod/issues/2466
}

/**
 * @todo what do we need inside the asset reference (inside the values content), to resolve and validate their schema?
 */
function getReferenceValueContentSchema(
  definition: AssetValueDefinition // | SharedValueValueDefinition
) {
  switch (definition.inputType) {
    case ValueInputTypeSchema.Enum.asset: {
      let schema = valueContentReferenceToAssetSchema.extend({}); // Deep copy to not overwrite the base schema

      if (definition.isRequired) {
        const requiredReferences = schema.shape.references.min(
          1,
          'shared.assetValueRequired'
        );
        schema = schema.extend({
          references: requiredReferences,
        });
      }

      if (definition.min) {
        const minReferences = schema.shape.references.min(definition.min);
        schema = schema.extend({
          references: minReferences,
        });
      }

      if (definition.max) {
        const maxReferences = schema.shape.references.max(definition.max);
        schema = schema.extend({
          references: maxReferences,
        });
      }

      return schema;
    }
    // case ValueInputTypeSchema.Enum.sharedValue: {
    //   let schema = valueContentReferenceToSharedValueSchema.extend({}); // Deep copy to not overwrite the base schema

    //   if (definition.isRequired) {
    //     const requiredReferences = schema.shape.references.min(
    //       1,
    //       'shared.assetValueRequired'
    //     );
    //     schema = schema.extend({
    //       references: requiredReferences,
    //     });
    //   }

    //   return valueContentReferenceToSharedValueSchema;
    // }
  }
}

/**
 * ---
 */

// export const createSharedValueSchema = sharedValueFileSchema
//   .pick({
//     valueType: true,
//     content: true,
//     language: true,
//   })
//   .extend({
//     projectId: uuidSchema.readonly(),
//   });
// export type CreateSharedValueProps = z.infer<typeof createSharedValueSchema>;

// export const readSharedValueSchema = sharedValueFileSchema
//   .pick({
//     id: true,
//     language: true,
//   })
//   .extend({
//     projectId: uuidSchema.readonly(),
//   });
// export type ReadSharedValueProps = z.infer<typeof readSharedValueSchema>;

// export const updateSharedValueSchema = sharedValueFileSchema
//   .pick({
//     id: true,
//     language: true,
//     content: true,
//   })
//   .extend({
//     projectId: uuidSchema.readonly(),
//   });
// export type UpdateSharedValueProps = z.infer<typeof updateSharedValueSchema>;

// export const deleteSharedValueSchema = sharedValueFileSchema
//   .pick({
//     id: true,
//     language: true,
//   })
//   .extend({
//     projectId: uuidSchema.readonly(),
//   });
// export type DeleteSharedValueProps = z.infer<typeof deleteSharedValueSchema>;

/**
 * @todo maybe we need to validate Values and shared Values
 */
// export const validateValueSchema = sharedValueFileSchema
//   .pick({
//     id: true,
//     language: true,
//   })
//   .extend({
//     projectId: uuidSchema.readonly(),
//     definition: valueDefinitionSchema.readonly(),
//   });
// export type ValidateValueProps = z.infer<typeof validateValueSchema>;

// export const countValuesSchema = z.object({ projectId: uuidSchema.readonly() });
// export type CountValuesProps = z.infer<typeof countValuesSchema>;

import z from 'zod';
import {
  fileTypeSchema,
  supportedLanguageSchema,
  translatableStringSchema,
  uuidSchema,
} from './baseSchema.js';
import { baseFileWithLanguageSchema } from './fileSchema.js';

// @todo needs to be extended with "object" e.g. for references to assets
export const ValueTypeSchema = z.enum(['string', 'number', 'boolean']);
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
]);
export type ValueDefinition = z.infer<typeof valueDefinitionSchema>;

export const valueFileSchema = baseFileWithLanguageSchema.extend({
  fileType: z.literal(fileTypeSchema.Enum.value).readonly(),
  valueType: ValueTypeSchema.readonly(),
  content: z.any(),
});
export type ValueFile = z.infer<typeof valueFileSchema>;

export const valueSchema = valueFileSchema.extend({});
export type Value = z.infer<typeof valueSchema>;

export const valueExportSchema = valueSchema.extend({});
export type ValueExport = z.infer<typeof valueExportSchema>;

/**
 * Dynamic zod schema generation
 */

/**
 * Generates a zod schema for a Value, based on given ValueDefinition
 *
 * The zod schema can then be used to validate the Value
 */
export function getValueSchemaFromDefinition(definition: ValueDefinition) {
  switch (definition.valueType) {
    case ValueTypeSchema.Enum.boolean:
      return getBooleanValueSchema(definition);
    case ValueTypeSchema.Enum.number:
      return getNumberValueSchema(definition);
    case ValueTypeSchema.Enum.string:
      return getStringValueSchema(definition);
    default:
      throw new Error(
        `Error generating schema for unsupported ValueType "${
          (definition as ValueDefinition).valueType
        }"`
      );
  }
}

function getBooleanValueSchema(definition: ValueDefinition) {
  let schema = z.boolean();

  if (definition.isRequired === false) {
    return schema.optional();
  }

  return schema;
}

function getNumberValueSchema(definition: ValueDefinition) {
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

function getStringValueSchema(definition: ValueDefinition) {
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
  }

  return schema;
}

/**
 * ---
 */

export const valueReferenceSchema = z.object({
  definitionId: uuidSchema,
  references: z.object({
    id: uuidSchema,
    language: supportedLanguageSchema,
  }),
});
export type ValueReference = z.infer<typeof valueReferenceSchema>;

export const createValueSchema = valueFileSchema
  .pick({
    valueType: true,
    content: true,
    language: true,
  })
  .extend({
    projectId: uuidSchema.readonly(),
  });
export type CreateValueProps = z.infer<typeof createValueSchema>;

export const readValueSchema = valueFileSchema
  .pick({
    id: true,
    language: true,
  })
  .extend({
    projectId: uuidSchema.readonly(),
  });
export type ReadValueProps = z.infer<typeof readValueSchema>;

export const updateValueSchema = valueFileSchema
  .pick({
    id: true,
    language: true,
    valueType: true,
    value: true,
  })
  .extend({
    projectId: uuidSchema.readonly(),
  });
export type UpdateValueProps = z.infer<typeof updateValueSchema>;

export const deleteValueSchema = valueFileSchema
  .pick({
    id: true,
    language: true,
  })
  .extend({
    projectId: uuidSchema.readonly(),
  });
export type DeleteValueProps = z.infer<typeof deleteValueSchema>;

export const validateValueSchema = valueFileSchema
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

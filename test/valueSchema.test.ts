import { describe, expect, it } from 'vitest';
import {
  getValueContentSchemaFromDefinition,
  objectTypeSchema,
  uuid,
} from '../src';

describe('Dynamic zod schema', () => {
  it('can be generated from required boolean Value type definition', () => {
    const requiredBooleanValueschema = getValueContentSchemaFromDefinition({
      id: '',
      valueType: 'boolean',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      defaultValue: true,
      inputType: 'toggle',
      inputWidth: '12',
      isDisabled: false,
    });

    expect(requiredBooleanValueschema.safeParse(true).success).toBe(true);
    expect(requiredBooleanValueschema.safeParse(false).success).toBe(true);
    expect(requiredBooleanValueschema.safeParse('test').success).toBe(false);
    expect(requiredBooleanValueschema.safeParse(1).success).toBe(false);
    expect(requiredBooleanValueschema.safeParse(undefined).success).toBe(false);
  });

  it('can be generated from optional boolean Value type definition', () => {
    const optionalBooleanValueschema = getValueContentSchemaFromDefinition({
      id: '',
      valueType: 'boolean',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      defaultValue: true,
      inputType: 'toggle',
      inputWidth: '12',
      isDisabled: false,
    });

    expect(optionalBooleanValueschema.safeParse(true).success).toBe(true);
    expect(optionalBooleanValueschema.safeParse(false).success).toBe(true);
    expect(optionalBooleanValueschema.safeParse('test').success).toBe(false);
    expect(optionalBooleanValueschema.safeParse(1).success).toBe(false);
    expect(optionalBooleanValueschema.safeParse(undefined).success).toBe(true);
  });

  it('can be generated from required number Value type definition', () => {
    const requiredNumberValueschema = getValueContentSchemaFromDefinition({
      id: '',
      valueType: 'number',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      defaultValue: undefined,
      inputType: 'number',
      inputWidth: '12',
      isDisabled: false,
      isRequired: true,
      isUnique: false,
      min: 1,
      max: 10,
    });

    expect(requiredNumberValueschema.safeParse(5).success).toBe(true);
    expect(requiredNumberValueschema.safeParse(0).success).toBe(false);
    expect(requiredNumberValueschema.safeParse(0.5).success).toBe(false);
    expect(requiredNumberValueschema.safeParse(11).success).toBe(false);
    expect(requiredNumberValueschema.safeParse(10.5).success).toBe(false);
    expect(requiredNumberValueschema.safeParse(-1).success).toBe(false);
    expect(requiredNumberValueschema.safeParse(-0.5).success).toBe(false);
    expect(requiredNumberValueschema.safeParse(undefined).success).toBe(false);
    expect(requiredNumberValueschema.safeParse('hello').success).toBe(false);
  });

  it('can be generated from optional number Value type definition', () => {
    const optionalNumberValueschema = getValueContentSchemaFromDefinition({
      id: '',
      valueType: 'number',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      defaultValue: undefined,
      inputType: 'number',
      inputWidth: '12',
      isDisabled: false,
      isRequired: false,
      isUnique: false,
      min: 1,
      max: 10,
    });

    expect(optionalNumberValueschema.safeParse(5).success).toBe(true);
    expect(optionalNumberValueschema.safeParse(0).success).toBe(false);
    expect(optionalNumberValueschema.safeParse(0.5).success).toBe(false);
    expect(optionalNumberValueschema.safeParse(11).success).toBe(false);
    expect(optionalNumberValueschema.safeParse(10.5).success).toBe(false);
    expect(optionalNumberValueschema.safeParse(-1).success).toBe(false);
    expect(optionalNumberValueschema.safeParse(-0.5).success).toBe(false);
    expect(optionalNumberValueschema.safeParse(undefined).success).toBe(true);
    expect(optionalNumberValueschema.safeParse('hello').success).toBe(false);
  });

  it('can be generated from required string Value type definition', () => {
    const requiredStringValueschema = getValueContentSchemaFromDefinition({
      id: '',
      valueType: 'string',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      defaultValue: undefined,
      inputType: 'text',
      inputWidth: '12',
      isDisabled: false,
      isRequired: true,
      isUnique: false,
    });

    expect(requiredStringValueschema.safeParse(1).success).toBe(false);
    expect(requiredStringValueschema.safeParse(undefined).success).toBe(false);
    expect(requiredStringValueschema.safeParse('').success).toBe(false);
    expect(requiredStringValueschema.safeParse(' ').success).toBe(false);

    expect(requiredStringValueschema.safeParse('hello').success).toBe(true);
  });

  it('can be generated from optional string Value type definition', () => {
    const optionalStringValueschema = getValueContentSchemaFromDefinition({
      id: '',
      valueType: 'string',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      defaultValue: undefined,
      inputType: 'text',
      inputWidth: '12',
      isDisabled: false,
      isRequired: false,
      isUnique: false,
    });

    expect(optionalStringValueschema.safeParse(1).success).toBe(false);

    expect(optionalStringValueschema.safeParse(undefined).success).toBe(true);
    expect(optionalStringValueschema.safeParse('hello').success).toBe(true);
    expect(optionalStringValueschema.safeParse('').success).toBe(true);
    expect(optionalStringValueschema.safeParse(' ').success).toBe(true);
  });

  it('can be generated from optional Asset Value type definition', () => {
    const optionalAssetValueschema = getValueContentSchemaFromDefinition({
      id: '',
      valueType: 'reference',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      inputType: 'asset',
      inputWidth: '12',
      isDisabled: false,
      isRequired: false,
    });

    expect(optionalAssetValueschema.safeParse(1).success).toBe(false);
    expect(optionalAssetValueschema.safeParse(undefined).success).toBe(false);
    expect(optionalAssetValueschema.safeParse('hello').success).toBe(false);
    expect(optionalAssetValueschema.safeParse('').success).toBe(false);
    expect(optionalAssetValueschema.safeParse({}).success).toBe(false);

    expect(
      optionalAssetValueschema.safeParse({
        referenceObjectType: objectTypeSchema.Enum.asset,
        references: [],
      }).success
    ).toBe(true);
    expect(
      optionalAssetValueschema.safeParse({
        referenceObjectType: objectTypeSchema.Enum.asset,
        references: [
          {
            id: uuid(),
            language: 'en',
          },
        ],
      }).success
    ).toBe(true);
  });

  it('can be generated from required Asset Value type definition', () => {
    const optionalAssetValueschema = getValueContentSchemaFromDefinition({
      id: '',
      valueType: 'reference',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      inputType: 'asset',
      inputWidth: '12',
      isDisabled: false,
      isRequired: true,
      max: 2,
    });

    expect(optionalAssetValueschema.safeParse(1).success).toBe(false);
    expect(optionalAssetValueschema.safeParse(undefined).success).toBe(false);
    expect(optionalAssetValueschema.safeParse('hello').success).toBe(false);
    expect(optionalAssetValueschema.safeParse('').success).toBe(false);
    expect(optionalAssetValueschema.safeParse({}).success).toBe(false);
    expect(
      optionalAssetValueschema.safeParse({
        referenceObjectType: objectTypeSchema.Enum.asset,
        references: [],
      }).success
    ).toBe(false);
    expect(
      optionalAssetValueschema.safeParse({
        referenceObjectType: objectTypeSchema.Enum.asset,
        references: [
          {
            id: uuid(),
            language: 'en',
          },
          {
            id: uuid(),
            language: 'en',
          },
          {
            id: uuid(),
            language: 'en',
          },
        ],
      }).success
    ).toBe(false);

    optionalAssetValueschema.parse({
      referenceObjectType: objectTypeSchema.Enum.asset,
      references: [
        {
          id: uuid(),
          language: 'en',
        },
      ],
    });

    expect(
      optionalAssetValueschema.safeParse({
        referenceObjectType: objectTypeSchema.Enum.asset,
        references: [
          {
            id: uuid(),
            language: 'en',
          },
        ],
      }).success
    ).toBe(true);
  });

  it('can be generated from shared Value type definition', () => {
    const sharedValueschema = getValueContentSchemaFromDefinition({
      id: '',
      valueType: 'reference',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      inputType: 'sharedValue',
      sharedValueType: 'string',
      referenceValueDefinition: {
        id: '',
        valueType: 'string',
        label: {
          en: 'Test',
        },
        description: {
          en: 'Test',
        },
        defaultValue: undefined,
        inputType: 'text',
        inputWidth: '12',
        isDisabled: false,
        isRequired: false,
        isUnique: false,
      },
      inputWidth: '12',
      isDisabled: false,
      isRequired: true,
    });

    expect(sharedValueschema.safeParse(1).success).toBe(false);
    expect(sharedValueschema.safeParse(undefined).success).toBe(false);
    expect(sharedValueschema.safeParse('hello').success).toBe(false);
    expect(sharedValueschema.safeParse('').success).toBe(false);
    expect(sharedValueschema.safeParse({}).success).toBe(false);
    expect(
      sharedValueschema.safeParse({
        referenceObjectType: objectTypeSchema.Enum.sharedValue,
        references: [],
      }).success
    ).toBe(false);
    expect(
      sharedValueschema.safeParse({
        referenceObjectType: objectTypeSchema.Enum.sharedValue,
        references: {},
      }).success
    ).toBe(false);
    expect(
      sharedValueschema.safeParse({
        referenceObjectType: objectTypeSchema.Enum.sharedValue,
        references: {
          id: uuid(),
        },
      }).success
    ).toBe(false);

    expect(
      sharedValueschema.safeParse({
        referenceObjectType: objectTypeSchema.Enum.sharedValue,
        references: {
          id: uuid(),
          language: 'en',
        },
      }).success
    ).toBe(true);
  });
});

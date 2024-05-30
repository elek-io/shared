import { describe, expect, it } from 'vitest';
import { getValueContentSchemaFromDefinition, uuid } from '../src';

describe('Dynamic zod schema', () => {
  it('from toggle Value input type definition can be generated and parsed with', () => {
    const booleanValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'boolean',
      inputType: 'toggle',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      defaultValue: true,
      inputWidth: '12',
      isDisabled: false,
    });

    expect(booleanValueschema.safeParse(true).success).toBe(true);
    expect(booleanValueschema.safeParse(false).success).toBe(true);

    expect(booleanValueschema.safeParse('').success).toBe(false);
    expect(booleanValueschema.safeParse(0).success).toBe(false);
    expect(booleanValueschema.safeParse(undefined).success).toBe(false);
    expect(booleanValueschema.safeParse(null).success).toBe(false);
    expect(booleanValueschema.safeParse([]).success).toBe(false);
    expect(booleanValueschema.safeParse({}).success).toBe(false);
  });

  it('from required number Value input type definition can be generated and parsed with', () => {
    const requiredNumberValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'number',
      inputType: 'number',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      min: 5,
      max: 10,
      defaultValue: 7,
      inputWidth: '12',
      isDisabled: false,
      isRequired: true,
      isUnique: false,
    });

    expect(requiredNumberValueschema.safeParse(5).success).toBe(true);
    expect(requiredNumberValueschema.safeParse(10).success).toBe(true);
    expect(requiredNumberValueschema.safeParse(7.5).success).toBe(true);

    expect(requiredNumberValueschema.safeParse(4).success).toBe(false);
    expect(requiredNumberValueschema.safeParse(11).success).toBe(false);
    expect(requiredNumberValueschema.safeParse('').success).toBe(false);
    expect(requiredNumberValueschema.safeParse(0).success).toBe(false);
    expect(requiredNumberValueschema.safeParse(undefined).success).toBe(false);
    expect(requiredNumberValueschema.safeParse(null).success).toBe(false);
    expect(requiredNumberValueschema.safeParse([]).success).toBe(false);
    expect(requiredNumberValueschema.safeParse({}).success).toBe(false);
  });

  it('from optional number Value input type definition can be generated and parsed with', () => {
    const optionalNumberValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'number',
      inputType: 'number',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      min: 5,
      max: 10,
      defaultValue: 7,
      inputWidth: '12',
      isDisabled: false,
      isRequired: false,
      isUnique: false,
    });

    expect(optionalNumberValueschema.safeParse(5).success).toBe(true);
    expect(optionalNumberValueschema.safeParse(10).success).toBe(true);
    expect(optionalNumberValueschema.safeParse(7.5).success).toBe(true);
    expect(optionalNumberValueschema.safeParse(undefined).success).toBe(true);

    expect(optionalNumberValueschema.safeParse(4).success).toBe(false);
    expect(optionalNumberValueschema.safeParse(11).success).toBe(false);
    expect(optionalNumberValueschema.safeParse('').success).toBe(false);
    expect(optionalNumberValueschema.safeParse(null).success).toBe(false);
    expect(optionalNumberValueschema.safeParse(0).success).toBe(false);
    expect(optionalNumberValueschema.safeParse([]).success).toBe(false);
    expect(optionalNumberValueschema.safeParse({}).success).toBe(false);
  });

  it('from required range Value input type definition can be generated and parsed with', () => {
    const requiredRangeValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'number',
      inputType: 'range',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      min: 5,
      max: 10,
      defaultValue: 7,
      inputWidth: '12',
      isDisabled: false,
      isRequired: true,
      isUnique: false,
    });

    expect(requiredRangeValueschema.safeParse(5).success).toBe(true);
    expect(requiredRangeValueschema.safeParse(10).success).toBe(true);
    expect(requiredRangeValueschema.safeParse(7.5).success).toBe(true);

    expect(requiredRangeValueschema.safeParse(4).success).toBe(false);
    expect(requiredRangeValueschema.safeParse(11).success).toBe(false);
    expect(requiredRangeValueschema.safeParse('').success).toBe(false);
    expect(requiredRangeValueschema.safeParse(undefined).success).toBe(false);
    expect(requiredRangeValueschema.safeParse(null).success).toBe(false);
    expect(requiredRangeValueschema.safeParse(0).success).toBe(false);
    expect(requiredRangeValueschema.safeParse([]).success).toBe(false);
    expect(requiredRangeValueschema.safeParse({}).success).toBe(false);
  });

  it('from optional range Value input type definition can be generated and parsed with', () => {
    const optionalRangeValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'number',
      inputType: 'range',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      min: 5,
      max: 10,
      defaultValue: 7,
      inputWidth: '12',
      isDisabled: false,
      isRequired: false,
      isUnique: false,
    });

    expect(optionalRangeValueschema.safeParse(5).success).toBe(true);
    expect(optionalRangeValueschema.safeParse(10).success).toBe(true);
    expect(optionalRangeValueschema.safeParse(7.5).success).toBe(true);
    expect(optionalRangeValueschema.safeParse(undefined).success).toBe(true);

    expect(optionalRangeValueschema.safeParse(4).success).toBe(false);
    expect(optionalRangeValueschema.safeParse(11).success).toBe(false);
    expect(optionalRangeValueschema.safeParse('').success).toBe(false);
    expect(optionalRangeValueschema.safeParse(null).success).toBe(false);
    expect(optionalRangeValueschema.safeParse(0).success).toBe(false);
    expect(optionalRangeValueschema.safeParse([]).success).toBe(false);
    expect(optionalRangeValueschema.safeParse({}).success).toBe(false);
  });

  it('from required text Value input type definition can be generated and parsed with', () => {
    const requiredTextValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'string',
      inputType: 'text',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      min: 5,
      max: 8,
      defaultValue: 'Test',
      inputWidth: '12',
      isDisabled: false,
      isRequired: true,
      isUnique: false,
    });

    expect(requiredTextValueschema.safeParse('123456').success).toBe(true);

    expect(requiredTextValueschema.safeParse(4).success).toBe(false);
    expect(requiredTextValueschema.safeParse(11).success).toBe(false);
    expect(requiredTextValueschema.safeParse('').success).toBe(false);
    expect(requiredTextValueschema.safeParse('1234').success).toBe(false);
    expect(requiredTextValueschema.safeParse('123456789').success).toBe(false);
    expect(requiredTextValueschema.safeParse('        ').success).toBe(false);
    expect(requiredTextValueschema.safeParse(undefined).success).toBe(false);
    expect(requiredTextValueschema.safeParse(null).success).toBe(false);
    expect(requiredTextValueschema.safeParse(0).success).toBe(false);
    expect(requiredTextValueschema.safeParse([]).success).toBe(false);
    expect(requiredTextValueschema.safeParse({}).success).toBe(false);
  });

  it('from optional text Value input type definition can be generated and parsed with', () => {
    const optionalTextValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'string',
      inputType: 'text',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      min: 5,
      max: 8,
      defaultValue: 'Test',
      inputWidth: '12',
      isDisabled: false,
      isRequired: false,
      isUnique: false,
    });

    expect(optionalTextValueschema.safeParse('123456').success).toBe(true);
    expect(optionalTextValueschema.safeParse(undefined).success).toBe(true);

    expect(optionalTextValueschema.safeParse(6).success).toBe(false);
    expect(optionalTextValueschema.safeParse(123456).success).toBe(false);
    expect(optionalTextValueschema.safeParse('').success).toBe(false);
    expect(optionalTextValueschema.safeParse('        ').success).toBe(false);
    expect(optionalTextValueschema.safeParse(null).success).toBe(false);
    expect(optionalTextValueschema.safeParse(0).success).toBe(false);
    expect(optionalTextValueschema.safeParse([]).success).toBe(false);
    expect(optionalTextValueschema.safeParse({}).success).toBe(false);
  });

  it('from required email Value input type definition can be generated and parsed with', () => {
    const requiredEmailValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'string',
      inputType: 'email',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      inputWidth: '12',
      isDisabled: false,
      isRequired: true,
      isUnique: false,
    });

    expect(requiredEmailValueschema.safeParse('test@example.com').success).toBe(
      true
    );

    expect(requiredEmailValueschema.safeParse(4).success).toBe(false);
    expect(requiredEmailValueschema.safeParse(11).success).toBe(false);
    expect(requiredEmailValueschema.safeParse('').success).toBe(false);
    expect(requiredEmailValueschema.safeParse('1234').success).toBe(false);
    expect(requiredEmailValueschema.safeParse('123456789').success).toBe(false);
    expect(requiredEmailValueschema.safeParse('        ').success).toBe(false);
    expect(requiredEmailValueschema.safeParse(undefined).success).toBe(false);
    expect(requiredEmailValueschema.safeParse(null).success).toBe(false);
    expect(requiredEmailValueschema.safeParse(0).success).toBe(false);
    expect(requiredEmailValueschema.safeParse([]).success).toBe(false);
    expect(requiredEmailValueschema.safeParse({}).success).toBe(false);
  });

  it('from optional email Value input type definition can be generated and parsed with', () => {
    const optionalEmailValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'string',
      inputType: 'email',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      inputWidth: '12',
      isDisabled: false,
      isRequired: false,
      isUnique: false,
    });

    expect(optionalEmailValueschema.safeParse('test@example.com').success).toBe(
      true
    );
    expect(optionalEmailValueschema.safeParse(undefined).success).toBe(true);

    expect(optionalEmailValueschema.safeParse(6).success).toBe(false);
    expect(optionalEmailValueschema.safeParse(123456).success).toBe(false);
    expect(optionalEmailValueschema.safeParse('').success).toBe(false);
    expect(optionalEmailValueschema.safeParse('        ').success).toBe(false);
    expect(optionalEmailValueschema.safeParse(null).success).toBe(false);
    expect(optionalEmailValueschema.safeParse(0).success).toBe(false);
    expect(optionalEmailValueschema.safeParse([]).success).toBe(false);
    expect(optionalEmailValueschema.safeParse({}).success).toBe(false);
  });

  it('from required url Value input type definition can be generated and parsed with', () => {
    const requiredUrlValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'string',
      inputType: 'url',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      inputWidth: '12',
      isDisabled: false,
      isRequired: true,
      isUnique: false,
    });

    expect(requiredUrlValueschema.safeParse('http://example.com').success).toBe(
      true
    );
    expect(
      requiredUrlValueschema.safeParse('https://example.com').success
    ).toBe(true);

    expect(requiredUrlValueschema.safeParse('').success).toBe(false);
    expect(requiredUrlValueschema.safeParse(undefined).success).toBe(false);
    expect(requiredUrlValueschema.safeParse(null).success).toBe(false);
    expect(requiredUrlValueschema.safeParse(0).success).toBe(false);
    expect(requiredUrlValueschema.safeParse([]).success).toBe(false);
    expect(requiredUrlValueschema.safeParse({}).success).toBe(false);
  });

  it('from optional url Value input type definition can be generated and parsed with', () => {
    const optionalUrlValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'string',
      inputType: 'url',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      inputWidth: '12',
      isDisabled: false,
      isRequired: false,
      isUnique: false,
    });

    expect(optionalUrlValueschema.safeParse('http://example.com').success).toBe(
      true
    );
    expect(
      optionalUrlValueschema.safeParse('https://example.com').success
    ).toBe(true);
    expect(optionalUrlValueschema.safeParse(undefined).success).toBe(true);

    expect(optionalUrlValueschema.safeParse('').success).toBe(false);
    expect(optionalUrlValueschema.safeParse(null).success).toBe(false);
    expect(optionalUrlValueschema.safeParse(0).success).toBe(false);
    expect(optionalUrlValueschema.safeParse([]).success).toBe(false);
    expect(optionalUrlValueschema.safeParse({}).success).toBe(false);
  });

  it('from required asset Value input type definition can be generated and parsed with', () => {
    const requiredAssetValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'reference',
      inputType: 'asset',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      inputWidth: '12',
      isDisabled: false,
      isRequired: true,
    });

    expect(
      requiredAssetValueschema.safeParse({
        referenceObjectType: 'asset',
        references: [
          {
            id: uuid(),
            language: 'en',
          },
        ],
      }).success
    ).toBe(true);

    expect(
      requiredAssetValueschema.safeParse({
        referenceObjectType: 'asset',
        references: [],
      }).success
    ).toBe(false);
    expect(requiredAssetValueschema.safeParse('').success).toBe(false);
    expect(requiredAssetValueschema.safeParse(undefined).success).toBe(false);
    expect(requiredAssetValueschema.safeParse(null).success).toBe(false);
    expect(requiredAssetValueschema.safeParse(0).success).toBe(false);
    expect(requiredAssetValueschema.safeParse([]).success).toBe(false);
    expect(requiredAssetValueschema.safeParse({}).success).toBe(false);
  });

  it('from optional asset Value input type definition can be generated and parsed with', () => {
    const optionalAssetValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'reference',
      inputType: 'asset',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      inputWidth: '12',
      isDisabled: false,
      isRequired: false,
    });

    expect(
      optionalAssetValueschema.safeParse({
        referenceObjectType: 'asset',
        references: [
          {
            id: uuid(),
            language: 'en',
          },
        ],
      }).success
    ).toBe(true);
    expect(
      optionalAssetValueschema.safeParse({
        referenceObjectType: 'asset',
        references: [],
      }).success
    ).toBe(true);

    expect(optionalAssetValueschema.safeParse('').success).toBe(false);
    expect(optionalAssetValueschema.safeParse(undefined).success).toBe(false);
    expect(optionalAssetValueschema.safeParse(null).success).toBe(false);
    expect(optionalAssetValueschema.safeParse(0).success).toBe(false);
    expect(optionalAssetValueschema.safeParse([]).success).toBe(false);
    expect(optionalAssetValueschema.safeParse({}).success).toBe(false);
  });

  it('from required asset Value input type definition with a min and max can be generated and parsed with', () => {
    const requiredAssetValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'reference',
      inputType: 'asset',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      min: 2,
      max: 3,
      inputWidth: '12',
      isDisabled: false,
      isRequired: true,
    });

    expect(
      requiredAssetValueschema.safeParse({
        referenceObjectType: 'asset',
        references: [
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
    ).toBe(true);
    expect(
      requiredAssetValueschema.safeParse({
        referenceObjectType: 'asset',
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
    ).toBe(true);

    expect(
      requiredAssetValueschema.safeParse({
        referenceObjectType: 'asset',
        references: [],
      }).success
    ).toBe(false);
    expect(
      requiredAssetValueschema.safeParse({
        referenceObjectType: 'asset',
        references: [
          {
            id: uuid(),
            language: 'en',
          },
        ],
      }).success
    ).toBe(false);
    expect(
      requiredAssetValueschema.safeParse({
        referenceObjectType: 'asset',
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
          {
            id: uuid(),
            language: 'en',
          },
        ],
      }).success
    ).toBe(false);
    expect(requiredAssetValueschema.safeParse('').success).toBe(false);
    expect(requiredAssetValueschema.safeParse(undefined).success).toBe(false);
    expect(requiredAssetValueschema.safeParse(null).success).toBe(false);
    expect(requiredAssetValueschema.safeParse(0).success).toBe(false);
    expect(requiredAssetValueschema.safeParse([]).success).toBe(false);
    expect(requiredAssetValueschema.safeParse({}).success).toBe(false);
  });
});

import { faker } from '@faker-js/faker';
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

    expect(
      requiredEmailValueschema.safeParse(faker.internet.email()).success
    ).toBe(true);

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

    expect(
      optionalEmailValueschema.safeParse(faker.internet.email()).success
    ).toBe(true);
    expect(
      optionalEmailValueschema.safeParse(
        faker.internet.email({ allowSpecialCharacters: true })
      ).success
    ).toBe(true);
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

    expect(
      requiredUrlValueschema.safeParse(faker.internet.url({ protocol: 'http' }))
        .success
    ).toBe(true);
    expect(
      requiredUrlValueschema.safeParse(
        faker.internet.url({ protocol: 'https' })
      ).success
    ).toBe(true);
    expect(
      requiredUrlValueschema.safeParse(
        faker.internet.url({ appendSlash: true })
      ).success
    ).toBe(true);
    expect(requiredUrlValueschema.safeParse('http://localhost/').success).toBe(
      true
    );
    expect(requiredUrlValueschema.safeParse('https://localhost/').success).toBe(
      true
    );

    expect(requiredUrlValueschema.safeParse('').success).toBe(false);
    expect(requiredUrlValueschema.safeParse('example.com').success).toBe(false);
    expect(
      requiredUrlValueschema.safeParse('https//example.com/').success
    ).toBe(false);
    expect(requiredUrlValueschema.safeParse('https:').success).toBe(false);

    // @todo The following (and possible more) URLs are passing although they should not. Zod v4 should provide better parsing
    // @see https://github.com/colinhacks/zod/issues/2236 and https://github.com/colinhacks/zod/pull/3049

    // expect(
    //   requiredUrlValueschema.safeParse('https:/example.com/').success
    // ).toBe(false);
    // expect(requiredUrlValueschema.safeParse('https:example.com/').success).toBe(
    //   false
    // );
    // expect(
    //   requiredUrlValueschema.safeParse('https:.....///example.com/').success
    // ).toBe(false);

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

  it('from required ip Value input type definition can be generated and parsed with', () => {
    const requiredIpValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'string',
      inputType: 'ip',
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

    expect(requiredIpValueschema.safeParse(faker.internet.ipv4()).success).toBe(
      true
    );
    expect(requiredIpValueschema.safeParse(faker.internet.ipv6()).success).toBe(
      true
    );

    expect(requiredIpValueschema.safeParse('').success).toBe(false);
    expect(requiredIpValueschema.safeParse(undefined).success).toBe(false);
    expect(requiredIpValueschema.safeParse(null).success).toBe(false);
    expect(requiredIpValueschema.safeParse(0).success).toBe(false);
    expect(requiredIpValueschema.safeParse([]).success).toBe(false);
    expect(requiredIpValueschema.safeParse({}).success).toBe(false);
  });

  it('from required date Value input type definition can be generated and parsed with', () => {
    const requiredDateValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'string',
      inputType: 'date',
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
    const date = faker.date.anytime().toISOString().split('T')[0];

    expect(requiredDateValueschema.safeParse(date).success).toBe(true);

    expect(requiredDateValueschema.safeParse('').success).toBe(false);
    expect(requiredDateValueschema.safeParse(undefined).success).toBe(false);
    expect(requiredDateValueschema.safeParse(null).success).toBe(false);
    expect(requiredDateValueschema.safeParse(0).success).toBe(false);
    expect(requiredDateValueschema.safeParse([]).success).toBe(false);
    expect(requiredDateValueschema.safeParse({}).success).toBe(false);
  });

  it('from required time Value input type definition can be generated and parsed with', () => {
    const requiredTimeValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'string',
      inputType: 'time',
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
    expect(requiredTimeValueschema.safeParse('00:00:00').success).toBe(true);
    expect(requiredTimeValueschema.safeParse('09:52:31').success).toBe(true);
    expect(requiredTimeValueschema.safeParse('23:59:59.9999999').success).toBe(
      true
    );

    expect(requiredTimeValueschema.safeParse('').success).toBe(false);
    expect(requiredTimeValueschema.safeParse(undefined).success).toBe(false);
    expect(requiredTimeValueschema.safeParse(null).success).toBe(false);
    expect(requiredTimeValueschema.safeParse(0).success).toBe(false);
    expect(requiredTimeValueschema.safeParse([]).success).toBe(false);
    expect(requiredTimeValueschema.safeParse({}).success).toBe(false);
  });

  it('from required datetime Value input type definition can be generated and parsed with', () => {
    const requiredDatetimeValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'string',
      inputType: 'datetime',
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
    const datetime = faker.date.anytime().toISOString();

    expect(requiredDatetimeValueschema.safeParse(datetime).success).toBe(true);

    expect(requiredDatetimeValueschema.safeParse('').success).toBe(false);
    expect(requiredDatetimeValueschema.safeParse(undefined).success).toBe(
      false
    );
    expect(requiredDatetimeValueschema.safeParse(null).success).toBe(false);
    expect(requiredDatetimeValueschema.safeParse(0).success).toBe(false);
    expect(requiredDatetimeValueschema.safeParse([]).success).toBe(false);
    expect(requiredDatetimeValueschema.safeParse({}).success).toBe(false);
  });

  it('from required telephone Value input type definition can be generated and parsed with', () => {
    const requiredDatetimeValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'string',
      inputType: 'telephone',
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

    expect(
      requiredDatetimeValueschema.safeParse(faker.phone.number()).success
    ).toBe(true);

    expect(requiredDatetimeValueschema.safeParse('').success).toBe(false);
    expect(requiredDatetimeValueschema.safeParse(undefined).success).toBe(
      false
    );
    expect(requiredDatetimeValueschema.safeParse(null).success).toBe(false);
    expect(requiredDatetimeValueschema.safeParse(0).success).toBe(false);
    expect(requiredDatetimeValueschema.safeParse([]).success).toBe(false);
    expect(requiredDatetimeValueschema.safeParse({}).success).toBe(false);
  });

  it('from required Asset Value input type definition can be generated and parsed with', () => {
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
      requiredAssetValueschema.safeParse([
        {
          objectType: 'asset',
          id: uuid(),
          language: 'en',
        },
      ]).success
    ).toBe(true);

    expect(requiredAssetValueschema.safeParse([]).success).toBe(false);
    expect(
      requiredAssetValueschema.safeParse([
        {
          objectType: 'entry',
          id: uuid(),
        },
      ]).success
    ).toBe(false);
    expect(requiredAssetValueschema.safeParse('').success).toBe(false);
    expect(requiredAssetValueschema.safeParse(undefined).success).toBe(false);
    expect(requiredAssetValueschema.safeParse(null).success).toBe(false);
    expect(requiredAssetValueschema.safeParse(0).success).toBe(false);
    expect(requiredAssetValueschema.safeParse({}).success).toBe(false);
  });

  it('from optional Asset Value input type definition can be generated and parsed with', () => {
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
      optionalAssetValueschema.safeParse([
        {
          objectType: 'asset',
          id: uuid(),
          language: 'en',
        },
      ]).success
    ).toBe(true);
    expect(optionalAssetValueschema.safeParse([]).success).toBe(true);

    expect(optionalAssetValueschema.safeParse('').success).toBe(false);
    expect(optionalAssetValueschema.safeParse(undefined).success).toBe(false);
    expect(optionalAssetValueschema.safeParse(null).success).toBe(false);
    expect(optionalAssetValueschema.safeParse(0).success).toBe(false);
    expect(optionalAssetValueschema.safeParse({}).success).toBe(false);
  });

  it('from required Asset Value input type definition with a min and max can be generated and parsed with', () => {
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
      requiredAssetValueschema.safeParse([
        {
          objectType: 'asset',
          id: uuid(),
          language: 'en',
        },
        {
          objectType: 'asset',
          id: uuid(),
          language: 'en',
        },
      ]).success
    ).toBe(true);
    expect(
      requiredAssetValueschema.safeParse([
        {
          objectType: 'asset',
          id: uuid(),
          language: 'en',
        },
        {
          objectType: 'asset',
          id: uuid(),
          language: 'en',
        },
        {
          objectType: 'asset',
          id: uuid(),
          language: 'en',
        },
      ]).success
    ).toBe(true);

    expect(requiredAssetValueschema.safeParse([]).success).toBe(false);
    expect(
      requiredAssetValueschema.safeParse([
        {
          objectType: 'asset',
          id: uuid(),
          language: 'en',
        },
      ]).success
    ).toBe(false);
    expect(
      requiredAssetValueschema.safeParse([
        {
          objectType: 'asset',
          id: uuid(),
          language: 'en',
        },
        {
          objectType: 'asset',
          id: uuid(),
          language: 'en',
        },
        {
          objectType: 'asset',
          id: uuid(),
          language: 'en',
        },
        {
          objectType: 'asset',
          id: uuid(),
          language: 'en',
        },
      ]).success
    ).toBe(false);
    expect(requiredAssetValueschema.safeParse('').success).toBe(false);
    expect(requiredAssetValueschema.safeParse(undefined).success).toBe(false);
    expect(requiredAssetValueschema.safeParse(null).success).toBe(false);
    expect(requiredAssetValueschema.safeParse(0).success).toBe(false);
    expect(requiredAssetValueschema.safeParse({}).success).toBe(false);
  });

  it('from required Entry Value input type definition can be generated and parsed with', () => {
    const requiredEntryValueschema = getValueContentSchemaFromDefinition({
      id: uuid(),
      valueType: 'reference',
      inputType: 'entry',
      label: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      inputWidth: '12',
      ofCollections: [uuid()],
      isDisabled: false,
      isRequired: true,
    });

    expect(
      requiredEntryValueschema.safeParse([
        {
          objectType: 'entry',
          id: uuid(),
        },
      ]).success
    ).toBe(true);

    expect(requiredEntryValueschema.safeParse([]).success).toBe(false);
    expect(
      requiredEntryValueschema.safeParse([
        {
          objectType: 'asset',
          id: uuid(),
        },
      ]).success
    ).toBe(false);
    expect(requiredEntryValueschema.safeParse('').success).toBe(false);
    expect(requiredEntryValueschema.safeParse(undefined).success).toBe(false);
    expect(requiredEntryValueschema.safeParse(null).success).toBe(false);
    expect(requiredEntryValueschema.safeParse(0).success).toBe(false);
    expect(requiredEntryValueschema.safeParse({}).success).toBe(false);
  });
});

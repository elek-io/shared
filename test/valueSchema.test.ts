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

    booleanValueschema.parse(true);
    booleanValueschema.parse(false);

    expect(() => booleanValueschema.parse('')).toThrow();
    expect(() => booleanValueschema.parse(0)).toThrow();
    expect(() => booleanValueschema.parse(undefined)).toThrow();
    expect(() => booleanValueschema.parse(null)).toThrow();
    expect(() => booleanValueschema.parse([])).toThrow();
    expect(() => booleanValueschema.parse({})).toThrow();
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

    requiredNumberValueschema.parse(5);
    requiredNumberValueschema.parse(10);
    requiredNumberValueschema.parse(7.5);

    expect(() => requiredNumberValueschema.parse(4)).toThrow();
    expect(() => requiredNumberValueschema.parse(11)).toThrow();
    expect(() => requiredNumberValueschema.parse('')).toThrow();
    expect(() => requiredNumberValueschema.parse(0)).toThrow();
    expect(() => requiredNumberValueschema.parse(undefined)).toThrow();
    expect(() => requiredNumberValueschema.parse(null)).toThrow();
    expect(() => requiredNumberValueschema.parse([])).toThrow();
    expect(() => requiredNumberValueschema.parse({})).toThrow();
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

    optionalNumberValueschema.parse(5);
    optionalNumberValueschema.parse(10);
    optionalNumberValueschema.parse(7.5);
    optionalNumberValueschema.parse(undefined);

    expect(() => optionalNumberValueschema.parse(4)).toThrow();
    expect(() => optionalNumberValueschema.parse(11)).toThrow();
    expect(() => optionalNumberValueschema.parse('')).toThrow();
    expect(() => optionalNumberValueschema.parse(null)).toThrow();
    expect(() => optionalNumberValueschema.parse(0)).toThrow();
    expect(() => optionalNumberValueschema.parse([])).toThrow();
    expect(() => optionalNumberValueschema.parse({})).toThrow();
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

    requiredRangeValueschema.parse(5);
    requiredRangeValueschema.parse(10);
    requiredRangeValueschema.parse(7.5);

    expect(() => requiredRangeValueschema.parse(4)).toThrow();
    expect(() => requiredRangeValueschema.parse(11)).toThrow();
    expect(() => requiredRangeValueschema.parse('')).toThrow();
    expect(() => requiredRangeValueschema.parse(undefined)).toThrow();
    expect(() => requiredRangeValueschema.parse(null)).toThrow();
    expect(() => requiredRangeValueschema.parse(0)).toThrow();
    expect(() => requiredRangeValueschema.parse([])).toThrow();
    expect(() => requiredRangeValueschema.parse({})).toThrow();
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

    optionalRangeValueschema.parse(5);
    optionalRangeValueschema.parse(10);
    optionalRangeValueschema.parse(7.5);
    optionalRangeValueschema.parse(undefined);

    expect(() => optionalRangeValueschema.parse(4)).toThrow();
    expect(() => optionalRangeValueschema.parse(11)).toThrow();
    expect(() => optionalRangeValueschema.parse('')).toThrow();
    expect(() => optionalRangeValueschema.parse(null)).toThrow();
    expect(() => optionalRangeValueschema.parse(0)).toThrow();
    expect(() => optionalRangeValueschema.parse([])).toThrow();
    expect(() => optionalRangeValueschema.parse({})).toThrow();
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

    requiredTextValueschema.parse('123456');

    expect(() => requiredTextValueschema.parse(4)).toThrow();
    expect(() => requiredTextValueschema.parse(11)).toThrow();
    expect(() => requiredTextValueschema.parse('')).toThrow();
    expect(() => requiredTextValueschema.parse('1234')).toThrow();
    expect(() => requiredTextValueschema.parse('123456789')).toThrow();
    expect(() => requiredTextValueschema.parse('        ')).toThrow();
    expect(() => requiredTextValueschema.parse(undefined)).toThrow();
    expect(() => requiredTextValueschema.parse(null)).toThrow();
    expect(() => requiredTextValueschema.parse(0)).toThrow();
    expect(() => requiredTextValueschema.parse([])).toThrow();
    expect(() => requiredTextValueschema.parse({})).toThrow();
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

    optionalTextValueschema.parse('123456');
    optionalTextValueschema.parse(undefined);

    expect(() => optionalTextValueschema.parse(6)).toThrow();
    expect(() => optionalTextValueschema.parse(123456)).toThrow();
    expect(() => optionalTextValueschema.parse('')).toThrow();
    expect(() => optionalTextValueschema.parse('        ')).toThrow();
    expect(() => optionalTextValueschema.parse(null)).toThrow();
    expect(() => optionalTextValueschema.parse(0)).toThrow();
    expect(() => optionalTextValueschema.parse([])).toThrow();
    expect(() => optionalTextValueschema.parse({})).toThrow();
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

    requiredEmailValueschema.parse(faker.internet.email());

    expect(() => requiredEmailValueschema.parse(4)).toThrow();
    expect(() => requiredEmailValueschema.parse(11)).toThrow();
    expect(() => requiredEmailValueschema.parse('')).toThrow();
    expect(() => requiredEmailValueschema.parse('1234')).toThrow();
    expect(() => requiredEmailValueschema.parse('123456789')).toThrow();
    expect(() => requiredEmailValueschema.parse('        ')).toThrow();
    expect(() => requiredEmailValueschema.parse(undefined)).toThrow();
    expect(() => requiredEmailValueschema.parse(null)).toThrow();
    expect(() => requiredEmailValueschema.parse(0)).toThrow();
    expect(() => requiredEmailValueschema.parse([])).toThrow();
    expect(() => requiredEmailValueschema.parse({})).toThrow();
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

    optionalEmailValueschema.parse(faker.internet.email());
    optionalEmailValueschema.parse(undefined);

    expect(() => optionalEmailValueschema.parse(6)).toThrow();
    expect(() => optionalEmailValueschema.parse(123456)).toThrow();
    expect(() => optionalEmailValueschema.parse('')).toThrow();
    expect(() => optionalEmailValueschema.parse('        ')).toThrow();
    expect(() => optionalEmailValueschema.parse(null)).toThrow();
    expect(() => optionalEmailValueschema.parse(0)).toThrow();
    expect(() => optionalEmailValueschema.parse([])).toThrow();
    expect(() => optionalEmailValueschema.parse({})).toThrow();
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

    requiredUrlValueschema.parse(faker.internet.url({ protocol: 'http' }));
    requiredUrlValueschema.parse(faker.internet.url({ protocol: 'https' }));
    requiredUrlValueschema.parse(faker.internet.url({ appendSlash: true }));
    requiredUrlValueschema.parse('http://localhost/');
    requiredUrlValueschema.parse('https://localhost/');

    expect(() => requiredUrlValueschema.parse('')).toThrow();
    expect(() => requiredUrlValueschema.parse('example.com')).toThrow();
    expect(() => requiredUrlValueschema.parse('https//example.com/')).toThrow();
    expect(() => requiredUrlValueschema.parse('https:')).toThrow();

    // @todo The following (and possible more) URLs are passing although they should not. Zod v4 should provide better parsing
    // @see https://github.com/colinhacks/zod/issues/2236 and https://github.com/colinhacks/zod/pull/3049

    // expect(() =>
    //   requiredUrlValueschema.parse('https:/example.com/')
    // ).toThrow();
    // expect(() => requiredUrlValueschema.parse('https:example.com/')).toBe(
    //   false
    // );
    // expect(() =>
    //   requiredUrlValueschema.parse('https:.....///example.com/')
    // ).toThrow();

    expect(() => requiredUrlValueschema.parse(undefined)).toThrow();
    expect(() => requiredUrlValueschema.parse(null)).toThrow();
    expect(() => requiredUrlValueschema.parse(0)).toThrow();
    expect(() => requiredUrlValueschema.parse([])).toThrow();
    expect(() => requiredUrlValueschema.parse({})).toThrow();
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

    optionalUrlValueschema.parse('http://example.com');
    optionalUrlValueschema.parse('https://example.com');
    optionalUrlValueschema.parse(undefined);

    expect(() => optionalUrlValueschema.parse('')).toThrow();
    expect(() => optionalUrlValueschema.parse(null)).toThrow();
    expect(() => optionalUrlValueschema.parse(0)).toThrow();
    expect(() => optionalUrlValueschema.parse([])).toThrow();
    expect(() => optionalUrlValueschema.parse({})).toThrow();
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

    requiredIpValueschema.parse(faker.internet.ipv4());
    requiredIpValueschema.parse(faker.internet.ipv6());

    expect(() => requiredIpValueschema.parse('')).toThrow();
    expect(() => requiredIpValueschema.parse(undefined)).toThrow();
    expect(() => requiredIpValueschema.parse(null)).toThrow();
    expect(() => requiredIpValueschema.parse(0)).toThrow();
    expect(() => requiredIpValueschema.parse([])).toThrow();
    expect(() => requiredIpValueschema.parse({})).toThrow();
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

    requiredDateValueschema.parse(date);

    expect(() => requiredDateValueschema.parse('')).toThrow();
    expect(() => requiredDateValueschema.parse(undefined)).toThrow();
    expect(() => requiredDateValueschema.parse(null)).toThrow();
    expect(() => requiredDateValueschema.parse(0)).toThrow();
    expect(() => requiredDateValueschema.parse([])).toThrow();
    expect(() => requiredDateValueschema.parse({})).toThrow();
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
    requiredTimeValueschema.parse('00:00:00');
    requiredTimeValueschema.parse('09:52:31');
    requiredTimeValueschema.parse('23:59:59.9999999');

    expect(() => requiredTimeValueschema.parse('')).toThrow();
    expect(() => requiredTimeValueschema.parse(undefined)).toThrow();
    expect(() => requiredTimeValueschema.parse(null)).toThrow();
    expect(() => requiredTimeValueschema.parse(0)).toThrow();
    expect(() => requiredTimeValueschema.parse([])).toThrow();
    expect(() => requiredTimeValueschema.parse({})).toThrow();
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

    requiredDatetimeValueschema.parse(datetime);

    expect(() => requiredDatetimeValueschema.parse('')).toThrow();
    expect(() => requiredDatetimeValueschema.parse(undefined)).toThrow();
    expect(() => requiredDatetimeValueschema.parse(null)).toThrow();
    expect(() => requiredDatetimeValueschema.parse(0)).toThrow();
    expect(() => requiredDatetimeValueschema.parse([])).toThrow();
    expect(() => requiredDatetimeValueschema.parse({})).toThrow();
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

    requiredDatetimeValueschema.parse(faker.phone.number());

    expect(() => requiredDatetimeValueschema.parse('')).toThrow();
    expect(() => requiredDatetimeValueschema.parse(undefined)).toThrow();
    expect(() => requiredDatetimeValueschema.parse(null)).toThrow();
    expect(() => requiredDatetimeValueschema.parse(0)).toThrow();
    expect(() => requiredDatetimeValueschema.parse([])).toThrow();
    expect(() => requiredDatetimeValueschema.parse({})).toThrow();
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

    requiredAssetValueschema.parse([
      {
        objectType: 'asset',
        id: uuid(),
        language: 'en',
      },
    ]);

    expect(() => requiredAssetValueschema.parse([])).toThrow();
    expect(() =>
      requiredAssetValueschema.parse([
        {
          objectType: 'entry',
          id: uuid(),
        },
      ])
    ).toThrow();
    expect(() => requiredAssetValueschema.parse('')).toThrow();
    expect(() => requiredAssetValueschema.parse(undefined)).toThrow();
    expect(() => requiredAssetValueschema.parse(null)).toThrow();
    expect(() => requiredAssetValueschema.parse(0)).toThrow();
    expect(() => requiredAssetValueschema.parse({})).toThrow();
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

    optionalAssetValueschema.parse([
      {
        objectType: 'asset',
        id: uuid(),
        language: 'en',
      },
    ]);

    optionalAssetValueschema.parse([]);

    expect(() => optionalAssetValueschema.parse('')).toThrow();
    expect(() => optionalAssetValueschema.parse(undefined)).toThrow();
    expect(() => optionalAssetValueschema.parse(null)).toThrow();
    expect(() => optionalAssetValueschema.parse(0)).toThrow();
    expect(() => optionalAssetValueschema.parse({})).toThrow();
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

    requiredAssetValueschema.parse([
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
    ]);

    requiredAssetValueschema.parse([
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
    ]);

    expect(() => requiredAssetValueschema.parse([])).toThrow();
    expect(() =>
      requiredAssetValueschema.parse([
        {
          objectType: 'asset',
          id: uuid(),
          language: 'en',
        },
      ])
    ).toThrow();
    expect(() =>
      requiredAssetValueschema.parse([
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
      ])
    ).toThrow();
    expect(() => requiredAssetValueschema.parse('')).toThrow();
    expect(() => requiredAssetValueschema.parse(undefined)).toThrow();
    expect(() => requiredAssetValueschema.parse(null)).toThrow();
    expect(() => requiredAssetValueschema.parse(0)).toThrow();
    expect(() => requiredAssetValueschema.parse({})).toThrow();
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

    requiredEntryValueschema.parse([
      {
        objectType: 'entry',
        id: uuid(),
      },
    ]);

    expect(() => requiredEntryValueschema.parse([])).toThrow();
    expect(() =>
      requiredEntryValueschema.parse([
        {
          objectType: 'asset',
          id: uuid(),
        },
      ])
    ).toThrow();
    expect(() => requiredEntryValueschema.parse('')).toThrow();
    expect(() => requiredEntryValueschema.parse(undefined)).toThrow();
    expect(() => requiredEntryValueschema.parse(null)).toThrow();
    expect(() => requiredEntryValueschema.parse(0)).toThrow();
    expect(() => requiredEntryValueschema.parse({})).toThrow();
  });
});

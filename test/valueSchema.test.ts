import { describe, expect, it } from 'vitest';
import { getValueSchemaFromDefinition } from '../src';

describe('Dynamic zod schema', () => {
  it('can be generated from boolean Value type definition', () => {
    const requiredBooleanValueschema = getValueSchemaFromDefinition({
      id: '',
      valueType: 'boolean',
      name: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      defaultValue: true,
      inputType: 'toggle',
      inputWidth: '12',
      isDisabled: false,
      isRequired: true,
    });

    expect(requiredBooleanValueschema.safeParse(true).success).toBe(true);
    expect(requiredBooleanValueschema.safeParse(false).success).toBe(true);
    expect(requiredBooleanValueschema.safeParse('test').success).toBe(false);
    expect(requiredBooleanValueschema.safeParse(1).success).toBe(false);
    expect(requiredBooleanValueschema.safeParse(undefined).success).toBe(false);
  });

  it('can be generated from optional boolean Value type definition', () => {
    const optionalBooleanValueschema = getValueSchemaFromDefinition({
      id: '',
      valueType: 'boolean',
      name: {
        en: 'Test',
      },
      description: {
        en: 'Test',
      },
      defaultValue: true,
      inputType: 'toggle',
      inputWidth: '12',
      isDisabled: false,
      isRequired: false,
    });

    expect(optionalBooleanValueschema.safeParse(true).success).toBe(true);
    expect(optionalBooleanValueschema.safeParse(false).success).toBe(true);
    expect(optionalBooleanValueschema.safeParse('test').success).toBe(false);
    expect(optionalBooleanValueschema.safeParse(1).success).toBe(false);
    expect(optionalBooleanValueschema.safeParse(undefined).success).toBe(true);
  });

  it('can be generated from number Value type definition', () => {
    const requiredNumberValueschema = getValueSchemaFromDefinition({
      id: '',
      valueType: 'number',
      name: {
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

  it('can be generated from number Value type definition', () => {
    const optionalNumberValueschema = getValueSchemaFromDefinition({
      id: '',
      valueType: 'number',
      name: {
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
});

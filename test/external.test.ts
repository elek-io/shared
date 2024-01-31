import { expect, test } from 'vitest';
import { uuid, uuidSchema, z } from '../dist'; // <-- Importing from dist

test('UUID can be generated', () => {
  const id = uuid();

  expect(id).toBeTypeOf('string');
  expect(id).toHaveLength(36);
});

test('UUID can be validated', () => {
  const id = uuid();
  const result = uuidSchema.safeParse(id);

  expect(result.success).toBe(true);
});

test('zod can be used', () => {
  const schema = z.object({
    foo: z.literal('bar'),
  });
  const result = schema.safeParse({ foo: 'bar' });

  expect(result.success).toBe(true);
});

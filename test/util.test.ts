import { expect, test } from 'vitest';
import { currentTimestamp, slug, uuid, uuidSchema } from '../src';

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

test('Generate the current UNIX timestamp', () => {
  const timestamp = currentTimestamp();

  expect(timestamp).toBeTypeOf('number');
  expect(timestamp).toBeGreaterThan(1700000000); // 2023-11-14
  expect(timestamp).toBeLessThan(2000000000); // 2033-05-18
});

test('Generate a slug from given string', () => {
  expect(slug('Hello World')).toBe('hello-world');
  expect(slug(' Hello World ')).toBe('hello-world');
  expect(slug('Hello   World')).toBe('hello-world');
  // expect(slug('Hello_World')).toBe('hello-world'); // @todo why is the underscore not replaced by a dash?
  expect(slug('Hello, World')).toBe('hello-world');
});

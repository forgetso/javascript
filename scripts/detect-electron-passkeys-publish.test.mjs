import { describe, expect, test } from 'vitest';

import { decideShouldBuild } from './detect-electron-passkeys-publish.mjs';

describe('decideShouldBuild', () => {
  test('returns true when the in-tree version is newer than the latest published version', () => {
    expect(decideShouldBuild('0.0.2', '0.0.1')).toBe(true);
  });

  test('returns false when the in-tree version matches the latest published version', () => {
    expect(decideShouldBuild('0.0.1', '0.0.1')).toBe(false);
  });

  test('returns true when the latest published version could not be read', () => {
    expect(decideShouldBuild('0.0.1', '')).toBe(true);
  });
});

import { describe, expect, test } from 'vitest';

import { isElectronPasskeysPackage } from './common.mjs';

describe('isElectronPasskeysPackage', () => {
  test.each([
    '@clerk/electron-passkeys',
    '@clerk/electron-passkeys-darwin-arm64',
    '@clerk/electron-passkeys-darwin-x64',
    '@clerk/electron-passkeys-win32-arm64-msvc',
    '@clerk/electron-passkeys-win32-x64-msvc',
  ])('returns true for %s', packageName => {
    expect(isElectronPasskeysPackage(packageName)).toBe(true);
  });

  test.each(['@clerk/electron', '@clerk/clerk-js'])('returns false for %s', packageName => {
    expect(isElectronPasskeysPackage(packageName)).toBe(false);
  });
});

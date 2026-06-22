#!/usr/bin/env node

import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export const WRAPPER_PACKAGE = '@clerk/electron-passkeys';
export const WRAPPER_MANIFEST = 'packages/electron-passkeys/package.json';

export function decideShouldBuild(inTreeVersion, latestPublishedVersion) {
  return inTreeVersion !== latestPublishedVersion;
}

async function readInTreeVersion() {
  const manifest = JSON.parse(await readFile(WRAPPER_MANIFEST, 'utf8'));

  return manifest.version;
}

async function readLatestPublishedVersion() {
  try {
    const { stdout } = await execFileAsync('npm', ['view', WRAPPER_PACKAGE, 'version']);

    return stdout.trim();
  } catch {
    return '';
  }
}

async function main() {
  const inTreeVersion = await readInTreeVersion();
  const latestPublishedVersion = await readLatestPublishedVersion();
  const shouldBuild = decideShouldBuild(inTreeVersion, latestPublishedVersion);

  console.log(`should-build=${shouldBuild}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  await main();
}

#!/usr/bin/env node
// Resolves the Marketplace version and stamps extensions/hagicode/package.json.
//
//   release-version.mjs stable <vX.Y.Z>     version = X.Y.Z from the release tag
//   release-version.mjs preview <run>       version = X.Y.(1000+run), X.Y.Z = highest stable tag
//                                           reachable from HEAD (0.0.0 when there is none)
//
// The Marketplace has no semver pre-release suffix, so a pre-release is an ordinary
// major.minor.patch published with --pre-release. Preview patches start at 1000 so they
// never collide with a stable patch of the same X.Y; the version is printed to stdout.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const MANIFEST = fileURLToPath(new URL('../extensions/hagicode/package.json', import.meta.url));
const STABLE_TAG = /^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

const fail = (message) => {
  console.error(`release-version: ${message}`);
  process.exit(1);
};

const [mode, arg] = process.argv.slice(2);
let version;

if (mode === 'stable') {
  const match = STABLE_TAG.exec(arg ?? '');
  if (!match) fail(`"${arg}" is not a stable vX.Y.Z tag`);
  version = match.slice(1).join('.');
} else if (mode === 'preview') {
  const run = Number(arg);
  if (!Number.isInteger(run) || run < 1) fail(`"${arg}" is not a positive run number`);
  const tags = execFileSync('git', ['tag', '--merged', 'HEAD', '--list', 'v*'], { encoding: 'utf8' })
    .split('\n')
    .map((tag) => STABLE_TAG.exec(tag.trim()))
    .filter(Boolean)
    .map((match) => match.slice(1).map(Number))
    .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
  const [major, minor] = tags.at(-1) ?? [0, 0];
  version = `${major}.${minor}.${1000 + run}`;
} else {
  fail('usage: release-version.mjs stable <vX.Y.Z> | preview <run-number>');
}

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
manifest.version = version;
writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(version);

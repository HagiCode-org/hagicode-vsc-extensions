#!/usr/bin/env bash
# Package the extensions in this repository and install them into local VS Code.
#
# Usage:
#   scripts/install-local.sh              # install every extension under extensions/
#   scripts/install-local.sh hagicode     # install only the named extension (folder name)
#
# Environment:
#   CODE_CMD   VS Code command, default code (code-insiders for Insiders, codium for VSCodium)
#   VSCE_SPEC  npx package spec for vsce, default @vscode/vsce@4.1.1
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CODE_CMD="${CODE_CMD:-code}"
VSCE_SPEC="${VSCE_SPEC:-@vscode/vsce@4.1.1}"

command -v "$CODE_CMD" >/dev/null || { echo "Command '$CODE_CMD' not found. Install VS Code or set CODE_CMD." >&2; exit 1; }
command -v npx >/dev/null || { echo "npx not found. Install Node.js 22 or later." >&2; exit 1; }

if [ "$#" -gt 0 ]; then
  names=("$@")
else
  names=()
  for dir in "$ROOT"/extensions/*/; do
    [ -f "$dir/package.json" ] && names+=("$(basename "$dir")")
  done
fi
[ "${#names[@]}" -gt 0 ] || { echo "No installable extensions under extensions/." >&2; exit 1; }

# Keep the .vsix in a temp dir so the repository stays clean
out="$(mktemp -d)"
trap 'rm -rf "$out"' EXIT

for name in "${names[@]}"; do
  dir="$ROOT/extensions/$name"
  [ -f "$dir/package.json" ] || { echo "Extension not found: extensions/$name" >&2; exit 1; }
  vsix="$out/$name.vsix"
  echo "==> Packaging $name"
  (cd "$dir" && npx --yes "$VSCE_SPEC" package --no-dependencies --out "$vsix")
  echo "==> Installing $name"
  "$CODE_CMD" --install-extension "$vsix" --force
done

echo "Done. If VS Code is already running, run 'Developer: Reload Window' to activate the extension."

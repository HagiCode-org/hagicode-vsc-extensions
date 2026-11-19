# HagiCode VS Code Extensions

This repository develops and maintains the Visual Studio Code extensions for [HagiCode](https://hagicode.com).

## Extensions

- [HagiCode](extensions/hagicode/README.md) adds the `HagiCode: Open Dashboard` command, which opens a local or remote HagiCode instance in your browser from VS Code.

## Development

Open the repository root in VS Code and press `F5` to run `Run HagiCode Extension`. In the Extension Development Host, run `HagiCode: Open Dashboard` from the Command Palette.

To install every extension into your local VS Code, run `scripts/install-local.sh`. Pass an extension folder name to install just one, for example `scripts/install-local.sh hagicode`.

Use this repository's Issues to request extensions or report problems. When you add an extension, include a `README.md` in its folder that describes the use case, how to install it, and how to run and debug it in VS Code. Give the extension an `images/icon.png` (at least 128x128 px) and reference it from the `icon` field in `package.json`.

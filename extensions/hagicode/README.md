# HagiCode for VS Code

![HagiCode](images/icon.png)

Run `HagiCode: Open Dashboard` from the Command Palette to open the HagiCode web interface in your default browser.

## Configure your instance

The default address is `http://localhost:36556`, the default port of HagiCode Desktop. If Desktop shows a different port, or you use a self-hosted instance, change `hagicode.dashboardUrl` in your VS Code user settings.

```json
{
  "hagicode.dashboardUrl": "https://hagicode.example.com"
}
```

If VS Code asks you to confirm opening an external link, choose `Open`.

## Debug and install

Requires VS Code 1.74 or later. Open the repository root in VS Code, press `F5` to start the Extension Development Host, then run `HagiCode: Open Dashboard`.

To install the extension in a regular VS Code window, run the install script from the repository root (Node.js 22 or later is required):

```bash
scripts/install-local.sh hagicode   # omit the name to install every extension under extensions/
```

The script packages the extension and runs `code --install-extension --force`. For VS Code Insiders or VSCodium, set `CODE_CMD=code-insiders` or `CODE_CMD=codium`.

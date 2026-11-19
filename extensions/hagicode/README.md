# HagiCode for VS Code

在 VS Code 的命令面板中执行 `HagiCode: Open Dashboard`，即可在默认浏览器中打开 HagiCode 的 Web 界面。

## 配置实例

默认地址是 `http://localhost:36556`，对应 HagiCode Desktop 的默认端口。如果 Desktop 显示了不同的端口，或使用自托管实例，请在 VS Code 的用户设置中修改 `hagicode.dashboardUrl`。

```json
{
  "hagicode.dashboardUrl": "https://hagicode.example.com"
}
```

如果 VS Code 提示确认外部链接，选择 `Open` 即可继续。

## 调试与安装

需要 VS Code 1.74 或更高版本。用 VS Code 打开仓库根目录，按 `F5` 启动扩展开发宿主，再运行 `HagiCode: Open Dashboard`。

如需在普通 VS Code 窗口安装，从仓库根目录运行以下命令。打包需要 Node.js 22 或更高版本。

```bash
cd extensions/hagicode
npx --yes @vscode/vsce@4.1.1 package --no-dependencies
code --install-extension hagicode-0.0.1.vsix
```

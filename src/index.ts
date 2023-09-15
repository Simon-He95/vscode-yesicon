import * as vscode from 'vscode'
import { CreateWebview } from '@vscode-use/createwebview'
import { registerCommand } from '@vscode-use/utils'

export function activate(context: vscode.ExtensionContext) {
  // todo: 解决iframe与vscode通信问题
  const provider = new CreateWebview(
    context.extensionUri,
    {
      title: 'yesicon',
      scripts: ['main.js'],
      viewColumn:vscode.ViewColumn.Beside
    },
  ) // css样式引入，本地css需要配置在media目录下

  context.subscriptions.push(registerCommand('vscode-yesicon.openUrl', () => {
    const url = 'https://yesicon.app/'
    provider.create(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>yesicon</title>
          <style>
            body{
              width:100%;
              height:100vh;
            }
          </style>
        </head>
        <body>
          <iframe id="yesicon" src="${url}" width="100%" height="100%"></iframe>
        </body>
      </html>
      `, ({ data, type }) => {
      // callback 获取js层的postMessage数据
      if (type === 'copy') {
        vscode.env.clipboard.writeText(data).then(() => {
          vscode.window.showInformationMessage('复制成功!  ✅')
        })
      }
    })
  }))
}

export function deactivate() {
}


import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand('generator-hw.generate', () => {
    vscode.window.showInformationMessage('Генератор ДЗ работает!');
  });
  context.subscriptions.push(command);
}

export function deactivate() {}
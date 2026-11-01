import * as vscode from 'vscode';
import { linearEquation } from './leaner';

export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand('generator-hw.generate', () => {
    const eq = linearEquation();
    vscode.window.showInformationMessage(`${eq.question}    Ответ: ${eq.answer}`);
  });
  context.subscriptions.push(command);
}

export function deactivate() {}
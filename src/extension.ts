import * as vscode from 'vscode';
import { linearEquation } from './leaner';
import { quadraticEquation } from './quadratic';

export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand('generator-hw.generate', () => {
    const eq = Math.random() < 0.5 ? linearEquation() : quadraticEquation();
    vscode.window.showInformationMessage(`${eq.question}    Ответ: ${eq.answer}`);
  });
  context.subscriptions.push(command);
}

export function deactivate() {}
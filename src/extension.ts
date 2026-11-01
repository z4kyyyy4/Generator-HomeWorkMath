import * as vscode from 'vscode';
import { linearEquation } from './leaner';
import { quadraticEquation } from './quadratic';

export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand('generator-hw.generate', async () => {
    // 1. Какие уравнения
    const type = await vscode.window.showQuickPick(['Линейные', 'Квадратные'], {
      placeHolder: 'Какие уравнения сгенерировать?',
    });
    if (type === undefined) {
      return; // нажали Esc
    }

    // 2. Сколько
    const countText = await vscode.window.showInputBox({
      prompt: 'Сколько уравнений?',
      value: '10',
      validateInput: (text) => {
        const n = Number(text);
        return Number.isInteger(n) && n >= 1 && n <= 50 ? null : 'Введите целое число от 1 до 50';
      },
    });
    if (countText === undefined) {
      return;
    }
    const count = Number(countText);

    // 3. Генерируем
    let tasks = '';
    let answers = '';
    for (let i = 1; i <= count; i++) {
      const eq = type === 'Линейные' ? linearEquation() : quadraticEquation();
      tasks += `${i}. ${eq.question}\n`;
      answers += `${i}. ${eq.answer}\n`;
    }

    // 4. Показываем в новой вкладке
    const content = `# ${type} уравнения\n\n${tasks}\n## Ответы\n\n${answers}`;
    const doc = await vscode.workspace.openTextDocument({ content, language: 'markdown' });
    await vscode.window.showTextDocument(doc);
  });
  context.subscriptions.push(command);
}

export function deactivate() {}
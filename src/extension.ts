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

    // 4. Папка, открытая в VS Code
    const folders = vscode.workspace.workspaceFolders;
    if (!folders || folders.length === 0) {
      vscode.window.showErrorMessage('Сначала откройте папку: File → Open Folder');
      return;
    }
    const folder = folders[0].uri;

    // 5. Записываем два файла
    const tasksFile = vscode.Uri.joinPath(folder, 'ДЗ.md');
    const answersFile = vscode.Uri.joinPath(folder, 'Ответы.md');
    await vscode.workspace.fs.writeFile(tasksFile, Buffer.from(`# ${type} уравнения\n\n${tasks}`));
    await vscode.workspace.fs.writeFile(answersFile, Buffer.from(`# Ответы\n\n${answers}`));

    // 6. Открываем задание и сообщаем
    await vscode.window.showTextDocument(tasksFile);
    vscode.window.showInformationMessage('Готово! Задание: ДЗ.md, ответы: Ответы.md');
  });
  context.subscriptions.push(command);
}

export function deactivate() {}
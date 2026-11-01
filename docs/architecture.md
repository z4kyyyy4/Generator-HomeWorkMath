# Архитектура

## Как плагин подключается к VS Code

1. **`package.json`** объявляет команду. VS Code читает этот файл при запуске и показывает команду в палитре:

   ```json
   "commands": [
     {
       "command": "generator-hw.generate",
       "title": "Создать ДЗ по уравнениям",
       "category": "Генератор ДЗ"
     }
   ]
   ```

2. Когда пользователь вызывает команду, VS Code загружает `out/extension.js` (поле `main`) и вызывает функцию `activate()`.
3. `activate()` через `registerCommand` связывает id команды `generator-hw.generate` с функцией, которая выполняется при вызове. Id в `package.json` и в коде должен совпадать.
4. Код плагина работает в отдельном процессе **Extension Host** и общается с редактором через API из модуля `vscode`.

## Файлы

```
src/
├── extension.ts      команда, диалог, запись файлов (использует vscode API)
├── linear.ts         линейные уравнения
├── quadratic.ts      квадратные уравнения
├── format.ts         запись уравнений как в тетради
└── random.ts         случайные целые числа
```

Кто кого использует:

```
extension.ts
├── linear.ts      → random.ts, format.ts
└── quadratic.ts   → random.ts, format.ts
```

Модуль `vscode` подключает только `extension.ts`. Генераторы и форматирование — обычные функции, которые не зависят от редактора.

## Что происходит при вызове команды

1. `showQuickPick` спрашивает тип уравнений. Если нажать Esc, команда завершается.
2. `showInputBox` спрашивает количество. `validateInput` не пропускает ничего, кроме целых чисел от 1 до 50.
3. В цикле нужное число раз вызывается `linearEquation()` или `quadraticEquation()`. Условия и ответы собираются в две строки.
4. Проверяется, что в VS Code открыта папка (`workspace.workspaceFolders`).
5. `workspace.fs.writeFile` записывает `ДЗ.md` и `Ответы.md`.
6. `showTextDocument` открывает задание, `showInformationMessage` сообщает, что всё готово.

## Использованный API

| Вызов | Зачем |
|---|---|
| `commands.registerCommand` | связать команду с функцией |
| `window.showQuickPick` | выбор типа уравнений |
| `window.showInputBox` | ввод количества с проверкой |
| `workspace.workspaceFolders` | найти открытую папку |
| `Uri.joinPath` | путь к файлу внутри папки |
| `workspace.fs.writeFile` | записать файл |
| `window.showTextDocument` | открыть файл в редакторе |
| `window.showInformationMessage`, `showErrorMessage` | уведомления |

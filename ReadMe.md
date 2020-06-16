## Disclamer

- this solution focuses purely on the task implementation (no other fronend stuff has been setup)
- ubuntu portion of the task hasn't been done - only windows
- Ctrl + Shift + a produces uppercase A as its what we get from the system - but can be manually lowercased
- tests were planned but hadn't enough time

## Задание

Создать react hook обрабатывающий нажатия клавиш на клавиатуре
Требования\критерии оценки:

1. Использование Typescript
2. Использование RxJS
3. Обработка сочетаний клавиш
4. Обработка ввода ASCII\Unicode символов
5. Отображение результата на canvas
6. Читаемость кода
7. Лаконичность кода

Примеры ожидаемого поведения:
Press: a
Result: 'a'

Press: Shift + a
Result: 'A'

Press: F6
Result: 'F6'

Press: Ctrl + Shift + a
Result: 'Ctrl+Shift+a'

(для windows)
Press: Alt + 1
Result: '☺️' // White Smiling Face Emoji

(для ubuntu)
Press: Ctrl + Shift + u + 2 + 6 + 3 + a
Result: '☺️' // White Smiling Face Emoji

# Блокнот для заметок на Node.js и Express.js
На основе форка https://github.com/metehansenol/todo-api-with-node-express/tree/develop

Пример работы после запуска сервера командой 
>node server.js 

>curl http://localhost:5000/notes   --> для показа заметок

>curl -X POST http://localhost:5000/note/ -H "Content-Type: application/json" -d '{"title": "Test Note", "content": "This is a test."}'  --> для записи заметки 
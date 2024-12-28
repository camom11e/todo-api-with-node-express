# A simple experimental Todo Web API with Node.js And Express.js

This is an experimental Todo Web API. There is no any database system behind it. It holds the item data in memory. You can use it in your experimental projects.

Блокнот для заметок на основе форка https://github.com/metehansenol/todo-api-with-node-express/tree/develop

Пример работы после запуска сервера командой 
>node server.js 

>curl http://localhost:5000/notes   --> для показа заметок

>curl -X POST http://localhost:5000/note/ -H "Content-Type: application/json" -d '{"title": "Test Note", "content": "This is a test."}'  --> для записи заметки 
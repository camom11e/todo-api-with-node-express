const http = require('http');
const express = require('express');


const cors = require('cors');

const itemsRouter = require('./routes/items');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/', itemsRouter);



const server = http.createServer(app);

const port = (process.env.PORT || 5000);

server.listen(port);

console.debug('Server listening on port ' + port);

module.exports=app;

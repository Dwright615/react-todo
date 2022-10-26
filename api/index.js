const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

const db = require('./queries');

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/tasks', db.getTasks);
app.get('/tasks/:id', db.getTaskById);
app.post('/tasks', db.createTask);
app.put('/tasks/:id', db.updateTask);
app.delete('/tasks/:id', db.deleteTask);
app.put('/tasks/complete/:id', db.toggleCompleteTask);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
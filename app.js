const express = require('express');
const cors = require('cors');
const app = express();
const todoRoute = require('./routes/TodoRoute');

app.use(express.json());
app.use(cors());

app.use('/todos', todoRoute);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.listen(8888, () => console.log('server is running on Port 8888'));

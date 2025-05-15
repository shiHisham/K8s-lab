const express = require('express');
const app = express();
let isReady = true;
let isAlive = true;

app.get('/healthz', (req, res) => {
  if (isAlive) res.send('I am alive!');
  else res.status(500).send('Crashed!');
});

app.get('/ready', (req, res) => {
  if (isReady) res.send('Ready!');
  else res.status(500).send('Not Ready!');
});

app.post('/toggle', (req, res) => {
  isReady = !isReady;
  res.send(`Readiness set to ${isReady}`);
});

app.post('/crash', (req, res) => {
  isAlive = false;
  res.send('Liveness set to false');
});

app.listen(3000, () => console.log('App running on port 3000'));
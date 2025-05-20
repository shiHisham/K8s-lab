const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const appEnv = process.env.APP_ENV || 'unknown';
const configFilePath = '/etc/config/message.txt';

app.get('/', (req, res) => {
  let fileContent = 'File not found';
  try {
    fileContent = fs.readFileSync(configFilePath, 'utf8');
  } catch (err) {
    fileContent = `Error reading file: ${err.message}`;
  }

  res.send(`ENV: ${appEnv}\nFILE: ${fileContent}`);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

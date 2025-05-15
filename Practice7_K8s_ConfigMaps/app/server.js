const express = require('express');
const fs = require('fs');
const app = express();

// Read config from environment variable
const greetingEnv = process.env.APP_GREETING || 'Hello from ENV!';

// Read config from mounted file
let greetingFile = 'File not found';
try {
  greetingFile = fs.readFileSync('/etc/config/message.txt', 'utf8');
} catch (err) {
  greetingFile = `Error reading file: ${err.message}`;
}

app.get('/', (req, res) => {
  res.send(`ENV: ${greetingEnv}\nFILE: ${greetingFile}`);
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
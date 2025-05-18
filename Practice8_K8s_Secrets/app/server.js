const express = require('express');
const fs = require('fs');
const app = express();

const dbPassword = process.env.DB_PASSWORD || 'Not set';
let apiToken = 'File not found';

try {
  apiToken = fs.readFileSync('/etc/secret/api-token.txt', 'utf8');
} catch (err) {
  apiToken = `Error reading file: ${err.message}`;
}

app.get('/', (req, res) => {
  res.send(`DB_PASSWORD (env): ${dbPassword}\nAPI_TOKEN (file): ${apiToken}`);
});

app.listen(3000, () => {
  console.log('Secrets app running on port 3000');
});

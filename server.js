const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

const csl = console;

const app = express();
app.use(serveStatic(path.join(__dirname, '/dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

csl.log(`server started on ${port}`);

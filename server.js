const exp = require('constants');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

app.listen(PORT, () => console.log(`App listening on PORT https://localhost:${PORT}`))
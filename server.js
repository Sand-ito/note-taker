const exp = require('constants');
const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

app.get('/api/notes', (req,res) => {
    const notes = fs.readFileSync('./db/db.json', 'utf-8');
    res.json(notes);
});

app.listen(PORT, () => console.log(`App listening on https://localhost:${PORT}`));
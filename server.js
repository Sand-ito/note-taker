const exp = require('constants');
const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

app.get('/notes', (res, req) => res.sendFile(path.join(__dirname, './public/notes.html')));
app.get('*', (res, req) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/api/notes', (req,res) => {
    const notes = fs.readFileSync('./db/db.json', 'utf-8');
    res.json(notes);
});


app.post('/api/notes', (req,res) => {
    const notes = fs.readFileSync('./db/db.json', 'utf-8');
    const newnote = req.body;
    let id = notes.length;
    newnote.id = id;
    notes.push(newnote);
    res.json(notes);
});

app.listen(PORT, () => console.log(`App listening on https://localhost:${PORT}`));
const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/api/notes', (req,res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(notes);
});

app.post('/api/notes', (req,res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    console.log(notes);
    const newnote = req.body;
    let id = notes.length;
    newnote.id = id;
    notes.push(newnote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes), 'utf-8');
    res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    note = notes.filter(note => {note.id !== req.params.id});
    fs.writeFileSync('./db/db.json', JSON.stringify(note), 'utf-8');
    res.json(note);
});

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));
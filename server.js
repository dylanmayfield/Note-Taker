const express = require('express');
const path = require('path')
const noteData = require('./db/db.json');
const uuid = require('./helpers/uuid.js');
const notes = require('./public/notes.html');

const app = express();

const PORT = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('api/notes', (req,res) => {
    res.json(noteData)
});

app.post('api/notes', (req, res) => {
    console.info(`${req.method} request recieved to save note.`);
    const { title, text } = req.body
    if (title && text) {
        const newNote = {
            title, 
            text
        };

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        console.log('error');
        res.status(500).json('Error in posting note')
    }
});


app.listen(PORT, () =>
console.log(`Express server listening on port ${PORT}`)
)

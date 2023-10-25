const express = require('express');
const path = require('path')
const noteData = require('./db/db.json');
const fs = require('fs');
const uuid = require('./helpers/uuid.js');

const app = express();

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    console.log('get /api/notes ')
    res.status(200).json(`${req.method} request received to get notes`);
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request recieved to save note.`);
    const { title, text } = req.body
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid()
        };


        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {

                const parsedNotes = JSON.parse(data);
                
                parsedNotes.push(newNote);


                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully updated notes!')
                );
            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {

        res.status(500).json('Error in posting note')
    }
});


app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}`)
)

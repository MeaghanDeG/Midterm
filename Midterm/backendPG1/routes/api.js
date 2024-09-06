const express = require('express');
const Note = require('../models/Note');
const { ensureAuthenticated } = require('../middleware/auth');

const router = express.Router();

// Create a new note
router.post('/notes', ensureAuthenticated, (req, res) => {
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content,
        user: req.user.id,
    });

    newNote.save()
        .then(note => res.json(note))
        .catch(err => console.log(err));
});

// Get all notes for a user
router.get('/notes', ensureAuthenticated, (req, res) => {
    Note.find({ user: req.user.id })
        .then(notes => res.json(notes))
        .catch(err => console.log(err));
});

// Get a single note by ID
router.get('/notes/:id', ensureAuthenticated, (req, res) => {
    Note.findById(req.params.id)
        .then(note => res.json(note))
        .catch(err => console.log(err));
});

// Update a note
router.put('/notes/:id', ensureAuthenticated, (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            note.title = req.body.title;
            note.content = req.body.content;

            note.save()
                .then(updatedNote => res.json(updatedNote))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

// Delete a note
router.delete('/notes/:id', ensureAuthenticated, (req, res) => {
    Note.findById(req.params.id)
        .then(note => note.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;

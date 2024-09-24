const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');


//Route 1: fetching all the notes using : Get "/api/note/fetchnote".login require ..
router.get('/fetchnote', fetchuser, async (req, res) => {
    const note = await Note.find({ user: req.user.id });
    res.json(note);
})

//Route 2: add a new note using : Post "/api/note/addnote".login require ..
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid note title').isLength({ min: 5 }),
    body('description', "Enter a valid description").isLength({ min: 8 }),

], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // --> if there are errors return bad request and show msgd
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({ title, description, tag, user: req.user.id });
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('internal server error');
    }
})

//Route 3: update an existing note using : Put "/api/note/updatenote/:id".login require ..
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create  a newNote object
    const newNote = {};
    if (title) {
        newNote.title = title;
    }

    if (description) {
        newNote.description = description;
    }

    if (tag) {
        newNote.tag = tag;
    }

    //find the note to be updated and update it
    let note = await Note.findById(req.params.id);

    if (!note) { //checing if the note to be updated is exist or not
        return res.status(404).send('Not found');
    }

    if (note.user.toString() !== req.user.id) { //checking if that node belongs to tht perticular user or not
        return res.status(401).send('not allowed');
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }); //note will updated
    res.json({ note });
})

//Route 4: delete an existing note using : Delete "/api/note/deletenote/:id".login require ..
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
   
    //find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);

    if (!note) { //checing if the note to be deleted is exist or not
        return res.status(404).send('Not found');
    }

    if (note.user.toString() !== req.user.id) { //allow deletion if user owns this note
        return res.status(401).send('not allowed');
    }

    note = await Note.findByIdAndDelete(req.params.id); //note will updated
    res.json({'Success': 'Note has been deleted ',note:note});
})

module.exports = router;
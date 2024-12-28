const express = require('express');
const router = express.Router();

let notes = [];
let nextId = 1;

//GET /notes --> выбрать и вернуть все заметки в формате JSON (массив объектов)
router.get('/notes', function (req, res) {
  if (notes.length > 0) {
    res.status(200).json(notes);
  } else {
    res.sendStatus(404);
  }
});

//GET /note/:id -->выбрать и вернуть заметку с соответствующим id в формате JSON
router.get('/note/:id', function (req, res) {
  const noteId = parseInt(req.params.id);
  const foundNote = notes.find(note => note.id === noteId);

  if (foundNote) {
    res.status(200).json(foundNote);
  } else {
    res.sendStatus(404);
  }
});

//GET /note/read/:title -->выбрать и вернуть заметку с соответствующим названием в формате JSON
router.get('/note/read/:title', function (req, res) {
  const noteTitle = req.params.title;
  const foundNote = notes.find(note => note.title === noteTitle);

  if (foundNote) {
    res.status(200).json(foundNote);
  } else {
    res.sendStatus(404);
  }
});

//POST /note/ --> создать и вернуть заметку в формате JSON
router.post('/note/', function (req, res) {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.sendStatus(409);
  }

  const now = new Date();
  const newNote = {
    id: nextId++,
    title: title,
    content: content,
    created: now,
    changed: now
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

//DELETE /note/:id --> удалить заметку с соответствующим id из базы данных
router.delete('/note/:id', function (req, res) {
  const noteIdToDelete = parseInt(req.params.id);
  const initialLength = notes.length;
  notes = notes.filter(note => note.id !== noteIdToDelete);

  if (notes.length < initialLength) {
    res.sendStatus(204);
  } else {
    res.sendStatus(409);
  }
});

//PUT /note/:id --> изменить заметку с соответствующим id
router.put('/note/:id', function (req, res) {
  const noteIdToUpdate = parseInt(req.params.id);
  const { title, content } = req.body;
  const foundNoteIndex = notes.findIndex(note => note.id === noteIdToUpdate);

  if (foundNoteIndex !== -1) {
    if (title !== undefined) {
      notes[foundNoteIndex].title = title;
    }
    if (content !== undefined) {
      notes[foundNoteIndex].content = content;
    }
    notes[foundNoteIndex].changed = new Date();
    res.sendStatus(204);
  } else {
    res.sendStatus(409);
  }
});

module.exports = router;
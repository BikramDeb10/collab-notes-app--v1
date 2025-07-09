const express = require("express");
const {
  createNote,
  getNote,
  updateNote,
  getAllNotes,
  deleteNote,
} = require("../controllers/noteController");
const router = express.Router();

router.post("/notes", createNote);
router.get("/notes/:id", getNote);
router.put("/notes/:id", updateNote);
router.get("/notes", getAllNotes);
router.delete("/notes/:id", deleteNote);

module.exports = router;

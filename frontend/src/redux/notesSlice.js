import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notesList: [],
    currentNote: null,
    activeUsers: [],
  },
  reducers: {
    setNotes: (state, action) => {
      state.notesList = action.payload;
    },
    setCurrentNote: (state, action) => {
      state.currentNote = action.payload;
    },
    updateNoteContent: (state, action) => {
      if (state.currentNote) {
        state.currentNote.content = action.payload;
      }
    },
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
  },
});

export const { setNotes, setCurrentNote, updateNoteContent, setActiveUsers } =
  notesSlice.actions;

export default notesSlice.reducer;

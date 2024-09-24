// import react from 'react';
import { useState } from "react";
import Notecontext from "./notesContext";

const NoteState = (props) => {
  const host = "https://i-note-book-backend.onrender.com";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //get all note function
  const getNotes = async () => {
    //api call
    const response = await fetch(`${host}/api/notes/fetchnote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //add a note function
  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    //adding a note logic at client side
    const note = await response.json();
    setNotes(notes.concat(note));
    console.log("adding a new note");
  };

  //delete a note function
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);

    console.log("note deleted " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a note function
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes)); //created the new notes variable
    //log to edit at client side
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break; //using the brk ,ethod to exit a loop
      }
    }
    setNotes(newNotes); //we have set the state of the notes as new notes
  };

  return (
    <Notecontext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </Notecontext.Provider>
  );
};

export default NoteState;

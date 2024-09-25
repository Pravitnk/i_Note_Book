import React, { useState, useContext,useEffect } from "react";
import noteContext from "../context/notes/notesContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
   const [userName, setUserName] = useState(""); // New state to store the user's name

  // Use useEffect to get the user's name from localStorage
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      console.error("No user name found in localStorage"); // Log if not found
    }
  }, []);

  // Function to handle form submission
  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note added successfully ", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); //...note means watever is thr in a note will remail unchngd
  };

  return (
    <div className="container">
      <h2>
        Add a note
        <span style={{ color: "blue" }}>{userName && ` ${userName}`}</span>
      </h2>
      <div className="form">
        <div className="mb-3 row">
          <label htmlFor="title" className="col-sm-2 col-form-label">
            <strong>Title</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
            minLength={3}
            required
          />
        </div>
        <div className="mb-3 row">
          <label htmlFor="description" className="col-sm-2 col-form-label">
            <strong>Description</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            minLength={10}
            required
          />
        </div>
        <div className="mb-3 row">
          <label htmlFor="tag" className="col-sm-2 col-form-label">
            <strong>Tag</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <button
          disabled={note.title.length < 3 || note.description.length < 10}
          type="submit"
          className="btn btn-primary w-100"
          onClick={handleclick}
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default AddNote;

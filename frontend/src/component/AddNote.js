import React, { useState, useContext } from "react";
import noteContext from "../context/notes/notesContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  //fumction on onclick
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
      <h2>Add a note</h2>
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
            minLength={5}
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
          disabled={note.title.length < 5 || note.description.length < 10}
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

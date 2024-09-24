// import React, { useContext } from "react";
// import noteContext from "../context/notes/notesContext";

// const NoteItem = (props) => {
//   const context = useContext(noteContext);
//   const { deleteNote } = context;
//   //function to delte a note

//   const { note, updateNote } = props;
//   return (
//     <div className="col-md-3">
//       <div className="card my-3">
//         <div className="card-body">
//           <h5 className="card-title text-center">{note.title}</h5>
//           <p className="card-text">{note.description}</p>
//           <br />
//           <p className="card-text text-center">{note.tag}</p>
//           <div style={{ display: "flex", justifyContent: "flex-end" }}>
//             <i
//               className="far fa-edit mx-3"
//               onClick={() => {
//                 updateNote(note);
//               }}
//             ></i>
//             <i
//               className="far fa-trash-alt mx-3"
//               onClick={() => {
//                 deleteNote(note._id);
//                 props.showAlert("Note Deleted successfully ", "success");
//               }}
//             ></i>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoteItem;

import React, { useContext } from "react";
import noteContext from "../context/notes/notesContext";
import "./NoteItem.css"; // Import external CSS for styling

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3">
      <div className="note-card">
        <div className="card-body">
          <h5 className="card-title text-center">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <br />
          <p className="card-text text-center note-tag">{note.tag}</p>
          <div className="icon-container">
            <i
              className="far fa-edit note-icon"
              onClick={() => updateNote(note)}
            ></i>
            <i
              className="far fa-trash-alt note-icon"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Note Deleted successfully ", "success");
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;

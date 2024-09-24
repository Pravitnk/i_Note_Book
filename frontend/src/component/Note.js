import React from "react";
import Notes from "./Notes";

const Note = (props) => {
  const { showAlert } = props;
  return (
    <div className="container">
      <div>
        <Notes showAlert={showAlert} />
      </div>
    </div>
  );
};

export default Note;

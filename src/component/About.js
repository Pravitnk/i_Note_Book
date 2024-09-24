import React from "react";

const About = () => {
  return (
    <div className="container my-4">
      <h1>About iNotes</h1>
      <p>
        <strong>iNotes</strong> is a secure and easy-to-use web application
        built with the MERN stack (MongoDB, Express, React, and Node.js). It
        allows users to seamlessly manage their important notes and reminders in
        a personalized way.
      </p>
      <h3>Key Features:</h3>
      <ul>
        <li>
          <strong>User Authentication:</strong> Users can sign up and securely
          log in to their account to access their personalized notes. All data
          is protected, ensuring privacy and confidentiality.
        </li>
        <li>
          <strong>Create Notes:</strong> Add important notes and reminders, such
          as tasks, meetings, or events, that you can access anytime, anywhere.
        </li>
        <li>
          <strong>Edit Notes:</strong> Update and modify your notes with ease,
          making sure your tasks and reminders stay up-to-date.
        </li>
        <li>
          <strong>Delete Notes:</strong> Remove outdated or unnecessary notes
          from your list, helping you stay organized and focused.
        </li>
        <li>
          <strong>Database Storage:</strong> All your notes are securely stored
          in a database (MongoDB), so you never lose your important information.
        </li>
        <li>
          <strong>Responsive Design:</strong> The app is fully responsive,
          ensuring an optimal experience across devices—whether you're on a
          desktop, tablet, or smartphone.
        </li>
      </ul>
      <p>
        iNotes is designed to help you stay organized by keeping track of your
        important tasks, deadlines, and reminders. Whether for work or personal
        use, iNotes provides a reliable and user-friendly solution for managing
        your day-to-day activities.
      </p>
    </div>
  );
};

export default About;

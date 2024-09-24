// import "./App.css";
// import Header from "./component/Header";
// import Navbar from "./component/Navbar";
// import Home from "./component/Home";
// import About from "./component/About";
// import Login from "./component/Login";
// import SingUp from "./component/SignUp";
// import Alert from "./component/Alert";

// import {
//   BrowserRouter as Router,
//   Route,
//   // Link,
//   Routes,
//   useLocation,
// } from "react-router-dom";
// import NoteState from "./context/notes/NoteState";
// import { useState } from "react";
// import Note from "./component/Note";

// const App = (props) => {
//   const [alert, setAlert] = useState(null);
//   const showAlert = (message, type) => {
//     setAlert({
//       msg: message,
//       type: type,
//     });
//     setTimeout(() => {
//       setAlert(null);
//     }, 2000);
//   };

//   const location = useLocation(); // Get the current route
//   return (
//     <>
//       <NoteState>
//         <Router>
//           <Navbar />
//           <div className="xyz">
//             <Alert alert={alert} />
//             {/* <Header /> */}
//             {location.pathname !== "/" && <Header />}
//             <div className="container">
//               <Routes>
//                 <Route exact path="/" element={<Home />}></Route>
//                 <Route
//                   exact
//                   path="/notes"
//                   element={<Note showAlert={showAlert} />}
//                 ></Route>
//                 <Route eaxct path="/about" element={<About />}></Route>
//                 <Route
//                   eaxct
//                   path="/login"
//                   element={<Login showAlert={showAlert} />}
//                 ></Route>
//                 <Route
//                   eaxct
//                   path="/signup"
//                   element={<SingUp showAlert={showAlert} />}
//                 ></Route>
//               </Routes>
//             </div>
//           </div>
//         </Router>
//       </NoteState>
//     </>
//   );
// };

// export default App;

import "./App.css";
import Header from "./component/Header";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import Login from "./component/Login";
import SignUp from "./component/SignUp"; // Fixed typo
import Alert from "./component/Alert";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import { useState } from "react";
import Note from "./component/Note";

const AppContent = ({ showAlert, alert }) => {
  const location = useLocation(); // Now useLocation is inside Router

  return (
    <>
      <Navbar showAlert={showAlert} />
      <div className="xyz">
        <Alert alert={alert} />
        {/* Conditionally render Header */}
        {location.pathname !== "/" && <Header />}
        {/* <div className="container"> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/notes" element={<Note showAlert={showAlert} />} />
          <Route exact path="/about" element={<About />} />
          <Route
            exact
            path="/login"
            element={<Login showAlert={showAlert} />}
          />
          <Route
            exact
            path="/signup"
            element={<SignUp showAlert={showAlert} />}
          />
        </Routes>
        {/* </div> */}
      </div>
    </>
  );
};

const App = (props) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <NoteState>
      <Router>
        <AppContent showAlert={showAlert} alert={alert} />
      </Router>
    </NoteState>
  );
};

export default App;

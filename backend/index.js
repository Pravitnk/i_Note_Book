const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
require("dotenv").config();

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//middle ware to display routers results
app.use(express.json());
// end point //available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// app.get('/', (req, res)=> {
//   res.send('hello i am pravit naik from adpai...!');
// });

app.listen(port, () => {
  console.log(`iNoteBook backend listening at http://localhost:${port}`);
});

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = process.env.JWT_SECRET;

// create  a user using : POST "/api/auth/createUser". doesn't require auth.. creating a new user
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 6 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    let success = false;
    // --> if there are errors return bad request and show msgd
    // console.log(req.body);
    // const user = User(req.body); -->sving data into the database
    // user.save();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //check whthr user with the same email exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(404).json({
          success,
          error: "Sorry a user with this email already exists...",
        });
      }

      //generating salt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt); // generating passwrd hash
      // create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      // .then(user => res.json(user)).catch(err => { console.log(err); res.json({ error: 'please enter a unique value' }) })

      // res.send(req.body);
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = JWT.sign(data, JWT_SECRET);
      console.log(authtoken);
      //res.json:user
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ success: false, error: "Some error occurred" });
    }
  }
);

//Route 2: loging user using : POST "/api/auth/login". doesn't require auth..
router.post(
  "/login",
  [
    // body('name', 'Enter a valid name').isLength({ min: 6 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials.." });
      }
      //comparing passwords i.e user entering during login with user's actual password that is there in a DB
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        success = false;
        return res.status(400).json({
          success,
          error: "please try to login with correct credentials..",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = JWT.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });    }
  }
);

//Route 3: get logged in user Details using : Get "/api/auth/getuser". require login..
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id; //getting the user id
    const user = await User.findById(userId).select("-password");
    res.send(user); //sending the user, as a response
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
});
module.exports = router;

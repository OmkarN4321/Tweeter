const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require('../../middleware/auth');


const User = require("../../models/User");

//POST /api/auth
//signs in user
//access public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  User.findOne({ email }).then((user) => {
    if (!user) res.status(400).json({ msg: "User doesn't exist" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              name: user.name,
              email: user.email,
              id: user.id,
            },
          });
        }
      );
    });
  });
});

//GET /api/auth/user
//gets user data
//access private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;

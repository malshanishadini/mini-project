const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const gravatar=require('gravatar');

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// route POST api/users/new
router.post("/new", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" });
    }
      
  var avatarURL = gravatar.url('req.body.username', {s: '200', r: 'pg', d: 'mm'});

  const newUser = new User({
          title: req.body.title,
          username: req.body.username,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          avatarURL,
          enableFlag: req.body.enableFlag,
          userLevel: req.body.userLevel
          
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      
  });
});



// route POST api/users/login
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const username = req.body.username;
    const password = req.body.password;
  // Find user by username
    User.findOne({ username }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ usernamenotfound: "Username not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            userID: user.userID,
            username: user.username
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
});




// route GET Get api/users/user/:userID
router.get('/user/:userID',(req,res)=>{
  User.findById(req.params.userID)
  .then(userFound=>{
    if(!userFound){return res.status(404).end();}
    return res.status(200).json({
      title: userFound.title,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      userLevel: userFound.userLevel
    });
  })
  .catch(err => console.log(err));
  
});





module.exports = router;
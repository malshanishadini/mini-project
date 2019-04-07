const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport=require('passport');
const keys = require("../../config/keys");

// Load input validation
const validatePostInput = require("../../validation/post");
const checkAuth = require('../../authentication/auth');

// Load Post model
const Post = require("../../models/Post"); 

// Load User model
const User = require("../../models/User");


// route POST api/posts/new/:userID/:postID
router.post("/new/:userID/:postID",checkAuth, (req, res) => {
  // Form validation
  const { errors, isValid } = validatePostInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
   
  const newPost = new Post({
          userID: req.params.userID,
          postID: req.params.postID,
          title: req.body.title,
          content: req.body.content,
          categoryID: req.body.categoryID,
          remarks: req.body.remarks,
          publish: req.body.publish
          
        });
        
        newPost
        .save()
        .then(post => res.json(post))
        .catch(err => console.log(err));    
  });
  
  
  module.exports = router;
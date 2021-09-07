const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");
const authorization = require('../../config/auth')

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // console.log(req.body)

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ 
          isError: true,
          type: "Email already exists.\nPlease try again." 
        });
      } else {

        User.findOne({ username: req.body.username }).then(user =>{
          if (user) {
            return res.status(400).json({ 
              isError: true,
              type: "Username already exists.\nPlease try again." 
            });
          } else {
             const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
          });
        
          // Hash password before saving in database
          bcrypt.hash(newUser.password, 10, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
          console.log('successfully register')
          return res.json({ 
            isError: false,
            type: 'Account created successfully' 
          })
          }
        })
        }
  });
});


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {

  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const username = req.body.username
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {

    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
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
              // สำหรับใส่ค่าเป็น JSON
              res.json({
              token: "Bearer " + token
              });
            }
        );
        console.log('Successfully login')
      } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect"
          });
        }
    });
  });
});


// @route POST api/users/screeing
// @desc update user.screening using Header and req
// @access login-required
router.post('/screening',verifyToken,(req,res)=>{
  jwt.verify(req.token,keys.secretOrKey ,(err,authData)=>{
    if(err){

      //Forbidden
      res.sendErr(403);
    } else {
      async function update_screening(){
        const username = authData.username
        const screening = req.body.screening;

        // Find user by username
        User.findOne({ username }).then(user => {

          // Check if user exists
          if (!user) {
            return res.status(404).json({ usernotfound: "Username not found" });
          }
          user.screening = screening;
          user.save();
        });
        return res.send("Updated")
      }
      update_screening();
    }
  });
});


// @route PUT api/users/demographic
// @desc update user.demographic using Header and req
// @access login-required
router.post('/demographic',verifyToken,(req,res)=>{
  console.log(req.body)
  jwt.verify(req.token,keys.secretOrKey ,(err,authData)=>{
    if(err){

      //Forbidden
      res.sendErr(403);
    } else {
      async function update_demographic(){
        const username = authData.username
        
        // Find user by username
        User.findOne({ username }).then(user => {

          // Check if user exists
          if (!user) {
            return res.status(404).json({ usernotfound: "Username not found" });
          }

          // Check if faculty and year field isEmpty, if empty user previous data
          var empty_str = '';
          
          if (!empty_str.localeCompare(req.body.faculty)) {
            req.body.faculty = JSON.parse(user.demographic).faculty
          }
          if (!empty_str.localeCompare(req.body.year)) {
            req.body.year = JSON.parse(user.demographic).year
          }
          // End check

          user.demographic = {
            age: req.body.age,
            sex: req.body.sex,
            job: req.body.job,
            faculty: req.body.faculty,
            year: req.body.year,
          }
          user.save();
        });
        console.log('update demographic successfully')
        return res.send("Updated")
      }
      update_demographic();
    }
  });
});


// @access login-required
router.post('/workplace',verifyToken,(req,res)=>{
  jwt.verify(req.token,keys.secretOrKey ,(err,authData)=>{
    if(err){

      //Forbidden
      res.sendErr(403);
    } else {
      async function update_workplace(){
        const username = authData.username
        
        // Find user by username
        User.findOne({ username }).then(user => {

          // Check if user exists
          if (!user) {
            return res.status(404).json({ usernotfound: "Username not found" });
          }
          user.workplace = req.body;
          user.save();
        });

        return res.send("Updated")
      }
      console.log('Workplace data updated!')
      update_workplace();
    }
  });
});

// @access login-required
router.post('/qtree',verifyToken,(req,res)=>{
  jwt.verify(req.token,keys.secretOrKey ,(err,authData)=>{
    if(err){
      //Forbidden
      res.sendErr(403);
    } else {
      async function update_qtree(){
        const username = authData.username
        
        // Find user by username
        User.findOne({ username }).then(user => {
          // Check if user exists
          if (!user) {
            return res.status(404).json({ usernotfound: "Username not found" });
          }
          var temp = user.qtree.push(req.body);
          user.save();
        });

        return res.send("Updated")
      }
      //console.log('Qtree data updated!')
      update_qtree();
    }
  });
});


// @access login-required
router.post('/RecIntervention',verifyToken,(req,res)=>{
  
  jwt.verify(req.token, keys.secretOrKey ,(err,authData)=>{
    if(err){

      //Forbidden
      res.sendErr(403);
    } else {
      async function update_qtree(){
        const username = authData.username
        
        // Find user by username
        User.findOne({ username }).then(user => {

          // Check if user exists
          if (!user) {
            return res.status(404).json({ usernotfound: "Username not found" });
          }

          var temp = user.recommendation.push(req.body[0]); //เพราะส่งมาเป็น Array
          console.log(temp)
          user.save();
        });

        return res.send("Updated")
      }
      console.log('Recommendation updated!')
      update_qtree();
    }
  });
});

// @access login-required
router.post('/ndi',verifyToken,(req,res)=>{
  jwt.verify(req.token,keys.secretOrKey ,(err,authData)=>{
    if(err){
      //Forbidden
      res.sendErr(403);
    } else {
      async function update_ndi(){
        const username = authData.username
        
        // Find user by username
        User.findOne({ username }).then(user => {
          // Check if user exists
          if (!user) {
            return res.status(404).json({ usernotfound: "Username not found" });
          }
          var temp = user.ndi.push(req.body);
          user.ndi.push = temp
          user.save();
        });

        return res.send("Updated")
      }
      update_ndi();
      //console.log('NDI data updated!')
    }
  });
});

// @route GET api/users/logout
// @desc Logout user
// @access Public
router.get('/logout', (req, res) =>{
  req.logout();
  res.redirect('/');
});

// @route GET api/users/get_Profile
// @desc return user using Header 
// @access login-required
router.get('/get_UserData',verifyToken,(req,res)=>{
  jwt.verify(req.token,keys.secretOrKey ,(err,authData)=>{
    if(err){

      //Forbidden
      res.sendErr(403);
    } else {
      async function show_profile(){
        const username = authData.username
        
        // Find user by username
        const user_profile = await User.findOne({ username }).then(user => {

          // Check if user exists
          if (!user) {
            return res.status(404).json({ usernotfound: "Username not found" });
          } 
          var ndi = user.ndi[Object.keys(user.ndi).length-1 ]
          var rec = user.recommendation[Object.keys(user.recommendation).length-1 ]
          var Profile = {
            username: user.username,
            email: user.email,
            demographic: user.demographic,
            ndi_score: ndi[10],
            recommendation: rec
          }
          return Profile;
        });
        //console.log('done')
        return res.send(user_profile)
      }
      show_profile();
    }
  });
});

//Verify Token
function verifyToken(req,res,next){
    //Auth header value = > send token into header
    const bearerHeader = JSON.parse(req.headers["token"]).token;
// แก้ token Authorization
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //split the space at the bearer
        const bearerToken = bearerHeader.split(' ')[1];
        //Get token from string
        //const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;

        //next middleweare
        next();

    }else{
        //Fobidden
        res.send("Error 403");
    }
}

module.exports = router;
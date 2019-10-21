var express = require('express');
var router = express.Router();
const user = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const db = "mongodb://127.0.0.1:27017/sample";
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) {
    console.log("database err" + err)
  } else {
    console.log("database connected")
  }
})
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', (req, res) => {
  let userMail = req.body.email
  let password = bcrypt.hashSync(req.body.password)
  let _user = new user({
    email: userMail,
    password: password
  })
  _user.save().then(data => {

  res.send("user successfully added")
  }).catch(err=>{
    console.log(err);
  })

})
router.post('/login', async (req, res) => {
  let userMail = req.body.email
  let password = bcrypt.hashSync(req.body.password)
  var _user = await user.findOne({
    email: userMail
  }).exec();
  if (!user) {
    res.send("user does not valid")
  }


  if (!bcrypt.compareSync(req.body.password, _user.password)) {
    res.send("password is invalid")
  }
  res.send("user name and password is correct")



})

module.exports = router;
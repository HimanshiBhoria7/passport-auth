const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const { route } = require("./users");
const User = require('../models/User');
const User1 = require("../models/User1");
const passport = require('passport');

router.get('/',forwardAuthenticated,(req,res) => res.render('welcome'));

// Dashboard
// router.get('/dashboard',ensureAuthenticated, (req, res) =>{
//   User.find({},function(error,user,user1){

//     res.render('dashboard', {
//       user: req.user,
//       user1 : req.user1
//     })
//   })

// });

// router.get("/dashboard",ensureAuthenticated,(req, res) => {
//   res.render('dashboard',{
//     user = req.user,
//     user1 = req.user1,
//     // user : req.user,
//     // user1 : req.user1,
//     // const user1 = new User1(req.body.user1),
//     // user1.user = req.user._id,
//     // usersDetails : {
//     //   leave : req.leave,    //Edited need to change
//     //   purpose : req.purpose,

//     // }
//   })
//   // User1.find({},function(error,user1){
//   //     res.render("dashboard",{
//   //             userDetails : user1,
//   //             "data" : {
//   //                 "leave" : req.leave,
//   //                 "purpose" : req.purpose
//   //                 }
//   //     })
//   // });
// });

// router.get('/dashboard', ensureAuthenticated, (req, res) =>
//   User1.find({},function(error,user1){
//     res.render('dashboard', {
    
//     usersDetails : {
//     user : req.user,
//     user1 : req.user1,
//     "data" : {
//       "name" : req.body.name,
//       "leave" : req.body.leave,
//       "purpose" : req.body.purpose
//     }
//     }
//   })
// }));

router.get("/dashboard",ensureAuthenticated,(req, res) => {
  User1.find({},function(error,user1){
      res.render("dashboard",{
              userDetails :user1,
              "data" : {
                  "name" : req.body.name,
                  "leave" : req.body.leave,
                  "purpose" : req.body.purpose,
                  }

              
              
      })
  });
});


router.post('/dashboard',(req,res) =>{
  User1.find({},function(error,user1){
  var myData = new User1(req.body);
  myData.save();
  res.render("dashboard",{
    userDetails : user1,
      "data" : {
        "name" : req.body.name,
        "leave" : req.body.leave,
        "purpose" : req.body.purpose
      }

      
    });
});
});


router.get("/admin",(req,res) =>{
  res.render("admin");
});

router.post("/admin",passport.authenticate("local",{
  successRedirect:"/data2",
  message : " Sucessfully",
  failureRedirect:"/admin"
}))

router.get('/data2',(req,res)=>{
      User1.find({},function(error,user1){
          res.render("data12",{
              usersDetails : user1,
          })
      })
  });

router.post('/data2',(req,res) =>{
  res.redirect("/data2");
})

router.get('/edit/:id', function(req,res,next){
  var id = req.params.id;
var edit = User1.findById(id);
edit.exec(function(err,data2){
if(err) throw err;
res.render('edit',{title : "Edit Employee Records",records : data2});
});

});

router.post('/update/', function(req,res,next){
  var update = User1.findByIdAndUpdate(req.body.id,{
  leave : req.body.leave,
  purpose : req.body.purpose,
});
update.exec(function(err,data2){
if(err)  throw err;
res.redirect("/data2");
});
});


module.exports = router;


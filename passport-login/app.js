const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const mongoose = require('mongoose');
const flash = require("connect-flash");
const session = require('express-session');
const passport = require("passport");

const app = express();

require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;
const { mongoURI } = require('./config/keys');

// Connect to MongoDB
mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true ,useUnifiedTopology: true,  useCreateIndex : true,
      useFindAndModify: false}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//Body Parser
app.use(express.urlencoded({extended: false}));

//Express Session 
app.use(
    session({
      secret: 'secret',
      cookieName: 'session',
      duration: 30 * 60 * 1000,
      activeDuration: 5 * 60 * 1000,
      resave: true,
      saveUninitialized: true
    })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Flash
app.use(flash());


app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
  

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
const PORT = process.env.PORT || 5500;

app.listen(PORT, console.log(`Server running on  localhost:${PORT}`));

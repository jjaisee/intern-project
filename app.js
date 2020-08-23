require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const favicon = require("serve-favicon");
var path = require('path')
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
// const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const flash = require('connect-flash');

const adminRouter = require('./routes/adminRouters');

const categoriesImg = ["outdoorAndAdventure", "music", "writing", "friendsAndFamily", "languageAndCulture", "film", "learning", "social", "healthAndWellness", "maritalConsulting","dance", "foodAndDrink","photography","beliefs","sci-fiAndGames","artAndCraft","bookClubs","pets","fashionAndBeauty","career","sportsAndFitness","technology"];
const categoriesTitle = ["Letz Hike", "Letz Create Music", "Letz Writing", "Friends & Family", "Language & Culture", "Letz Film", "Letz Learning", "Letz Connect", "Health & Wellness", "Letz Find Maritial Counselors", "Letz Dance", "Letz Cook","Letz Click","Beliefs","Sci-Fi & Games","Letz Draw","Book Clubs","Pets","Letz Fashion","Career","Sports & Fitness","Technology"];

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

const DB = process.env.DATABASE.replace(
  'PASSWORD',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology:true
})
.then(() => {
  console.log('DB connections sucessfull');
});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  name: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


const User = new mongoose.model("User",userSchema);

 passport.use(User.createStrategy());

 // passport.use(new LocalStrategy(userSchema,
 //   function(username, password, done) {
 //     User.findOne({ username: username }, function (err, user) {
 //       if (err) { return done(err); }
 //       if (!user) { return done(null, false); }
 //       if (!user.verifyPassword(password)) { return done(null, false); }
 //       return done(null, user);
 //     });
 //   }
 // ));



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/letzget2gether",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    User.findOrCreate({ googleId: profile.id, name: profile.displayName }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.use('/admin',adminRouter);
app.get("/",function(req,res){
  if(req.isAuthenticated()){
    res.render("user-home",{
      categoriesImg : categoriesImg,
      categoriesTitle: categoriesTitle,
    });
  } else{
    res.render("home",{
      categoriesImg : categoriesImg,
      categoriesTitle: categoriesTitle,
    });

  }
});

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get('/auth/google/letzget2gether',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect user home.
    res.redirect('/user-home');
  });


app.get("/events",function(req,res){
  res.render("events");
});
app.get("/contactus",function(req,res){
  res.render("contactus");
});
app.get("/about",function(req,res){
  res.render("about");
});
app.get("/events-view",function(req,res){
  if(req.isAuthenticated()){
    res.render("events-view-login");
  } else{
    res.render("events-view");
  }
});
app.get("/user-home",function(req,res){
  if(req.isAuthenticated()){
    res.render("user-home",{
      categoriesImg : categoriesImg,
      categoriesTitle: categoriesTitle,
    });
  } else{
    res.redirect("/");
  }
});
app.get("/user-liked-events",function(req,res){
  if(req.isAuthenticated()){
    res.render("user-liked-events");
  } else{
    res.redirect("/");
  }
});
app.get("/user-joined-group",function(req,res){
  if(req.isAuthenticated()){
    res.render("user-joined-group");
  } else{
    res.redirect("/");
  }
});
app.get("/user-categories",function(req,res){
  if(req.isAuthenticated()){
    res.render("user-categories",{
      categoriesImg : categoriesImg,
      categoriesTitle: categoriesTitle,
    });
  } else{
    res.redirect("/");
  }
});
app.get("/user-joined-events",function(req,res){
  if(req.isAuthenticated()){
    res.render("user-joined-events");
  } else{
    res.redirect("/");
  }
});
app.get("/setting-profile",function(req,res){
  res.render("profile");
});
app.get("/setting-privacy",function(req,res){
  res.render("setting-privacy");
});
app.get("/setting-organizer-subscription",function(req,res){
  res.render("setting-organizer-subscription");
});
app.get("/setting-payment-methods",function(req,res){
  res.render("setting-payment-methods");
});
app.get("/setting-payment-made",function(req,res){
  res.render("setting-payment-made");
});
app.get("/signup",function(req,res){
  res.render("signup");
});

app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/");
});

app.post("/signup",function(req,res){

  User.register({username:req.body.username, name: req.body.name}, req.body.password, function(err,user){
    if(err){
      console.log(err);
      res.redirect("/signup");
    } else{
      passport.authenticate("local")(req,res,function(){
        res.redirect("/user-home");
      });
    }
  });
});

app.post("/header",function(req,res){

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, function(err){
    if(err){
      res.redirect("/");
      console.log(err);
    } else{
      passport.authenticate("local",{failureFlash: true,failureFlash: "Invalid username or password.", failureRedirect: "/"})(req,res,function(){
        res.redirect("/user-home");
      });
    }
  });

});
app.get("/start-group",function(req,res){
  res.render("start-group");
});



const port = process.env.PORT || 3000;
app.listen(port, () =>{
  console.log('App running on port '+port+'...')
});

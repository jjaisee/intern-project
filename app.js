const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const favicon = require("serve-favicon");
var path = require('path')

const app = express();

const categoriesImg = ["outdoorAndAdventure", "music", "writing", "friendsAndFamily", "languageAndCulture", "film", "learning", "social", "healthAndWellness", "maritalConsulting","dance", "foodAndDrink","photography","beliefs","sci-fiAndGames","artAndCraft","bookClubs","pets","fashionAndBeauty","career","sportsAndFitness","technology"];
const categoriesTitle = ["Letz Hike", "Letz Create Music", "Letz Writing", "Friends & Family", "Language & Culture", "Letz Film", "Letz Learning", "Letz Connect", "Health & Wellness", "Letz Find Maritial Counselors", "Letz Dance", "Letz Cook","Letz Click","Beliefs","Sci-Fi & Games","Letz Draw","Book Clubs","Pets","Letz Fashion","Career","Sports & Fitness","Technology"];


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));


app.get("/",function(req,res){
  res.render("home",{
    categoriesImg : categoriesImg,
    categoriesTitle: categoriesTitle
  });
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




app.listen(3000,function(){
  console.log("Server running on port 3000");
});

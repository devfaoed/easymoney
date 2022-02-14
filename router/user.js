const mongoose = require("mongoose");
const express = require("express");
const routes = express.Router();
const Blog = require("../model/blog");
const User = require("../model/user");
const passport = require("passport");

// routes to register form
routes.get("/register", function(req, res){
    res.render("register")
})


//routes to dashboard
routes.get("/dashboard", function(req, res){
    res.render("dashboard");
})

//routes for user setting
routes.get("/dashboard/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            res.render("dashboard", {foundUser:foundUser});
        }
    })
    
})

// routes to create account
routes.post("/register", function(req, res){    
    const newUser = new User (
        {
        name: req.body.name,    
        number: req.body.number,
        username: req.body.username,
        email: req.body.email,
    })
    User.register(newUser, req.body.password, function(err, register){
        if(err){
            console.log(err);
            res.redirect("back");

        }
        else{
            passport.authenticate("local")(req, res, function(){
            res.redirect("/dashboard");
            })
        }
    })
})

// routes to login form
routes.get("/login", function(req, res){
    res.render("login");
})

//routes to login 
routes.post("/login", passport.authenticate("local", 
{
    successRedirect: "/dashboard",
    failureRedirect: "/login"
}), function(req, res){ 
 
})

//routes to logout
routes.get("/logout", function(req, res){
    req.logout();
    res.redirect("/blog");
})

function isLoggedIn(req, res, next){
    if(req.isAunthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}

//routes for user setting
routes.get("/settings/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            res.render("settings", {foundUser:foundUser});
        }
    })
    
})

//routes to update user info
routes.put("/settings/:id", function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body.profile, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            res.redirect("back");
        }
    })
    
})

   


module.exports = routes;
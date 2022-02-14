const mongoose = require("mongoose");
const express = require("express");
const routes = express.Router();
const Blog = require("../model/blog");
const User = require("../model/user");

// index routes
routes.get("/",  function(req, res){
    res.redirect("/blog");
})

// routes to display all article
routes.get("/blog", function(req, res){
    Blog.find({}, function(err, foundblog){
        if(err){
            console.log(err);
        }
        else{
            res.render("home", {foundblog:foundblog});
        }
    })
   
})

// routes to create new article
routes.get("/blog/new", isLoggedIn, function(req, res){
    res.render("new");
})

// routes to create new article form
routes.post("/blog/new", function(req, res){
    let topic = req.body.topic;
    let category = req.body.category;
    let title = req.body.title;
    let image = req.body.image;
    let description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    let newBlog = {
        topic: topic,
        category: category,
        title: title,
        image: image,
        description: description,
        author: author
    };

     Blog.create(newBlog, function(err, cretaeBlog){
        if(err){
            console.log(err);
        }
        else{            
            console.log(newBlog);
            res.redirect("/blog")
        }
    })
})

// routes to show full post of an article
routes.get("/blog/:id/show", isLoggedIn, function(req, res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundblog){
        if(err){
            console.log(err);
        }
        else{
            res.render("show", {foundblog:foundblog});
        }
    })
})

// routes to show full post of an article
routes.get("/blog/:id/show", isLoggedIn, function(req, res){
    Blog.findById(req.params.id).populate("likes").exec(function(err, foundblog){
        if(err){
            console.log(err);
        }
        else{
            res.render("show", {foundblog:foundblog});
        }
    })
})

// routes to edit article using id
routes.get("/blog/:id/edit", ownArticle, function(req, res){
    Blog.findById(req.params.id, function(err, foundblog){
        if(err){
            console.log(err);
        }
        else{
            res.render("edit", {foundblog:foundblog});
        }
    })
})

// routes to update article using id
routes.put("/blog/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/blog/" + req.params.id + "/show");
        }
    })
})
// routes to delete article using id
 routes.delete("/blog/:id", ownArticle, function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/");
        }
    })
})

function isLoggedIn (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}

function ownArticle(req, res, next){
    if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, foundblog){
            if(err){
               res.redirect("back");
            }
            else{
                if(foundblog.author.id.equals(req.user.id)){
                    next();
                }else{
                    res.redirect("back"); 
                }
            }
        });
    }
    else{
        res.redirect("back");
    }   
}


routes.get("/blog/profile/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundblog){
        if(err){
            console.log(err);
        }
        else{
            res.render("profile", {foundblog:req.params.id});
        }
    })
   
})

module.exports = routes;
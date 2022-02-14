const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    topic: String,
    category: String,
    title: String,
    image: String,
    description: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like"
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
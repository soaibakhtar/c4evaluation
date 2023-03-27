const mongoose = require("mongoose") 
 const PostSchema = mongoose.Schema({
    "title": String,
    "body": String,
    "device": String,
    "no_of_comments": Number,
    "UserId":String
 })
 const PostModel = mongoose.model("note",PostSchema)
module.exports = { PostModel}
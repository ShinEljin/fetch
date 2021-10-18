const mongoose = require("mongoose");

var date = new Date();
var datestring = ("0" + (date.getMonth() + 1).toString()).substr(-2) + "/" + ("0" + date.getDate().toString()).substr(-2)  + "/" + (date.getFullYear().toString()).substr(2);


const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  }, 
  date: {
    type: String,
    default: datestring
  }
});



const PostCard = mongoose.model("PostCard", postSchema);

module.exports = PostCard;
// jshint esversion: 6
// const {MongoClient, ObjectId} = require('mongodb');
const mongoose = require('mongoose');
require('./config.js');
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-41nx2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true});

mongoose.connection.once('open', () => console.log('Connection successed!'));

// post schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model('post', postSchema);

module.exports = class PostManager {

  findAll(callback){
    Post.find((err, data) => {
      data.forEach(elem => elem.id = elem._id.toString());
      callback(err, data);
    });
  }

  findById(id, callback){
    // Post.find({_id: id}, (err, data) => callback(err, data[0]));
    Post.findById(id, (err, data) => callback(err, data));
  }

  create(title, content, callback){
    const post = new Post({title, content});
    post.save((err, data) => {
      if(data){
        console.log('Post created:', JSON.stringify(data));
        callback();
      }
    });
  }
};

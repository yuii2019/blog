// jshint esversion: 6
// const {MongoClient, ObjectId} = require('mongodb');
const mongoose = require('mongoose');
const username = 'admin';
const password = 'admin';
const dbname = 'blog';
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-41nx2.mongodb.net/${dbname}?retryWrites=true&w=majority`, {useNewUrlParser: true});

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

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect("mongodb://john:doe@mongo-server:27017/mongodb?authSource=admin")
.then(() => {
    console.log('database connected')
})
.catch((error) => {
    console.log(error)
})

const user = new mongoose.Schema({
    name: String,
    age : Number,
})
const User = mongoose.model('User', user)

const post = new mongoose.Schema({
    title: String,
    desc: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
const Post = mongoose.model('Post', post)

const user1 = new User({
    name: 'aryan',
    age: 78
})

const user2 = new User({
    name: 'john',
    age: 2
})

user1.save();
user2.save();

const post1 = new Post({
    title: 'i m lucky',
    desc: 'just a message',
    postedBy: user1._id
})

const post2 = new Post({
    title: 'i m not lucky',
    desc: 'i am idiot',
    postedBy: user2._id
})

post1.save((error) => {
    if(!error) {
        Post.find({})
            .populate('postedBy')
            .exec((error, posts) => {
                // console.log(JSON.stringify(posts, null, "\t"))
                console.log(posts[0].postedBy.name)
                
            })
    }
})

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(8000, ()=> {
    console.log('app server is connected')
})
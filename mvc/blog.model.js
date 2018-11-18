const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blog = mongoose.model('blog',new Schema({
    title: String,
    author: String,
    body: String
}))

module.exports = blog

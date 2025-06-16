const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title : String, // Corrigé ici
    content : String,
    image : String,
    key :String,
    tags : [String],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    views: { type: Number, default: 0 } ,
    shares:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, 
{ timestamps: true });

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;
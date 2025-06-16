const mongoose =require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/intergroup",
{useNewUrlParser:true, useUnifiedTopology:true})
     .then(()=>console.log('Monogo is Up'))
     .catch(err=> console.log('Mongo is down. Raison :',err));

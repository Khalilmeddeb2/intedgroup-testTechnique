const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: String, // Corrigé ici
    lastName: String,
    email: String,
    password: String,
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    refreshToken: String,  // <-- nouveau champ


}, 
{ timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;

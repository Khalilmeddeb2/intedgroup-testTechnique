const mongoose = require('mongoose');
const RoleSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    enum: ['Admin', 'Editeur', 'Redacteur','Lecteur'], //  // Rôles prédéfinis
     },
    permissions: [{ type: String }]
 
});

const Role = mongoose.model('Role', RoleSchema);
module.exports = Role;
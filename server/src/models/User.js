const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true},
  user_id: {type:Int16Array, required:true, unqiue:true},
  chef_level: {type:Int16Array, required:true}
});

module.exports = mongoose.model('User', UserSchema);
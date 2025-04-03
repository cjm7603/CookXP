const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    
  friend_id: {type:Int16Array, required:true, unique:true},
  user_id: {type:Int16Array, required:true},
  friend_id: {type:Int16Array, required:true},
  friendship_date: {type:Date, required: true}
});

module.exports = mongoose.model('Friend', FriendSchema);
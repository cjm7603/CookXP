const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const FriendSchema = new mongoose.Schema({
    
  friend_id: {type:Number, required:true, unique:true},
  username: {type:String, required:true},
  friend_username: {type:String, required:true},
  friendship_date: {type:Date, required: true, default:Date.now}
});

AchievementSchema.plugin(AutoIncrement, { inc_field: 'friend_id' });
module.exports = mongoose.model('Friend', FriendSchema);
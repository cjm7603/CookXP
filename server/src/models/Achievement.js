const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({

    achievement_id: {type:Int16Array, required:true, unqiue:true},
    user_id: {type:Int16Array, required:true},
    name: {type:String, required:true},
    description: {type:String, required:false},
    //idk if points_required is necessary, will add later if needed
    earned_date: {type:Date,required:true}
});

module.exports = mongoose.model('Achievement', AchievementSchema);
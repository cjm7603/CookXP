const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const AchievementSchema = new mongoose.Schema({

    achievement_id: {type:Number, required:true, unique:true},
    username: {type:String, required:true},
    name: {type:String, required:true},
    description: {type:String, required:false},
    //idk if points_required is necessary, will add later if needed
    earned_date: {type:Date,required:true, default:Date.now}
});
AchievementSchema.plugin(AutoIncrement, { inc_field: 'achievement_id' });

module.exports = mongoose.model('Achievement', AchievementSchema);
const Achievement = require('../models/Achievement');
require('dotenv').config();

exports.create = async (req, res) => {
    const {username, name, description } = req.body;

    try {
        const newAchievement = new Achievement({
            username, 
            name, 
            description,
        });

        await newAchievement.save();
        res.status(201).json({ message: "Achievement created successfully", achievement: newAchievement });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getByUser = async (req, res) => {
    const { username } = req.params;

    try {
        const userAchievements = await Achievement.find({ username });

        if (userAchievements.length === 0) {
            return res.status(404).json({ message: "No achievements found for this user" });
        }

        res.status(200).json(userAchievements);

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

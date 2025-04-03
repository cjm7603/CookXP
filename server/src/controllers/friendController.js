const Friend = require('../models/Friend');
require('dotenv').config();

exports.create = async (req, res) => {
    const {username, friend_username } = req.body;

    try {
        const newFriend= new Friend({
            username,
            friend_username,
        });

        await newFriend.save();
        res.status(201).json({ message: "Friend created successfully", friend: newFriend });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getByUser = async (req, res) => {
    const { username } = req.params;

    try {
        const userFriends = await Friend.find({ username });

        if (userFriends.length === 0) {
            return res.status(404).json({ message: "User has no friends" });
        }

        res.status(200).json(userFriends);

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

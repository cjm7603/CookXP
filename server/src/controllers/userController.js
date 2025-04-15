const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const secret = process.env.SECRET_KEY; 

exports.signup = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json("Username already taken, please choose a different one");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ newUser, message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)
  try {
    const userDoc = await User.findOne({ username });
    const userList = await User.find();
    console.log(userList)
    console.log(userDoc)
    if (!userDoc) {
      return res.status(404).json({ message: "Invalid username" });
    }

    const isMatch = await bcrypt.compare(password, userDoc.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) {
        console.error("JWT Signing Error:", err);
        return res.status(500).json({ message: "Error generating token" });
      }

      res.cookie('token', token, { httpOnly: true }).json({
        id: userDoc._id,
        username,
        token, 
        message: "Login successful"
      });
    });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
      res.clearCookie('token').json({ message: "Logout successful" });
  } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.addFriend = async (req, res) => {
  const { friendId } = req.body;
  const userId = req.user.id; 

  try {
    if (userId === friendId) {
      return res.status(400).json({ message: "You can't add yourself as a friend." });
    }

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found." });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "This user is already your friend." });
    }

    user.friends.push(friendId);
    await user.save();

    res.status(200).json({ message: "Friend added successfully", friends: user.friends });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


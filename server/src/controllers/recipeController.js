const axios = require('axios');
const Recipe= require('../models/Recipe');
require('dotenv').config();


exports.getRandom = async (req, res) => {
    try {
        const url = "www.themealdb.com/api/json/v1/1/random.php"

        try {
            const response = await axios.get(url);
            res.status(200).json(response.data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            res.status(500).json({ message: "Failed to fetch weather data", error: error.message });
        }

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getByIngredient = async (req, res) => {
    

};
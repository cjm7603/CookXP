import React, { useState } from "react";
import SideNav from "../components/SideNav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import {RecipeModel} from '../models/RecipeModel';
import "../styling.css";

const Home = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(RecipeModel);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleGetRandomRecipe = async () => {
    setLoading(true);
    setError("");
    try {

      const response = await axios.get("http://localhost:5000/recipe/random");
      const data = response.data;

      if(data && data.meals && data.meals.length > 0){
        setRecipe(data.meals[0]);
      }
      else{
        setError("No recipe found!");
      }
    } catch (error) {
      setError("Recipe fetch failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoToProfile = () => {
    navigate("/profile");
}

  return (
    <div className="home">
      <SideNav />
      <div className="body">
        <button onClick={handleGoToProfile}>
          View Profile
        </button>
        <button onClick={handleGetRandomRecipe} className="signup-button">
          {loading ? <CircularProgress size={24} color="white"/> : "Random Recipe"}
        </button>
        {recipe?.strInstructions}
        {error && <div className="error">{error}</div> }
      </div>
    </div>
  );
};

export default Home;

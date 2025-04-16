import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import Recipe from "../components/Recipe";
import {RecipeModel} from '../models/RecipeModel';
import { FaRectangleXmark, FaUser } from "react-icons/fa6";
import { Checkbox, Progress } from "antd";

import "../styling.css";

const Home = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(RecipeModel);
  const [loading, setLoading] = useState(false);
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");

  const toggleRecipe = () => {
    setRecipeOpen(!recipeOpen);
  }

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

  useEffect(() => {
    handleGetRandomRecipe();
  }, []);

  const handleGoToProfile = () => {
    navigate("/profile");
  }

  const handleGoToSignup = () => {
    navigate("/signup");
  };

  const handleGetUserInfo = async () => {

    try {
        const { data } = await axios.get('http://localhost:5000/user/' + token.username);
        if(data && data.userDetails ){
            setUserInfo(data.userDetails);
        }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
          const storedData = localStorage.getItem('userInfo');
          if(storedData) {
              setToken(JSON.parse(storedData));
          }
          else{
              handleGoToSignup();
          }
      }, []);
  
      useEffect(() => {
          if (token) {
              handleGetUserInfo();
          }
      }, [token]);

      const checkCompleteRecipe = async () => {
        const completeRecipe = {
            recipe_id: recipe.idMeal,
            username: token.username,
            is_completed: true
        }
        try {
            const response = await axios.post('http://localhost:5000/user/createRecipeCompletion', completeRecipe);
            if(response){
                if(response.status == 201) {
                    console.log("recipe completed added");
                    navigate(0);
                }
                else{
                    console.log(response);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

  const renderIngredients = () => {
    return(
        <div>
            {Object.keys(recipe).map((key, index) => {
            if (key.startsWith("strIngredient") && recipe[key]) {
                const measureKey = `strMeasure${key.replace("strIngredient", "")}`;
                return (
                  <div key={index}>
                    <Checkbox className="item">
                      {recipe[measureKey] || ""} {recipe[key]}
                    </Checkbox>
                    <br/>
                  </div>
                );
            }
            return null;
            })}
        </div>
    );
  }

  const renderDirections = () => {
    const parts = recipe.strInstructions.split('.');

    return(
        <div>
            {parts.splice(0,parts.length-1).map((part, index) => (
              <div key={index} className="item">
                <div>
                  {index + 1}. {part}
                </div>
                
                {index < parts.length - 1 && <br/>}
              </div>
            ))}
        </div>
    );
  }

  return (
    <div className="home">
      <SideNav />
      <div className="body">
        <div className="title">
            <div className="hello">
              Hello, <span className="bold">Chef {userInfo?.username}!</span>
            </div>
            <div className="user" onClick={handleGoToProfile}>
              <div className="profilePic">
                <FaUser color="white"/>
              </div>
              {userInfo?.username}
            </div>
        </div>

        <div className="content">
          <div className="left">
            <div className="levels">
              <div className="current">
                <div className="rank">
                  Chef Rank
                </div>
                <div className="status">
                  <div className="points">
                    <div>
                      Level 2
                    </div>
                    <div>
                     100 points
                    </div>
                  </div>
                  <div className="bar">
                    <Progress percent={34} size={[ , 30]} trailColor="white" strokeColor="#FF8F49" showInfo={false}/>
                  </div>
                  <div className="labels">
                    <div>
                      LEVEL 0
                    </div>
                    <div>
                      LEVEL 0
                    </div>
                  </div>
                </div>
              </div>
              <div className="next">
                000 points until level 0!
              </div>
            </div>
            <div className="ingredients">
              <div className="heading">
                Ingredients Needed:
              </div>
              <div className="list">
                {renderIngredients()}
              </div>
            </div>
          </div>
          <div className="right">
            <div className="tagline">
              What's cooking?
            </div>
            <div className="card">
              <div className="photo" style={{ backgroundImage: `url(${recipe?.strMealThumb})`}} />
              
              <div className="info">
                <div className="name">
                  {recipe?.strMeal}
                </div>
                <div className="viewButton" onClick={toggleRecipe}>
                  View Recipe
                </div>
              </div>
            </div>

            <div className="button" onClick={checkCompleteRecipe}>
              {loading ? <CircularProgress size={24} color="white"/> : "Completed"}
            </div>
          </div>
        </div>
      </div>

      {recipeOpen ? <div className="recipeOpen">
        <div className="modal">
          <div className="title">
            <div className="name">
              {recipe?.strMeal}
            </div>
            <div className="close" onClick={toggleRecipe}>
              <FaRectangleXmark className="icon"/>
            </div>
          </div>
          <div className="recipeInfo">
            <div className="left">
              <div className="photo">
                <img src={recipe?.strMealThumb} className="thumbnail"/>
              </div>
              <div className="ingredients">
                <div className="heading">
                  Ingredients
                </div>
                
                <div className="list">
                  {renderIngredients()}
                </div>
              </div>
            </div>

            <div className="directions">
              <div className="heading">
                Directions
              </div>
              <div className="list">
                {renderDirections()}
              </div>
            </div>
          </div>
        </div>
      </div> : null}
    </div>
  );
};

export default Home;

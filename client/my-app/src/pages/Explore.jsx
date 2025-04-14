import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideNav from "../components/SideNav";
import {RecipeModel} from '../models/RecipeModel';
import { FaFilter, FaMagnifyingGlass, FaRectangleXmark } from "react-icons/fa6";
import { ConfigProvider, Input, Checkbox } from "antd";
import "../styling.css";

const Explore = () => {
    const [recipe, setRecipe] = useState(RecipeModel);
    const [recipeOpen, setRecipeOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const toggleRecipe = () => {
        setRecipeOpen(!recipeOpen);
    }
    
    // placeholder: need to fetch all recipes to display long list //
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
        <div className="explore">
            <SideNav />

            <div className="body">
                <div className="title">
                    Explore Recipes
                </div>
                <div className="filterSearch">
                    <div className="filter">
                        <FaFilter className="icon"/>

                        Open Filters
                    </div>
                    <div className="search">
                        <ConfigProvider
                            theme={{
                                token: {
                                    fontFamily: 'Lato',
                                    fontSize: '16px'
                                }
                            }}
                        >
                            <Input prefix={<FaMagnifyingGlass className="icon" />} placeholder="Search..." variant="borderless" value={search} onChange={(e) => setSearch(e.target.value)} className="input"/>
                        </ConfigProvider>
                    </div>
                </div>
                <div className="content">
                    <div className="cards">
                        {/* placeholder: will want to map through all recipes */}
                        <div className="card" onClick={toggleRecipe}>
                            <div style={{ backgroundImage: `url(${recipe?.strMealThumb})`}} className="photo"/>

                            <div className="name">
                                {recipe?.strMeal}
                            </div>
                        </div>
                        <div className="card" onClick={toggleRecipe}>
                            <div style={{ backgroundImage: `url(${recipe?.strMealThumb})`}} className="photo"/>

                            <div className="name">
                                {recipe?.strMeal}
                            </div>
                        </div>
                        <div className="card" onClick={toggleRecipe}>
                            <div style={{ backgroundImage: `url(${recipe?.strMealThumb})`}} className="photo"/>

                            <div className="name">
                                {recipe?.strMeal}
                            </div>
                        </div>
                        <div className="card" onClick={toggleRecipe}>
                            <div style={{ backgroundImage: `url(${recipe?.strMealThumb})`}} className="photo"/>

                            <div className="name">
                                {recipe?.strMeal}
                            </div>
                        </div>
                        <div className="card" onClick={toggleRecipe}>
                            <div style={{ backgroundImage: `url(${recipe?.strMealThumb})`}} className="photo"/>

                            <div className="name">
                                {recipe?.strMeal}
                            </div>
                        </div>
                        <div className="card" onClick={toggleRecipe}>
                            <div style={{ backgroundImage: `url(${recipe?.strMealThumb})`}} className="photo"/>

                            <div className="name">
                                {recipe?.strMeal}
                            </div>
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
    )
}

export default Explore;
import React, { useState } from "react";
import vector from "../assets/Vector.png";
import {RecipeModel} from '../models/RecipeModel';
import "../styling.css";


const Recipe = ({recipe}) => {


    const checkRecipeCompleted = async() => {
        
    }




    return (
        <div className="recipe">
            <div className="head">
            <div className="name">
                    {recipe?.strMeal}
                </div>
                <img src={vector} alt="Close Tab" className="vector"/>
            </div>
            <div className="body">
                <div className="left">
                    <button>
                        <img src={recipe?.strMealThumb} alt="Recipe Thumbnail" className="picture"/>
                    </button>
                    
                    <div className="ingredients">
                        <div className="heading">
                            Ingredients
                        </div>
                        <div className="list">
                            <div className="ingredient">
                                Test Ingredient
                            </div>
                        </div>

                    </div>
                </div>
                <div className="directions">
                    <div className="heading">
                        Directions
                    </div>
                    <div className="list">
                        {recipe?.strInstructions}
                    </div>
                    <button className="complete">Complete </button>
                </div>
            </div>
        </div>
    );
};

export default Recipe;
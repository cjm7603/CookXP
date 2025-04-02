import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styling.css";


const Header = () => {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="header">
            <div className="title">
                <img src={logo} alt="CookXP Logo" className="logo"/>
                
                <div className="name">
                    CookXP
                </div>
            </div>

            <button onClick={handleGoToLogin} className="login-button">
                Login
            </button>
            
        </div>
    );
};

export default Header;
import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styling.css";


const Header = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);

    const handleGoToLogin = () => {
        navigate("/login");
    };
    
    const handleGoToLogout = async () => {
        try {
            const { data } = await axios.post("http://localhost:5000/user/logout");
            localStorage.removeItem("userInfo");
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
          
    }

    const handleGoToProfile = () => {
        navigate("/profile");
    }

    useEffect(() => {
        const storedData = localStorage.getItem('userInfo');
        if(storedData) {
            setToken(JSON.parse(storedData))
        }
        console.log(storedData);
    }, []);

    return (
        <div className="header">
            <div className="title">
                <img src={logo} alt="CookXP Logo" className="logo"/>
                
                <div className="name">
                    CookXP
                </div>
            </div>
            {token == null 
            ?
            <button onClick={handleGoToLogin} className="login-button">
                Login
            </button>
            :
            <div>
                <button onClick={handleGoToProfile} className="login-button">
                    Profile
                </button>
                <button onClick={handleGoToLogout} className="login-button">
                    Logout
                </button>
            </div>
            }
            
        </div>
    );
};

export default Header;
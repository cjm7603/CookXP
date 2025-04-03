import React, {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import "../styling.css";

const Profile = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [userFriends, setUserFriends] = useState([]);
    const [userAchievements, setUserAchievements] = useState([]);
    const friendText = useRef();

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

  const handleGetUserFriends = async () => {
    try {
        const { data } = await axios.get('http://localhost:5000/user/friend/' + token.username);
        if(data && data.userFriends){
            setUserFriends(data.userFriends);
        }
    } catch (error) {
        console.log(error);
    }

  }

  const handleGetUserAchievements = async () => {
    try {
        const { data } = await axios.get('http://localhost:5000/achievement/user/' + token.username);
        if(data && data.userAchievements){
            setUserAchievements(data.userAchievements);
        }
    } catch (error) {
        console.log(error);
    }

  }

  const handleAddFriend = async() => {
    const names = {
        username: userInfo.username,
        friend_username: friendText.current.value,
    }
    try {
        const response = await axios.post('http://localhost:5000/user/friend/add', names);
        if(response){
            if(response.status == 201) {
                console.log("friend added");
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
            handleGetUserFriends();
            handleGetUserAchievements();
        }
    }, [token]);
  return (
    <div className="welcome">
        <Header />

        <h1>Hello  {userInfo?.username}!</h1>
        <h2>Chef level {userInfo?.chef_level}</h2>
        
        {userFriends.length === 0
            ?
            <h4>You have no friends :(</h4>
            :
                <div>
                    <h3>Friends</h3>
                    {userFriends.map((friend, index) => (
                        <div key={index}>
                            <h4>{friend.friend_username}</h4>
                            <h5>Friends since {new Date(friend.friendship_date).toLocaleDateString()}</h5>
                        </div>

                    ))}
                </div>
        }
        <input type="text" ref={friendText}/>
        <button onClick={handleAddFriend}>Add friends</button>

        {userAchievements.length === 0
            ?
            <h4>You have no Achievements :(</h4>
            :
                <div>
                    <h3>Achievements</h3>
                    {userAchievements.map((achievement, index) => (
                        <div  key={index}>
                            <h4>{achievement.name}</h4>
                            <h5>Description: {achievement.description}</h5>
                            <h5>Earned: {new Date(achievement.earned_date).toLocaleDateString()}</h5>
                        </div>
                    ))}
                </div>
        }
    </div>
  );
};

export default Profile;

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
            console.log(data.userFriends);
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
        }
    }, [token]);
  return (
    <div className="welcome">
        <Header />

        <h1>Hello  {userInfo?.username}!</h1>
        <h2>Chef level {userInfo?.chef_level}</h2>
        
        {userFriends == []
            ?
            <h4>You have no freinds :(</h4>
            :
                <div>
                    <h3>Friends</h3>
                    {userFriends.map((friend, index) => (
                        <h4 key={index}>{friend.friend_username}</h4>
                    ))}
                </div>
        }
        <input type="text" ref={friendText}/>
        <button onClick={handleAddFriend}>Add friends</button>

    </div>
  );
};

export default Profile;

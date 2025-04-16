import React, {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import axios from "axios";
import { FaCircleXmark, FaUser } from "react-icons/fa6";
import { Input, Progress } from "antd";
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
            handleGetUserAchievements();
        }
    }, [token]);

    return (
        <div className="profile">
            <SideNav />

            <div className="body">
                <div className="title">
                    <div className="profilePic">
                        <FaUser color="white" size={30}/>
                    </div>

                    <div className="username">
                        {userInfo?.username}
                    </div>
                </div>

                <div className="content">
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

                    <div className="friends">
                        <div className="addFriend">
                            <input type="text" ref={friendText} placeholder="Enter username to add..." className="input"/>
                            <div className="addButton" onClick={handleAddFriend}>Add Friend</div>
                        </div>
                        <div className="myFriends">
                            <div className="heading">
                                My Friends
                            </div>
                            
                            {userFriends == [] ?
                                <div>
                                    You have no friends.
                                </div> : <div className="items">
                                    {userFriends.map((friend, index) => (
                                        <div key={index} className="item">
                                            {friend.friend_username}
                                            
                                            {/* add onClick remove friend function */}
                                            <FaCircleXmark  className="remove"/> 
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

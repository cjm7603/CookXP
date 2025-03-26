import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { Container, Box, TextField, Button, Typography, CircularProgress } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useUser();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "/user/login",
        { username, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const userInfo = { id: data.id, username: data.username, email: data.email, token: data.token };

      setUserInfo(userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      navigate("/home");
    } catch (error) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box>
        <Typography variant="h5">Login</Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography>{error}</Typography>}
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "LOG IN"}
        </Button>
      </Box>
      <Typography>
        Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
      </Typography>
    </Container>
  );
};

export default Login;

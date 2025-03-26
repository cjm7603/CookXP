import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Box, TextField, Button, Typography, CircularProgress } from "@mui/material";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:5000/user/signup", { email, username, password });
      navigate("/login");
    } catch (error) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box>
        <Typography variant="h3">Create Account</Typography>
        <Typography variant="h6">Sign up to get started</Typography>
      </Box>
      <Box>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          variant="contained"
          fullWidth
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "SIGN UP"}
        </Button>
      </Box>
      <Typography>
        Already have an account? <span onClick={() => navigate("/login")}>Log In</span>
      </Typography>
    </Container>
  );
};

export default Signup;
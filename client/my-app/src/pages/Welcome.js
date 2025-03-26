import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/login");
  };

  const handleGoToSignup = () => {
    navigate("/signup");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" fontWeight="bold" mb={3}>
        Welcome to Our Platform!
      </Typography>
      <Typography variant="h6" mb={3}>
        We're glad to have you here. Please log in or sign up to get started.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoToLogin}
        sx={{ fontSize: 16, fontWeight: "bold", mb: 2 }}
      >
        Log In
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleGoToSignup}
        sx={{ fontSize: 16, fontWeight: "bold" }}
      >
        Sign Up
      </Button>
    </Container>
  );
};

export default Welcome;

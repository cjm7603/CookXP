import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate("/home");
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
        We're glad to have you here. Start exploring and enjoy your experience.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoToHome}
        sx={{ fontSize: 16, fontWeight: "bold" }}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default Welcome;

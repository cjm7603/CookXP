import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";

const Home = () => {
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
        Welcome to the Home Page!
      </Typography>
      <Typography variant="h6" mb={3}>
        This is a simple Home page where you can place your content.
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontSize: 16, fontWeight: "bold", mt: 2 }}
        >
          Sample Button
        </Button>
      </Box>
    </Container>
  );
};

export default Home;

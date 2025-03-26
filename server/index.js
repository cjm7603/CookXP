const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware (optional)
app.use(express.json());

// Sample Route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
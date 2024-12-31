const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 5000; // Port yang digunakan oleh server

// Middleware
app.use(cors()); // Mengizinkan permintaan dari frontend
app.use(bodyParser.json()); // Mengizinkan server untuk membaca body dalam format JSON

// Routes
app.use("/auth", authRoutes); // Menggunakan route auth.js untuk endpoint /auth

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

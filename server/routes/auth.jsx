const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Endpoint untuk registrasi
router.post("/register", async (req, res) => {
  const { fullname, occupation, email, password, confirmPassword } = req.body;

  // Validasi input
  if (!fullname || !occupation || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    // Cek apakah email sudah terdaftar
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Tambahkan pengguna ke database
    const [result] = await db.query(
      "INSERT INTO users (fullname, occupation, email, password, created_at) VALUES (?, ?, ?, ?, ?)",
      [fullname, occupation, email, password, new Date()]
    );

    // Kirim respons sukses
    res
      .status(201)
      .json({ message: "Registration successful!", userId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register. Please try again." });
  }
});

module.exports = router;

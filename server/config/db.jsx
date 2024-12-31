const mysql = require("mysql2");

// Konfigurasi koneksi ke database XAMPP MySQL
const pool = mysql.createPool({
  host: "localhost", // Host XAMPP
  user: "root", // User default XAMPP
  password: "", // Password default XAMPP (kosong)
  database: "db_freelance", // Nama database yang dibuat
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();

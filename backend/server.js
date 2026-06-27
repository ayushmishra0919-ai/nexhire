const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Existing Routes
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const downloadRoutes = require("./routes/downloadRoutes");

// New Profile Route
const profileRoutes = require("./routes/profileRoutes");

// MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Create directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

// New Upload Folder
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}
if (!fs.existsSync("./uploads/profiles")) {
  fs.mkdirSync("./uploads/profiles", { recursive: true });
}
if (!fs.existsSync("./uploads/resumes")) {
  fs.mkdirSync("./uploads/resumes", { recursive: true });
}

const app = express();
const port = process.env.PORT || 4444;

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());

// Static Uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Existing Routes
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/upload", uploadRoutes);
app.use("/host", downloadRoutes);

// New Profile API
app.use("/api/profile", profileRoutes);

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}!`);
});
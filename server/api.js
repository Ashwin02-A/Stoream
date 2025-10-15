// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcrypt");

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose
//   .connect("mongodb://127.0.0.1:27017/userDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// const UserSchema = new mongoose.Schema({
//   firstName: { type: String, required: true, trim: true },
//   lastName: { type: String, required: true, trim: true },
//   email: { type: String, required: true, unique: true, trim: true },
//   password: { type: String, required: true },
//   phoneNumber: { type: String, required: true, trim: true },
//   planName: { type: String, required: true },
//   amount: { type: String, required: true },
//   paymentTime: { type: String, required: true },
// });

// const User = mongoose.model("User", UserSchema);

// app.post("/api/register", async (req, res) => {
//   try {
//     let { firstName, lastName, email, password, phoneNumber, planName, amount, paymentTime } = req.body;

//     firstName = firstName.trim();
//     lastName = lastName.trim();
//     email = email.trim().toLowerCase();
//     phoneNumber = phoneNumber.trim();
//     planName = planName.trim();
//     amount = amount.trim();
//     paymentTime = paymentTime.trim();

//     if (!firstName || !lastName || !email || !password || !phoneNumber || !planName || !amount || !paymentTime) {
//       return res.status(400).json({ success: false, message: "All fields are required." });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: "Email already registered. Try logging in." });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       phoneNumber,
//       planName,
//       amount,
//       paymentTime,
//     });

//     await newUser.save();
//     res.json({ success: true, message: "User registered successfully!" });
//   } catch (error) {
//     console.error("Registration Error:", error);
//     res.status(500).json({ success: false, message: "Server error. Please try again later." });
//   }
// });

// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ success: false, message: "User not found" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ success: false, message: "Invalid password" });
//     }

//     res.json({
//       success: true,
//       firstName: user.firstName,
//       planName: user.planName,
//       amount: user.amount,
//       profile_image: "",
//     });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// app.listen(5000, () => console.log("Server running on port 5000"));

// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs"); // For password comparison
// const User = require("./models/User"); // Assuming you have a User model

// const router = express.Router();

// // MongoDB connection setup
// mongoose.connect("mongodb://localhost:27017/userDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Login route
// router.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user in the database
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ success: false, message: "User not found" });
//     }

//     // Compare the entered password with the stored password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "Invalid credentials" });
//     }

//     // Return success response with user data
//     return res.json({
//       success: true,
//       firstName: user.firstName,
//       profile_image: user.profile_image,
//       planName: user.planName,
//       amount: user.planAmount,
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcryptjs"); // Changed to bcryptjs for better compatibility
// const jwt = require("jsonwebtoken"); // Optional: For authentication tokens

// const app = express();
// app.use(cors());
// app.use(express.json());

// const SECRET_KEY = "your_secret_key"; // Change this to a secure secret key

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://127.0.0.1:27017/userDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Define User Schema
// const UserSchema = new mongoose.Schema({
//   firstName: { type: String, required: true, trim: true },
//   lastName: { type: String, required: true, trim: true },
//   email: { type: String, required: true, unique: true, trim: true },
//   password: { type: String, required: true },
//   phoneNumber: { type: String, required: true, trim: true },
//   planName: { type: String, required: true },
//   amount: { type: String, required: true },
//   paymentTime: { type: String, required: true },
// });

// const User = mongoose.model("User", UserSchema);

// /**
//  * 📝 REGISTER (Sign Up) - Stores user details in MongoDB
//  */
// app.post("/api/register", async (req, res) => {
//   try {
//     let { firstName, lastName, email, password, phoneNumber, planName, amount, paymentTime } = req.body;

//     // Trim input values
//     firstName = firstName?.trim();
//     lastName = lastName?.trim();
//     email = email?.trim().toLowerCase();
//     phoneNumber = phoneNumber?.trim();
//     planName = planName?.trim();
//     amount = amount?.trim();
//     paymentTime = paymentTime?.trim();

//     // Check if all fields are provided
//     if (!firstName || !lastName || !email || !password || !phoneNumber || !planName || !amount || !paymentTime) {
//       return res.status(400).json({ success: false, message: "All fields are required." });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: "Email already registered. Try logging in." });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       phoneNumber,
//       planName,
//       amount,
//       paymentTime,
//     });

//     await newUser.save();
//     res.json({ success: true, message: "🎉 User registered successfully!" });
//   } catch (error) {
//     console.error("❌ Registration Error:", error);
//     res.status(500).json({ success: false, message: "Server error. Please try again later." });
//   }
// });

// /**
//  * 🔑 LOGIN (Sign In) - Authenticates user and returns a token
//  */
// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "Email and password are required." });
//     }

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ success: false, message: "User not found. Please register first." });
//     }

//     // Validate password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ success: false, message: "Invalid password." });
//     }

//     // Generate authentication token (optional)
//     const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

//     res.json({
//       success: true,
//       message: "🎉 Login successful!",
//       token, // Send token for authentication (optional)
//       userData: {
//         firstName: user.firstName,
//         planName: user.planName,
//         amount: user.amount,
//         profile_image: "", // Placeholder for future profile images
//       },
//     });
//   } catch (error) {
//     console.error("❌ Login Error:", error);
//     res.status(500).json({ success: false, message: "Server error. Please try again later." });
//   }
// });


// // Start the Express server
// app.listen(5000, () => console.log("🚀 Server running on port 5000"));
// updated code 




// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcryptjs"); // Changed to bcryptjs for better compatibility
// const jwt = require("jsonwebtoken"); // Optional: For authentication tokens

// const app = express();
// app.use(cors());
// app.use(express.json());

// const SECRET_KEY = "your_secret_key"; // Change this to a secure secret key

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://127.0.0.1:27017/stoream_db", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Define User Schema
// const UserSchema = new mongoose.Schema({
//   firstName: { type: String, required: true, trim: true },
//   lastName: { type: String, required: true, trim: true },
//   email: { type: String, required: true, unique: true, trim: true },
//   password: { type: String, required: true },
//   phoneNumber: { type: String, required: true, trim: true },
//   planName: { type: String, required: true },
//   amount: { type: String, required: true },
//   paymentTime: { type: String, required: true },
// });

// const User = mongoose.model("User", UserSchema);

// /**
//  * 📝 REGISTER (Sign Up) - Stores user details in MongoDB
//  */
// app.post("/api/register", async (req, res) => {
//   try {
//     let { firstName, lastName, email, password, phoneNumber, planName, amount, paymentTime } = req.body;

//     // Trim input values
//     firstName = firstName?.trim();
//     lastName = lastName?.trim();
//     email = email?.trim().toLowerCase();
//     phoneNumber = phoneNumber?.trim();
//     planName = planName?.trim();
//     amount = amount?.trim();
//     paymentTime = paymentTime?.trim();

//     // Check if all fields are provided
//     if (!firstName || !lastName || !email || !password || !phoneNumber || !planName || !amount || !paymentTime) {
//       return res.status(400).json({ success: false, message: "All fields are required." });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: "Email already registered. Try logging in." });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       phoneNumber,
//       planName,
//       amount,
//       paymentTime,
//     });

//     await newUser.save();
//     res.json({ success: true, message: "🎉 User registered successfully!" });
//   } catch (error) {
//     console.error("❌ Registration Error:", error);
//     res.status(500).json({ success: false, message: "Server error. Please try again later." });
//   }
// });

// /**
//  * 🔑 LOGIN (Sign In) - Authenticates user and returns a token
//  */
// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "Email and password are required." });
//     }

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ success: false, message: "User not found. Please register first." });
//     }

//     // Validate password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ success: false, message: "Invalid password." });
//     }

//     // Generate authentication token (optional)
//     const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

//     res.json({
//       success: true,
//       message: "🎉 Login successful!",
//       token, // Send token for authentication (optional)
//       userData: {
//         firstName: user.firstName,
//         planName: user.planName,
//         amount: user.amount,
//         profile_image: "", // Placeholder for future profile images
//       },
//     });
//   } catch (error) {
//     console.error("❌ Login Error:", error);
//     res.status(500).json({ success: false, message: "Server error. Please try again later." });
//   }
// });

// // Start the Express server
// app.listen(5000, () => console.log("🚀 Server running on port 5000"));

//updated code

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use("/uploads/movies", express.static("uploads/movies"));

// // MongoDB Connection
// mongoose
//   .connect("mongodb://127.0.0.1:27017/stoream_db", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Movie Schema
// const MovieSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   category: { type: String, required: true },
//   videoPath: { type: String, required: true },
// });
// const Movie = mongoose.model("Movie", MovieSchema);

// // Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: "uploads/movies",
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage });

// // Upload Movie
// app.post("/api/movies", upload.single("video"), async (req, res) => {
//   try {
//     const { title, category } = req.body;
//     const videoPath = `/uploads/movies/${req.file.filename}`;
    
//     const newMovie = new Movie({ title, category, videoPath });
//     await newMovie.save();
//     res.json({ success: true, message: "Movie uploaded successfully!", movie: newMovie });
//   } catch (error) {
//     console.error("❌ Upload Error:", error);
//     res.status(500).json({ success: false, message: "Server error." });
//   }
// });

// // Get All Movies
// app.get("/api/movies", async (req, res) => {
//   try {
//     const movies = await Movie.find();
//     res.json(movies);
//   } catch (error) {
//     console.error("❌ Fetch Error:", error);
//     res.status(500).json({ success: false, message: "Server error." });
//   }
// });

// // Update Movie
// app.put("/api/movies/:id", async (req, res) => {
//   try {
//     const { title, category } = req.body;
//     await Movie.findByIdAndUpdate(req.params.id, { title, category });
//     res.json({ success: true, message: "Movie updated successfully!" });
//   } catch (error) {
//     console.error("❌ Update Error:", error);
//     res.status(500).json({ success: false, message: "Server error." });
//   }
// });

// // Delete Movie
// app.delete("/api/movies/:id", async (req, res) => {
//   try {
//     await Movie.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Movie deleted successfully!" });
//   } catch (error) {
//     console.error("❌ Delete Error:", error);
//     res.status(500).json({ success: false, message: "Server error." });
//   }
// });

// // Start Server
// app.listen(5000, () => console.log("🚀 Server running on port 5000"));



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads/movies", express.static("uploads/movies"));

// MongoDB Connection (keep existing)
mongoose.connect("mongodb://127.0.0.1:27017/stoream_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Movie Model (keep existing schema)
const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  videoPath: { type: String, required: true },
});
const Movie = mongoose.model("Movie", MovieSchema);

// Multer Configuration for movie uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/movies";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed!"), false);
    }
  }
});

// Movie CRUD Routes
app.post("/api/movies", upload.single("videoFile"), async (req, res) => {
  try {
    const { title, category } = req.body;
    const videoPath = `/uploads/movies/${req.file.filename}`;
    
    const newMovie = new Movie({ title, category, videoPath });
    await newMovie.save();
    res.status(201).json({ success: true, movie: newMovie });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: "Error uploading movie" });
  }
});

app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json({ success: true, movies });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching movies" });
  }
});

app.put("/api/movies/:id", upload.single("videoFile"), async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ success: false, message: "Movie not found" });

    const updateData = {
      title: req.body.title,
      category: req.body.category
    };

    if (req.file) {
      // Remove old file
      if (fs.existsSync(path.join(__dirname, movie.videoPath))) {
        fs.unlinkSync(path.join(__dirname, movie.videoPath));
      }
      updateData.videoPath = `/uploads/movies/${req.file.filename}`;
    }

    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ success: true, movie: updatedMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating movie" });
  }
});

app.delete("/api/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ success: false, message: "Movie not found" });

    // Remove associated file
    if (fs.existsSync(path.join(__dirname, movie.videoPath))) {
      fs.unlinkSync(path.join(__dirname, movie.videoPath));
    }
    
    res.json({ success: true, message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting movie" });
  }
});

// Keep existing authentication routes here
// app.use("/api/auth", authRoutes);

// Start Server (keep existing)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
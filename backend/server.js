const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/stoream_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Login endpoint
app.post('/login', async (req, res) => {
  console.log('Login request received:', req.body); // Log the request body
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      console.log('Login successful for user:', username); // Log success
      res.status(200).json({ message: 'Login successful' });
    } else {
      console.log('Invalid credentials for user:', username); // Log failure
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Server error:', error); // Log the error
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const User = require('../models/user.js')
const bcrypt =  require('bcryptjs')
const generateToken = require('../utils/generateToken')

// @desc   register user
// route   POST /api/users
// @access Private
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists if not create one
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await user.save();

    // Prepare the response payload
    const responsePayload = {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
    };

    // Generate and set the JWT token as a cookie
    generateToken(res, savedUser);

    res.status(201).json(responsePayload);
  } catch (err) {
    res.status(400).json({ error: err.message || "Registration failed" });
  }
};

// @desc   authenticate user
// route   POST /api/users/auth
// @access Private

// helper funtion to check anuthentication
const authenticateUser = async (email, password) => {
  // check if user exists then check provided password
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User Not Found or Invalid Credentials");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new Error("Invalid Password");
  }

  // return user after validation completed
  return user;
};

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);

    // generate and set the JWT Tooken as cookie
    generateToken(res, user);
    
    const responsePayload = {
      _id: user._id,
      name: user.name,
      email: user.email,
    }

    res.status(200).json(responsePayload)
    
  } catch (err) {
    if (err.message.includes("getaddrinfo ENOTFOUND")) {
      res.status(500).json({ error: "Failed to connect to the database" });
    } else {
      res.status(400).json({ error: err.message || "Authentication failed" });
    }
  }
};

// @desc   log out user
// route   POST /api/users/logout
// @access Private
const logOut = (req, res) => {
  res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc   get user profile
// route   GET /api/users/profile
// @access Private
const getUserProfile = (req, res) => {
  const { _id, name, email } = req.user;
  const user = { _id, name, email };
  res.status(200).json(user);
};

// @desc   update user profile
// route   POST /api/users/profile
// @access Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.newPassword) {
      const isNewPasswordSame = await bcrypt.compare(
        req.body.newPassword,
        user.password
      );
      if (isNewPasswordSame) {
        return res
          .status(400)
          .json({ error: "new password cannot be old password" });
      }
      const hashedPass = await bcrypt.hash(req.body.newPassword, 10);
      user.password = hashedPass;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

// @desc   Delete user
// route   DELETE /api/users/:id
// @access Private
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user
    await User.deleteOne({ _id: userId });

    res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    if (err.name === "CastError") {
      res.status(400).json({ error: "User not found" });
    } else {
      res.status(400).json({ error: err.message || "Failed to delete user" });
    }
  }
};

module.exports = {
  registerUser,
  authUser,
  logOut,
  getUserProfile,
  updateUserProfile,
  deleteUser,
};

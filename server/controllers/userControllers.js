var asyncHandler = require("express-async-handler");
var User = require("../models/userModel.js");
var generateToken = require("../utils/generateToken.js");

const { connect } = require("getstream");
const StreamChat = require("stream-chat").StreamChat;
require("dotenv").config();
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const serverClient = connect(api_key, api_secret, app_id);
  const client = StreamChat.getInstance(api_key, api_secret);
  const user = await User.findOne({ email });

  const { users } = await client.queryUsers({ email: email });
  const stream_token = serverClient.createUserToken(String(users[0].id));

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      // name: user.name,
      email: user.email,
      // isAdmin: user.isAdmin,
      // pic: user.pic,
      token: generateToken(user._id),
      stream_token: stream_token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const serverClient = connect(api_key, api_secret, app_id);

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User Already Exists!");
  }

  const user = await User.create({
    // name,
    email,
    password,
    // pic,
  });

  if (user) {
    const stream_token = serverClient.createUserToken(String(user._id));

    res.status(201).json({
      _id: user._id,
      // name: user.name,
      email: user.email,
      // isAdmin: user.isAdmin,
      // pic: user.pic,
      token: generateToken(user._id),
      stream_token: stream_token,
    });
  } else {
    res.status(400);
    throw new Error("User Not Found!");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      // name: updatedUser.name,
      email: updatedUser.email,
      // pic: updatedUser.pic,
      // isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});

module.exports = { authUser, updateUserProfile, registerUser };

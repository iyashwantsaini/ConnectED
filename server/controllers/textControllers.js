var asyncHandler = require("express-async-handler");
var Channel = require("../models/channelModel");

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const createChannel = asyncHandler(async (req, res) => {
  const { channelName, channelDescription } = req.body;
  const channel = await Channel.create({
    channelName,
    channelDescription,
  });
  if (channel) {
    res.status(201).json({
      _id: channel._id,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           GET /api/users/login
//@access          Public
const getChannels = asyncHandler(async (req, res) => {
  const channels = await Channel.find();
  if (channels) {
    res.status(200).json({ result: channels });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

module.exports = { createChannel, getChannels };

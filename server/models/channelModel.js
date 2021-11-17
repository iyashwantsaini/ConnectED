var mongoose = require("mongoose");

const channelSchema = mongoose.Schema(
  {
    channelName: {
      type: String,
      required: true,
    },
    channelDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;

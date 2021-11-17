var express = require("express");
var {
  createChannel,
  getChannels,
} = require("../controllers/textControllers.js");
var { protect } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.route("/channel").post(createChannel);
router.route("/channel").get(getChannels);

module.exports = router;

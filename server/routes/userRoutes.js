var express = require("express");
var {
  authUser,
  registerUser,
  updateUserProfile,
} = require("../controllers/userControllers.js");
var { protect } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").post(updateUserProfile);

module.exports = router;

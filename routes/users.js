const express = require("express");
const { checkToken, checkAdminAuth } = require("../middleware/auth");
const router = express.Router();

const userController = require("../controllers/users");

router.route("/login").post(userController.login);
router.route("/register").post(userController.register);
router.route("/email").post(userController.sendEmail);

router
  .route("/update/:id")
  .put(checkToken, checkAdminAuth, userController.update);

module.exports = router;

const express = require("express");
const router = express.Router();
const extractFile = require("../middleware/extractFile");
const gameController = require("../controllers/games");
const { checkToken, checkAdminAuth } = require("../middleware/auth");

router.route("/").get(gameController.getAll);

router
  .route("/")
  .post(
    checkToken,
    checkAdminAuth,
    extractFile.single("image"),
    gameController.create
  );

router
  .route("/:id")
  .get(gameController.find)
  .delete(checkToken, checkAdminAuth, gameController.remove)
  .put(
    checkToken,
    checkAdminAuth,
    extractFile.single("image"),
    gameController.update
  );

module.exports = router;

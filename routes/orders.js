const express = require("express");
const {
  checkToken,
  checkUserAuth,
  checkAdminAuth
} = require("../middleware/auth");
const orderController = require("../controllers/orders");

const router = express.Router();

router.route("/").get(checkToken, checkAdminAuth, orderController.getAll);

/* 
@param example: {
    "shippingAddress" : "Industrijska 27, Futog 21410"
    "orderedGames": [
    {
        "gameId": "5e62b19268817a2ce80a7295",
        "count": 2
    },
        {
        "gameId": "5e62b19c68817a2ce80a7296"
    }
    ]
}
*/
router
  .route("/:userId")
  .get(checkToken, checkUserAuth, orderController.getUserOrders)
  .post(checkToken, checkUserAuth, orderController.create);

module.exports = router;

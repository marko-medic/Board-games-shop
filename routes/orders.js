const express = require("express");
const { checkToken } = require("../middleware/auth");
const orderController = require("../controllers/orders");

const router = express.Router();

router.route("/").get(orderController.getAll);

/* 
@param example: {
    "shippingAddress" : "Industrijska 27, Futog 21410"
    "userInfo": {
        "userId": "5e63ada97c6c3c24dc0d047f"
    },
    "orderedGames": [
    {
        "gameId": "5e62b19268817a2ce80a7295",
        "count": 2
    },
        {
        "gameId": "5e62b19c68817a2ce80a7296"
    },
    {
        "gameId": "5e62b19c68817a2ce80a7293"
    }
    ]
}
*/
router.route("/:userId").post(checkToken, orderController.create);

module.exports = router;

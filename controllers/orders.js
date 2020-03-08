const OrderModel = require("../models/Order");
const UserModel = require("../models/User");
const GameModel = require("../models/Game");
const emailManager = require("../shared/emailManager");

const _findUser = async id => {
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const query = {};
    const searchTerm = req.query.search;

    if (searchTerm) {
      query["userInfo.username"] = new RegExp(searchTerm, "i");
    }
    const results = await OrderModel.find(query);
    return res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

const getUserOrders = async (req, res, next) => {
  const id = req.params.userId;
  const query = {};
  const searchTerm = req.query.search;

  if (searchTerm) {
    query["orderedGames.name"] = new RegExp(searchTerm, "i");
  }

  try {
    if (!id) {
      throw new Error("Invalid request");
    }
    const user = await _findUser(id);
    query["userInfo.userId"] = user._id;

    const orderedUserGames = await OrderModel.find(query);
    return res.status(200).json({
      success: true,
      data: orderedUserGames,
      count: orderedUserGames.length
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err
    });
  }
};

const create = async (req, res, next) => {
  const id = req.params.userId;
  const orderedGames = req.body.orderedGames;
  try {
    if (!orderedGames || !id) {
      throw new Error("Invalid request!");
    }
    const user = await _findUser(id);
    const orderedGamesIds = orderedGames.map(game => game.gameId);
    const dbOrderedGames = await GameModel.find({
      _id: {
        $in: orderedGamesIds
      }
    });

    const transformedOrderedGames = dbOrderedGames.map((game, index) => ({
      gameId: game._id,
      name: game.name,
      price: game.price,
      count: orderedGames[index].count || 1
    }));

    const totalPrice = transformedOrderedGames.reduce(
      (acc, curr) => acc + Number(curr.price) * curr.count,
      0
    );

    const dataObject = {
      userInfo: {
        userId: user._id,
        username: user.username,
        email: user.email
      },
      orderedGames: transformedOrderedGames,
      totalPrice: `$${totalPrice}`,
      shippingAddress: req.body.shippingAddress,
      deliveryType: req.body.deliveryType
    };

    const newOrder = await OrderModel.create(dataObject);
    emailManager.main({
      name: dataObject.userInfo.username,
      email: dataObject.userInfo.email,
      message: `Order id ${newOrder._id} -> ${JSON.stringify(dataObject)}`
    });
    res.status(201).json({
      success: true,
      data: newOrder
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err
    });
  }
};

module.exports = {
  getAll,
  getUserOrders,
  create
};

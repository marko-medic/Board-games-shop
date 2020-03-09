const GameModel = require("../models/Game");

const _findGame = async id => {
  try {
    const game = await GameModel.findById(id);

    if (!game) {
      throw new Error("Game not found");
    }
    return game;
  } catch (err) {
    throw err;
  }
};

const getAll = async (req, res, next) => {
  try {
    const query = {};
    const searchTerm = req.query.search;
    const sortBy = req.query.sortBy;

    if (searchTerm) {
      query.name = new RegExp(searchTerm, "i");
    }
    const results = await GameModel.find(query).sort(sortBy);
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

const create = async (req, res, next) => {
  const url = `${req.protocol}://${req.get("host")}`;
  const { name, price, description } = req.body;
  try {
    const newGame = await GameModel.create({
      name,
      price,
      description,
      imageURL: `${url}/uploads/${req.file.filename}`
    });
    return res.status(201).json({
      success: true,
      data: newGame
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      res.status(500).json({
        success: false,
        error: err.message
      });
    }
  }
};

const remove = async (req, res, next) => {
  try {
    const game = await _findGame(req.params.id);
    await game.remove();

    return res.status(200).json({
      success: true,
      data: { gameId: game._id }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

const find = async (req, res, next) => {
  try {
    const game = await _findGame(req.params.id);
    return res.status(200).json({
      success: true,
      data: game
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      error: err.message
    });
  }
};

const update = async (req, res, next) => {
  const url = `${req.protocol}://${req.get("host")}`;
  try {
    await _findGame(req.params.id);
    const newGameData = {
      ...req.body,
      imageURL: `${url}/uploads/${req.file.filename}`
    };
    const game = await GameModel.findOneAndUpdate(
      { _id: req.params.id },
      newGameData,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: game
    });
  } catch (err) {
    console.log(`errr!`.white);
    return res.status(404).json({
      success: false,
      error: err.message
    });
  }
};

module.exports = {
  getAll,
  create,
  remove,
  update,
  find
};

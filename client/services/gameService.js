import { apiRequest } from "./httpService";

const loadGames = async (url = "") => apiRequest("get", "/games" + url);

const createGame = async gameData => apiRequest("post", "/games/", gameData);

const removeGame = async gameId => apiRequest("delete", "/games/" + gameId);

const getGame = async gameId => apiRequest("get", "/games/" + gameId);

// gameData je formData
const updateGame = async (id, gameData) =>
  apiRequest("put", "/games/" + id, gameData);

export { loadGames, createGame, removeGame, getGame, updateGame };

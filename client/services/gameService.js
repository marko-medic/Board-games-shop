import { apiRequest } from "./httpService";

const loadGames = async () => apiRequest("get", "/games");

const createGame = async gameData => apiRequest("post", "/games/", gameData);

const searchGames = async searchTerm =>
  apiRequest("get", "/games?search=" + searchTerm);

const removeGame = async gameId => apiRequest("delete", "/games/" + gameId);

const getGame = async gameId => apiRequest("get", "/games/" + gameId);

// gameData je formData
const updateGame = async (id, gameData) =>
  apiRequest("put", "/games/" + id, gameData);

export { loadGames, createGame, searchGames, removeGame, getGame, updateGame };

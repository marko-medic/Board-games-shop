import {
  LOAD_GAMES_REQUEST,
  LOAD_GAMES_SUCCESS,
  LOAD_GAMES_FAILURE,
  CREATE_GAME_REQUEST,
  CREATE_GAME_FAILURE,
  CREATE_GAME_SUCCESS,
  SEARCH_GAMES_REQUEST,
  SEARCH_GAMES_SUCCESS,
  SEARCH_GAMES_FAILURE,
  REMOVE_GAME_REQUEST,
  REMOVE_GAME_SUCCESS,
  REMOVE_GAME_FAILURE,
  GET_GAME_REQUEST,
  GET_GAME_SUCCESS,
  GET_GAME_FAILURE,
  UPDATE_GAME_REQUEST,
  UPDATE_GAME_SUCCESS,
  UPDATE_GAME_FAILURE
} from "./actionTypes";

import * as gameService from "../../services/gameService";

const loadGames = dispatch => async () => {
  try {
    dispatch({
      type: LOAD_GAMES_REQUEST
    });
    const res = await gameService.loadGames();
    dispatch({ type: LOAD_GAMES_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: LOAD_GAMES_FAILURE,
      payload: err
    });
    throw err;
  }
};

const createGame = dispatch => async gameData => {
  try {
    dispatch({
      type: CREATE_GAME_REQUEST
    });
    const res = await gameService.createGame(gameData);

    dispatch({ type: CREATE_GAME_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: CREATE_GAME_FAILURE,
      payload: err
    });

    throw err;
  }
};

const searchGames = dispatch => async searchTerm => {
  try {
    dispatch({
      type: SEARCH_GAMES_REQUEST
    });
    const res = await gameService.searchGames(searchTerm);
    dispatch({
      type: SEARCH_GAMES_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SEARCH_GAMES_FAILURE,
      payload: err
    });
    throw err;
  }
};

const removeGame = dispatch => async gameId => {
  try {
    dispatch({
      type: REMOVE_GAME_REQUEST
    });
    const res = await gameService.removeGame(gameId);

    dispatch({ type: REMOVE_GAME_SUCCESS, payload: res.data.gameId });
  } catch (err) {
    dispatch({
      type: REMOVE_GAME_FAILURE,
      payload: err
    });
    throw err;
  }
};

const getGame = dispatch => async gameId => {
  try {
    dispatch({
      type: GET_GAME_REQUEST
    });
    const res = await gameService.getGame(gameId);
    dispatch({ type: GET_GAME_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: GET_GAME_FAILURE,
      payload: err
    });
    throw err;
  }
};

const updateGame = dispatch => async gameData => {
  try {
    dispatch({
      type: UPDATE_GAME_REQUEST
    });

    const res = await gameService.updateGame(gameData.get("_id"), gameData);

    dispatch({ type: UPDATE_GAME_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: UPDATE_GAME_FAILURE,
      payload: err
    });
    throw err;
  }
};

export { loadGames, createGame, searchGames, removeGame, getGame, updateGame };

import React, { createContext, useReducer } from "react";
import { initialState, reducer } from "../store/games/state";
import {
  loadGames,
  createGame,
  removeGame,
  getGame,
  updateGame
} from "../store/games/actions";

const BgContext = createContext({
  ...initialState,
  loadGames: async url => {},
  createGame: async gameData => {},
  removeGame: async gameId => {},
  getGame: async gameId => {},
  updateGame: async gameId => {}
});
const BgProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BgContext.Provider
      value={{
        ...state,
        loadGames: loadGames(dispatch),
        createGame: createGame(dispatch),
        removeGame: removeGame(dispatch),
        getGame: getGame(dispatch),
        updateGame: updateGame(dispatch)
      }}
    >
      {children}
    </BgContext.Provider>
  );
};

export { BgContext, BgProvider };

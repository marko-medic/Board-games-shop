import React, { useContext } from "react";
import Loader from "react-loader-spinner";
import { BgContext } from "../contexts/GameContext";
import { withAuth } from "../HOC/withAuth";
import { GameForm } from "../components/UI/GameForm";

function Create() {
  const { createGame, loading } = useContext(BgContext);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="create_bg">
      <h1>Create new board game</h1>
      <GameForm
        submitCb={createGame}
        buttonText="Create new board game"
        message="New game created!"
      />

      <style jsx>{`
        h1 {
          font-size: 2rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default withAuth(Create, { authType: "admin" });

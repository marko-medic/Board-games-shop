import React, { useContext, useEffect } from "react";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { useRouter } from "next/router";
import { BgContext } from "../contexts/GameContext";
import { GameForm } from "../components/UI/GameForm";
import { getErrorMessage } from "../shared/helpers";
import { withAuth } from "../HOC/withAuth";

function Edit() {
  const router = useRouter();
  const { getGame, game, updateGame, loading } = useContext(BgContext);
  const gameId = router.query.id;

  useEffect(() => {
    (async () => {
      try {
        await getGame(gameId);
      } catch (err) {
        toast.error(getErrorMessage(err));
        console.dir(err);
      }
    })();
  }, []);

  if (!gameId) {
    toast.error("Error: Game not found!");
    router.push("/");
  }

  if (isEmpty(game)) {
    return null;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="edit">
      <h3>Edit game</h3>
      <GameForm
        submitCb={updateGame}
        message="Game updated!"
        buttonText="Update this game"
        gameState={game}
      />
      <style jsx>{`
        .edit {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default withAuth(Edit, { authType: "admin" });

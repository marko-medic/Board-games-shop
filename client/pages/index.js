import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { BgContext } from "../contexts/gameContext";
import { AuthContext } from "../contexts/authContext";
import { BoardGame } from "../components/BoardGame";
import { SearchFilter } from "../components/SearchFilter";
import { Modal } from "../components/Modal";
import { getErrorMessage } from "../shared/helpers";

const Home = () => {
  const {
    loadGames,
    list: gameList,
    searchGames,
    removeGame,
    loading
  } = useContext(BgContext);
  const router = useRouter();
  const { isAdmin } = useContext(AuthContext);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState({});

  let fetching = true;
  useEffect(() => {
    if (fetching) {
      loadGames();
    }
    return () => (fetching = false);
  }, []);

  const submitModalHandler = async () => {
    if (isEmpty(currentGame)) {
      return;
    }
    try {
      setisModalOpen(false);
      await removeGame(currentGame._id);
      toast.success("Game removed!");
    } catch (err) {
      toast.error(getErrorMessage(err));
      console.dir(err);
    }
  };

  const renderGames = () =>
    gameList.map(game => (
      <BoardGame
        key={game._id}
        name={game.name}
        description={game.description}
        imageURL={game.imageURL}
        id={game._id}
        editHandler={() => router.push("/edit?id=" + game._id)}
        removeHandler={() => {
          setisModalOpen(true);
          setCurrentGame(game);
        }}
        showButtons={isAdmin}
      />
    ));

  return (
    <div className="homepage">
      {isModalOpen && (
        <Modal
          title="Are you sure you want remove this game?"
          text="Once you delete you can never take this game back!"
          closeModal={() => setisModalOpen(false)}
          submitModalHandler={submitModalHandler}
        ></Modal>
      )}

      <h3>Welcome to Board game shop!</h3>
      <img src="/images/home_img.gif" alt="home_image" />
      {loading ? (
        <Loader />
      ) : (
        <main>
          <SearchFilter submitCb={searchGames} />
          {gameList.length > 0 ? (
            <>
              <strong>Here you can see all available board games:</strong>
              <div className="row">{renderGames()}</div>
            </>
          ) : (
            <strong>We don't have any board games yet!</strong>
          )}
        </main>
      )}

      <style jsx>{`
        .homepage {
          text-align: center;
        }
        strong {
          display: block;
          margin: 2rem 0 0.2rem 0;
        }
        img {
          height: 200px;
          width: 200px;
        }
      `}</style>
    </div>
  );
};

export default Home;
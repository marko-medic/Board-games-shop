import React, { useContext } from "react";

function BoardGame({
  game,
  isAdmin,
  isCustomer,
  editHandler,
  removeHandler,
  addToCartHandler
}) {
  return (
    <div className="col s12 m4">
      <div className="card">
        <div className="card-image">
          <img src={game.imageURL} />
          <strong className="card-title">{game.name}</strong>
        </div>
        <div className="card-content">
          <p>
            <em>Description:</em> {game.description}
          </p>
        </div>
        {isCustomer && (
          <div className="card-action">
            <button className="btn red" onClick={addToCartHandler}>
              Add to cart (${game.price})
            </button>
          </div>
        )}
        {isAdmin && (
          <div className="card-action">
            <button className="btn" onClick={editHandler}>
              EDIT
            </button>
            <button className="btn red" onClick={removeHandler}>
              REMOVE
            </button>
          </div>
        )}
      </div>
      <style jsx>{`
        img {
          width: 150px;
          height: 150px;
          filter: brightness(0.5);
        }
        .card-title {
          font-weight: bolder;
        }
      `}</style>
    </div>
  );
}

export { BoardGame };

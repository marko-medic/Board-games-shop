import React, { useContext, useEffect } from "react";
import { OrderContext } from "../contexts/orderContext";
import { BgContext } from "../contexts/gameContext";

function CartOrders({ showButtons = false }) {
  const { addToCart, removeFromCart, order } = useContext(OrderContext);
  const { list } = useContext(BgContext);

  const addToCartHandler = game => {
    const selectedGame = list.find(boardGame => boardGame._id === game._id);
    addToCart({
      ...game,
      price: selectedGame.price
    });
  };

  const removeFromCartHandler = game => {
    const selectedGame = list.find(boardGame => boardGame._id === game._id);
    removeFromCart({
      ...game,
      price: selectedGame.price
    });
  };

  const renderOrderedGames = () =>
    order.orderedGames.map(game => (
      <div
        style={{ borderBottom: "1px solid #eee" }}
        className="card-body"
        key={game._id}
      >
        <p>
          Name: <strong>{game.name}</strong>
        </p>
        <p>
          Price: <strong>{game.price}</strong>
        </p>
        <p>
          {" "}
          Count: <strong>{game.count}</strong>
        </p>
        {showButtons && (
          <div className="btn-group">
            <button className="btn red" onClick={() => addToCartHandler(game)}>
              <i className="material-icons">exposure_plus_1</i>
            </button>
            <button className="btn" onClick={() => removeFromCartHandler(game)}>
              <i className="material-icons">exposure_neg_1</i>
            </button>
          </div>
        )}
      </div>
    ));
  return (
    <div className="cart-orders">
      {renderOrderedGames()}
      <p>
        Total price: <strong>${order.totalPrice}</strong>
      </p>
      <style jsx>{`
        .cart-orders {
        }
      `}</style>
    </div>
  );
}

export { CartOrders };

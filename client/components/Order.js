import React from "react";

function Order({ order, index }) {
  const renderOrderedGames = () =>
    order.orderedGames.map((game, index) => (
      <div className="game-info col" key={game.gameId + index}>
        <p>
          Name: <strong>{game.name}</strong>
        </p>
        <p>
          Price: <strong>{game.price}</strong>
        </p>
      </div>
    ));

  return (
    <div className="order col s4">
      <h5>Order {index + 1}:</h5>
      <ul>
        <li>
          Customer name: <strong>{order.userInfo.username}</strong>
        </li>
        <li>
          Customer email: <strong>{order.userInfo.email}</strong>
        </li>
        <li>
          Shipping address: <strong>{order.shippingAddress}</strong>
        </li>
        <li>
          Delivery type: <strong>{order.deliveryType}</strong>
        </li>
        <li className="game-list">
          <p>Ordered games:</p>{" "}
          <div className="games-container row">{renderOrderedGames()}</div>
        </li>
        <li>
          Total price: <strong>{order.totalPrice}</strong>
        </li>
      </ul>
      <style jsx>{`
        h5 {
          text-decoration: underline;
        }
        .order {
          box-shadow: 0px 2px 8px -3px rgba(0, 0, 0, 0.75);
        }

        .game-info {
          text-align: center;
        }

        .games-container {
          display: flex;
          border-top: 1px solid #cccccc;
          border-bottom: 1px solid #cccccc;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

export { Order };

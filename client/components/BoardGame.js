import React, { useContext } from "react";

function BoardGame({
  name,
  description,
  id,
  imageURL,
  showButtons,
  editHandler,
  removeHandler
}) {
  return (
    <div className="col s12 m4">
      <div className="card">
        <div className="card-image">
          <img src={imageURL} />
          <strong className="card-title">{name}</strong>
        </div>
        <div className="card-content">
          <p>
            <em>Description:</em> {description}
          </p>
        </div>
        {showButtons && (
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

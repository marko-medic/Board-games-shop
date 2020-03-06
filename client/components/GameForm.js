import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { createFormData, getErrorMessage } from "../shared/helpers";
import { BgContext } from "../contexts/gameContext";

const DEFAULT_STATE = {
  name: "",
  price: "",
  description: "",
  image: null
};

function GameForm({
  submitCb,
  buttonText,
  message,
  gameState = DEFAULT_STATE
}) {
  const { loading } = useContext(BgContext);
  const [state, setState] = useState(gameState);
  const [imageState, setImageState] = useState("");

  useEffect(() => {
    setState(gameState);
  }, [gameState]);

  const submitHandler = async e => {
    e.preventDefault();
    const formData = createFormData(state);
    try {
      setState(DEFAULT_STATE);
      await submitCb(formData);
      toast.success(message);
    } catch (err) {
      toast.error(getErrorMessage(err));
      console.dir(err);
    }
  };
  const imgChangeHandler = e => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageState(reader.result.toString());
      setState({
        ...state,
        image
      });
    };
    reader.readAsDataURL(image);
  };

  const changeHandler = name => val => {
    setState(state => ({
      ...state,
      [name]: val
    }));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <form encType="multipart/form-data" onSubmit={submitHandler}>
      <input
        required
        onChange={e => changeHandler("name")(e.target.value)}
        value={state.name}
        placeholder="Name"
        type="text"
        className="validate"
      />
      <input
        required
        onChange={e => changeHandler("price")(e.target.value)}
        value={state.price}
        placeholder="Price ($)"
        type="number"
        className="validate"
      />
      <textarea
        required
        onChange={e => changeHandler("description")(e.target.value)}
        value={state.description}
        id="file"
        placeholder="Description"
        type="number"
        className="validate"
      ></textarea>
      <div className="mt-1">
        <label htmlFor="file">Game image</label>
        <input
          required
          accept="image/*"
          onChange={imgChangeHandler}
          type="file"
        />
      </div>
      {imageState !== "" && (
        <div className="preview">
          <strong>Preview image: </strong>
          <img src={imageState} alt="preview" />
        </div>
      )}
      <button className="mt-1 btn" type="submit">
        {buttonText}
      </button>
      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          margin: auto;
          width: 35%;
        }
        h1 {
          font-size: 2rem;
          text-align: center;
        }
        label {
          display: block;
        }
        .mt-1 {
          margin-top: 1rem;
        }
        .preview {
          margin-top: 0.5rem;
          text-align: center;
        }
        .preview img {
          height: 100px;
          width: 100px;
          display: block;
          margin: auto;
        }
      `}</style>
    </form>
  );
}

export { GameForm };

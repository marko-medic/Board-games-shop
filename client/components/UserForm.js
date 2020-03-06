import React, { useState, useEffect, useContext } from "react";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { getCountries } from "../services/countryService";
import { BgContext } from "../contexts/gameContext";
import Loader from "react-loader-spinner";
import { getErrorMessage } from "../shared/helpers";

const DEFAULT_STATE = {
  username: "",
  email: "",
  country: "",
  password: "",
  password_repeat: ""
};

function UserForm({
  submitCb,
  buttonText,
  nameDisabled = false,
  userState = DEFAULT_STATE
}) {
  const { loading } = useContext(BgContext);
  const [state, setState] = useState(userState);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries()
      .then(resp => {
        setCountries(resp);
      })
      .catch(err => {
        toast.error(getErrorMessage(err));
        console.dir(err);
      });
  }, []);

  useEffect(() => {
    setState(userState);
  }, [userState]);

  const renderCountries = () =>
    countries.map(country => (
      <option value={country.name} key={country.name}>
        {country.name}
      </option>
    ));

  const inputHandler = name => val => setState({ ...state, [name]: val });

  const submitHandler = e => {
    e.preventDefault();
    if (state.password !== state.password_repeat) {
      toast.error("Password and repeated password must be the same");
      return;
    }
    submitCb(state);
  };

  if (isEmpty(state)) {
    return null;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        disabled={nameDisabled}
        onChange={e => inputHandler("username")(e.target.value)}
        required
        value={state.username}
        className="validate"
        type="text"
        placeholder="Your username"
      />
      <input
        onChange={e => inputHandler("email")(e.target.value)}
        required
        value={state.email}
        className="validate"
        type="email"
        placeholder="Your email"
      />
      <select
        required
        value={state.country}
        onChange={e => inputHandler("country")(e.target.value)}
      >
        <option value="">Select country</option>
        {renderCountries()}
      </select>
      <input
        onChange={e => inputHandler("password")(e.target.value)}
        required
        value={state.password || ""}
        className="validate"
        type="password"
        placeholder="Your password"
      />
      <input
        onChange={e => inputHandler("password_repeat")(e.target.value)}
        required
        value={state.password_repeat || ""}
        className="validate"
        type="password"
        placeholder="Repeat password"
      />
      <button className="btn" type="submit">
        {buttonText}
      </button>
      <style jsx>{`
        .text-center {
          text-align: center;
        }
        form {
          display: flex;
          flex-direction: column;
          width: 20rem;
          margin: auto;
        }
        input {
          padding: 0.3rem;
        }
        .btn {
          margin-top: 0.5rem;
        }
        select {
          display: block;
        }
      `}</style>
    </form>
  );
}

export { UserForm };

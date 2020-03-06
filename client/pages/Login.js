import React, { useState, useContext } from "react";
import Loader from "react-loader-spinner";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/authContext";
import { withAuth } from "../HOC/withAuth";
import { getErrorMessage } from "../shared/helpers";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const router = useRouter();
  const { loginUser, loading } = useContext(AuthContext);

  const inputHandler = name => val => setState({ ...state, [name]: val });

  const submitHandler = async e => {
    e.preventDefault();
    try {
      await loginUser(state);
      toast.success("You are now logged in");
      router.push("/");
    } catch (err) {
      toast.error(getErrorMessage(err));
      console.dir(err);
    }
  };

  if (loading) {
    return <Loader color="green"></Loader>;
  }

  return (
    <div className="login">
      <h1 className="text-center">Login on our app</h1>
      <form onSubmit={submitHandler}>
        <input
          onChange={e => inputHandler("email")(e.target.value)}
          required
          value={state.email}
          className="validate"
          type="email"
          placeholder="Your email"
        />
        <input
          onChange={e => inputHandler("password")(e.target.value)}
          required
          value={state.password}
          className="validate"
          type="password"
          placeholder="Your password"
        />
        <button className="btn" type="submit">
          Login
        </button>
      </form>
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
      `}</style>
    </div>
  );
}

export default withAuth(Login, { authType: "guest" });

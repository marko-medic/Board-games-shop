import React, { useContext } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { AuthContext } from "../contexts/AuthContext";
import { withAuth } from "../HOC/withAuth";
import { UserForm } from "../components/UI/UserForm";
import { getErrorMessage } from "../shared/helpers";

function Register() {
  const router = useRouter();

  const { registerUser, loading } = useContext(AuthContext);

  const submitHandler = async userState => {
    try {
      await registerUser(userState);
      toast.success("You are registered successfully");
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
    <div className="register">
      <h1 className="text-center">Register on our app</h1>
      <UserForm submitCb={submitHandler} buttonText="Register"></UserForm>
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
    </div>
  );
}

export default withAuth(Register, { authType: "guest" });

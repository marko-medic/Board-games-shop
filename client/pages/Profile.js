import React, { useContext } from "react";
import { toast } from "react-toastify";
import { UserForm } from "../components/UserForm";
import { AuthContext } from "../contexts/authContext";
import { withAuth } from "../HOC/withAuth";
import { getErrorMessage } from "../shared/helpers";

function Profile() {
  const { updateUser, user } = useContext(AuthContext);

  const submitHandler = async userState => {
    try {
      await updateUser(userState);
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="profile">
      <h3>Profile page</h3>
      <strong className="mt-1">Change your profile info</strong>
      <UserForm
        nameDisabled
        submitCb={submitHandler}
        buttonText="Update"
        userState={user}
      />
      <style jsx>{`
        .profile {
          text-align: center;
        }
        mt-1 {
          margin-top: 1rem;
          display: block;
        }
      `}</style>
    </div>
  );
}

export default withAuth(Profile, { authType: "user" });

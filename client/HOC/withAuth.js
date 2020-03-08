import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";

function withAuth(WrappedComponent, authOptions) {
  return function(props) {
    const router = useRouter();
    const { isAdmin, isAuth } = useContext(AuthContext);
    const [isAuthLoaded, setIsAuthLoaded] = useState(false);

    useEffect(() => {
      setIsAuthLoaded(true);
    }, [isAuth]);

    useEffect(() => {
      if (!isAuthLoaded) return;

      if (authOptions.authType === "guest" && isAuth) {
        router.push("/");
      }

      if (authOptions.authType === "user" && !isAuth) {
        router.push("/");
        toast.error("You are not allowed to visit this page");
      }

      if (authOptions.authType === "admin" && !isAdmin) {
        toast.error("Only admins can visit this page");
        router.push("/");
      }
    }, [isAuthLoaded]);

    return <WrappedComponent {...props}></WrappedComponent>;
  };
}

export { withAuth };

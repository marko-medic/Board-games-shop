import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function SearchFilter() {
  const router = useRouter();
  const [state, setState] = useState("");

  useEffect(() => {
    setState(router.query.search || "");
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    let url = "/";
    if (state) {
      url += "?search=" + state;
    }
    router.push(url);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        value={state}
        onChange={e => setState(e.target.value)}
        type="text"
        placeholder="Search"
      />
      <button className="btn">Search</button>
      <style jsx>{`
        form {
          display: flex;
          width: 35%;
          margin: auto;
        }
      `}</style>
    </form>
  );
}

export { SearchFilter };

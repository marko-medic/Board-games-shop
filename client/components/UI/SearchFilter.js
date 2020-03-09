import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { storeAndGetUrlParams } from "../../shared/helpers";

function SearchFilter({ placeholderText = "Search" }) {
  const router = useRouter();
  const [state, setState] = useState("");

  useEffect(() => {
    setState(router.query.search || "");
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    const params = storeAndGetUrlParams(router.query, { search: state });
    router.push({
      pathname: router.pathname,
      search: `?${params.toString()}`
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        value={state}
        onChange={e => setState(e.target.value)}
        type="text"
        placeholder={placeholderText}
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

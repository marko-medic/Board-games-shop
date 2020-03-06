import React, { useRef } from "react";

function SearchFilter({ submitCb }) {
  const input = useRef();

  const submitHandler = e => {
    e.preventDefault();
    submitCb(input.current.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input ref={input} type="text" placeholder="Search" />
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

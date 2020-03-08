import React from "react";

function Footer() {
  return (
    <footer>
      <p>
        Powered by{" "}
        <a target="_blank" href="https://github.com/markorf">
          <strong>Marko</strong>
        </a>
      </p>
      <style jsx>
        {`
          footer {
            margin-top: 3rem;
            background: #26a69a;
            padding: 0.2rem;
            color: white;
            text-align: center;
          }
          strong {
            color: white;
            text-decoration: underline;
          }
        `}
      </style>
    </footer>
  );
}

export { Footer };

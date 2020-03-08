import React, { useState } from "react";

import { toast } from "react-toastify";
import { sendEmail } from "../services/userService";
import { GoogleMapElem } from "../components/Misc/GoogleMap";

function Contact() {
  const [state, setState] = useState({
    name: "",
    email: "",
    message: ""
  });

  const inputHandler = name => val => setState({ ...state, [name]: val });

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const resp = await sendEmail(state);
      toast.success(resp.data.message);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
    setState({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact">
      <h1 className="text-center">Contact us</h1>
      <form onSubmit={submitHandler}>
        <input
          onChange={e => inputHandler("name")(e.target.value)}
          required
          className="validate"
          type="text"
          placeholder="Your name"
        />
        <input
          onChange={e => inputHandler("email")(e.target.value)}
          required
          className="validate"
          type="email"
          placeholder="Your email"
        />
        <textarea
          onChange={e => inputHandler("message")(e.target.value)}
          required
          className="validate"
          placeholder="Your message"
        ></textarea>
        <button className="btn" type="submit">
          Submit message
        </button>
        <section className="location">
          <h4>Our location:</h4>
          <p>We are in Rumenacka Ulica in Novi Sad</p>
          <p>Contact number: 555-333</p>
        </section>
        <GoogleMapElem isMarkerShown />
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

export default Contact;

import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Loading from "./Loading";
import Nav from "./Nav";
import Footer from "./Footer";
import { Button } from "@chakra-ui/react";

const Contact = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    setIsEmpty(name === "" || email === "" || msg === "");
    console.log(isEmpty, name, email, msg);
  }, [name, email, msg]);

  const sendEmail = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    await emailjs
      .sendForm("hasznalthangszerek", "messagetemplate", form.current, {
        publicKey: "u8I9aEohwoXlxEDHy",
      })
      .then(
        () => {
          alert("Sikerült :)");
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        },
      );
    setIsLoading(false);
  };
  return (
    <div id="contact-page">
      <Nav />
      <div id="contact-div">
        {isLoading ? <Loading /> : <></>}
        <h1 id="contact-h1">ÜZENJEN NEKÜNK!</h1>
        <form id="contact-form" ref={form}>
          <label className="contact-label">Név</label>
          <input
            className="contact-input"
            type="text"
            name="user_name"
            placeholder="Név"
            onChange={(e) => setName(e.target.value)}
          />

          <label className="contact-label">Email</label>
          <input
            className="contact-input"
            type="text"
            name="user_email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="contact-label">Üzenet</label>
          <textarea
            className="contact-input"
            rows={5}
            name="message"
            placeholder="Ide írhat üzenetet . . ."
            onChange={(e) => setMsg(e.target.value)}
          />

          <Button
            onClick={sendEmail}
            id="contact-button"
            disabled={isEmpty}
            name="submit-button"
          >
            Küldés
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

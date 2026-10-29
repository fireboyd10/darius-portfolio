import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../App.css";
import { useLanguage } from "../LanguageContext";
import translations from "../translations";

function ContactForm() {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { language } = useLanguage();
  const copy = translations[language].form;

  const sendEmail = (event) => {
    event.preventDefault();

    const formData = new FormData(form.current);
    if (!formData.get("user_name") || !formData.get("user_email") || !formData.get("message")) {
      setStatus("required");
      return;
    }

    setIsSending(true);
    setStatus("sending");

    emailjs
      .sendForm(
        "service_0x62lb9",
        "template_fc71b9b",
        form.current,
        "oQIOJEzkJcr3Q5xdU"
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("success");
          form.current.reset();
        },
        (error) => {
          console.error(error.text);
          setStatus("error");
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div className="form-container">
      <form ref={form} onSubmit={sendEmail} aria-label={copy.label}>
        <div className="form-group">
          <label htmlFor="contact-name">{copy.name}</label>
          <input id="contact-name" type="text" name="user_name" />
        </div>
        <div className="form-group">
          <label htmlFor="contact-email">{copy.email}</label>
          <input id="contact-email" type="email" name="user_email" />
        </div>
        <div className="form-group">
          <label htmlFor="contact-message">{copy.message}</label>
          <textarea id="contact-message" name="message" />
        </div>
        <button type="submit" className="blue-button" disabled={isSending}>
          {isSending ? copy.sendingButton : copy.send}
        </button>
      </form>
      {status && <p className="status-message" role="status" aria-live="polite">{copy[status]}</p>}
    </div>
  );
}

export default ContactForm;

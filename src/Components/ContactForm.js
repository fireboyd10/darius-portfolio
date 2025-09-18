import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import "../App.css";

function ContactForm() {
  const form = useRef();
  const [status, setStatus] = useState(""); 
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    if (!formData.get("user_name") || !formData.get("user_email") || !formData.get("message")) {
      setStatus("⚠️ Please fill out all fields.");
      return;
    }

    setIsSending(true);
    setStatus("⏳ Sending...");

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
          setStatus("✅ Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error(error.text);
          setStatus("❌ Failed to send. Please try again.");
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div className="form-container">
      <form ref={form} onSubmit={sendEmail}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="user_name" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="user_email" />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea name="message" />
        </div>
        <button type="submit" className="blue-button" disabled={isSending}>
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

export default ContactForm;

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "../App.css";

function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_0x62lb9', 'template_fc71b9b', form.current, 'oQIOJEzkJcr3Q5xdU')
      .then((result) => {
        console.log(result.text);
        console.log("message sent");
      }, (error) => {
        console.log(error.text);
      });

    // Clear the form input fields after sending the message
    form.current.reset();
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
        <button type="submit" className="blue-button">Send</button>
      </form>
    </div>
  );
}

export default ContactForm;

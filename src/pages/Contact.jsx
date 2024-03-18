import React from "react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "react-bootstrap/Button";
import "./Contact.css";

import ImgEmail from "../assets/contact/email.png";
import ImgLocation from "../assets/contact/location.png";
import ImgPhone from "../assets/contact/phone.png";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //emailJS Properties
    const serviceId = "service_pm5jvch";
    const templateId = "template_aya9law";
    const publicKey = "DKy8FmaalhOn_JaU2";

    //Create a new object that contains dynamic template params
    const templateParams = {
      from_name: name,
      from_email: email,
      // to_name: "Cris Canon",
      message: message,
    };

    //sending email using emailJS
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        // console.log("email sent successfully!", response);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <div className="form">
      <div className="contact">
        <p>
          We value your feedback and are always here to help. Whether you have a
          question about any of our products including gaming laptops, desktop
          packages, graphic cards, prebuild desktops or need assistance with an
          order, our customer service team and tech experts are ready to assist
          you.
        </p>

        <p>
          To get in touch with us, please use the contact form below. We will
          respond to your inquiry as soon as possible. If you would prefer to
          speak with someone directly, please call us at the number provided.
          Our customer service hours are Monday-Saturday 9am-6pm PST.
        </p>
        <p>
          If you have a technical issue or need warranty support, please visit
          our support page, message us, email us at support@email.com You can
          also visit us in our store location.
        </p>
        <p>
          Thank you for choosing Us as your trusted tech expert and online
          computer store in the Philippines.
        </p>
      </div>
      <div className="container">
        <h1 className="text-center">Contact Us</h1>
        <div>
          <h6 className="img">
            <img src={ImgPhone} /> (083)123456, (63)9123456789
          </h6>

          <h6 className="img">
            <img src={ImgEmail} /> testemail@email.com
          </h6>
          <h6 className="img mb-2">
            <img src={ImgLocation} />
            Gen. Paulino Santos Drive, Koronadal City, 9506 South Cotabato,
            Philippines
          </h6>
        </div>
        <form onSubmit={handleSubmit} className="emailForm">
          <input
            className="text mb-2"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="text mb-2"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <textarea
            className="message mb-4"
            placeholder="Message"
            cols="30"
            rows="10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <Button className="mb-4" variant="primary" type="submit">
            Send Email
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

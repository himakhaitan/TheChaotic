import React, { useState, Fragment } from "react";
import validator from "validator";
import classes from "./Contact.module.css";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { BiErrorCircle } from "react-icons/bi";
import axios from "axios";
import varibles from "../../config/variables";
import Overlay from "../../components/UI/Overlay/Overlay";
const InputContact = (props) => {
  return (
    <div>
      <input
        className={classes.formInput}
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.changeFunc}
        placeholder={props.placeholder}
      />
      {props.error && <BiErrorCircle className={classes.inputIcon} />}
      {!props.error && props.value && (
        <HiOutlineCheckCircle className={classes.inputIcon} />
      )}
    </div>
  );
};

const ContactForm = () => {
  const [messageState, setMessageState] = useState({
    active: false,
    messasge: "",
  });
  const [email, setEmail] = useState({
    error: false,
    errorMessage: "",
    value: "",
  });
  const [name, setName] = useState({
    error: false,
    errorMessage: "",
    value: "",
  });
  const [message, setMessage] = useState({
    error: false,
    errorMessage: "",
    value: "",
  });

  const onEmailChange = (event) => {
    if (!validator.isEmail(event.target.value)) {
      setEmail((prev) => {
        return {
          ...prev,
          error: true,
          value: event.target.value,
        };
      });
    } else {
      setEmail((prev) => {
        return {
          ...prev,
          error: false,
          value: event.target.value,
        };
      });
    }
  };
  const onNameChange = (event) => {
    if (!validator.isLength(event.target.value, { min: 3 })) {
      setName((prev) => {
        return {
          ...prev,
          error: true,
          value: event.target.value,
        };
      });
    } else {
      setName((prev) => {
        return {
          ...prev,
          error: false,
          value: event.target.value,
        };
      });
    }
  };
  const onMessageChange = (event) => {
    if (!validator.isLength(event.target.value, { min: 10, max: 200 })) {
      setMessage((prev) => {
        return {
          ...prev,
          error: true,
          value: event.target.value,
        };
      });
    } else {
      setMessage((prev) => {
        return {
          ...prev,
          error: false,
          value: event.target.value,
        };
      });
    }
  };
  const nullifyInput = () => {
    setEmail((prev) => {
      return {
        ...prev,
        error: false,
        value: "",
      };
    });
    setName((prev) => {
      return {
        ...prev,
        error: false,
        value: "",
      };
    });
    setMessage((prev) => {
      return {
        ...prev,
        error: false,
        value: "",
      };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const toBeSentData = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    const response = await axios.post(
      `${varibles.serverURL}/connect/form/submit`,
      toBeSentData
    );
    if (response) {
      setMessageState({
        active: true,
        message: response.data.message,
      });
    }
  };
  const closeFunc = () => {
    setMessageState({
      active: false,
      message: "",
    });
    nullifyInput();
  };
  return (
    <Fragment>
      <form action="" onSubmit={submitHandler}>
        <InputContact
          id="name"
          type="text"
          value={name.value}
          changeFunc={onNameChange}
          placeholder="Name"
          error={name.error}
        />
        <InputContact
          id="email"
          type="email"
          value={email.value}
          changeFunc={onEmailChange}
          placeholder="E-mail Address"
          error={email.error}
        />
        <InputContact
          id="message"
          type="textArea"
          value={message.value}
          changeFunc={onMessageChange}
          placeholder="Your Message"
          error={message.error}
        />
        <input
          className={classes.submit}
          disabled={
            email.error ||
            email.value.length === 0 ||
            name.error ||
            name.value.length === 0 ||
            message.error ||
            message.value.length === 0
          }
          type="submit"
          value="Submit"
        />
        {messageState.active && <Overlay onClick={closeFunc} message={messageState.message} />}
      </form>
    </Fragment>
  );
};
export default ContactForm;

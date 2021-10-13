import React, { useState } from "react";
import SimpleInput from "../../../components/UI/Input/Simple";
import FileInput from "../../../components/UI/Input/FileInput";
import LargeInput from "../../../components/UI/Input/LargeInput";
import classes from "./helper.module.css";
import validator from "validator";
import Submit from "../../../components/UI/Input/Submit";
import axios from "axios";
import variable from "../../../config/variables";
import Overlay from "../../../components/UI/Overlay/Overlay";
import { useDispatch } from "react-redux";
import { essentialAction } from "../../../store/slice/essential";

const AuthorCreate = () => {
  const dispatch = useDispatch();
  const [result, setResult] = useState({
    status: false,
    message: null,
  });
  const closehandler = () => {
    setResult({
      status: false,
      message: null,
    });
  };
  const [name, setName] = useState("");
  const [description, setDescription] = useState({
    description: "",
    error: false,
    errorMessage: null,
  });
  const [file, setFile] = useState({
    file: null,
    error: false,
    errorMessage: null,
  });
  const [socials, setSocials] = useState({
    linkedin: "",
    facebook: "",
    instagram: "",
    github: "",
  });
  const [socialsErrors, setSocialsErrors] = useState({
    linkedin: false,
    facebook: false,
    instagram: false,
    github: false,
  });
  const resetState = () => {
    setName("");
    setFile({
      file: null,
      error: false,
      errorMessage: null,
    });
    setDescription({
      description: "",
      error: false,
      errorMessage: null,
    });
    setSocialsErrors({
      linkedin: false,
      facebook: false,
      instagram: false,
      github: false,
    });
    setSocials({
      linkedin: "",
      facebook: "",
      instagram: "",
      github: "",
    });
  };
  const socialOnChange = (event) => {
    setSocials((prev) => {
      return {
        ...prev,
        [`${event.target.id}`]: event.target.value,
      };
    });
    if (!validator.isURL(event.target.value)) {
      setSocialsErrors((prev) => {
        return {
          ...prev,
          [`${event.target.id}`]: true,
        };
      });
    } else {
      setSocialsErrors((prev) => {
        return {
          ...prev,
          [`${event.target.id}`]: false,
        };
      });
    }
  };
  const socialsData = [
    {
      label: "Instagram URL",
      value: socials.instagram,
      onChange: socialOnChange,
      error: socialsErrors.instagram,
      errorMessage: "Must be a URL!",
      id: "instagram",
    },
    {
      label: "Linkedin URL",
      value: socials.linkedin,
      onChange: socialOnChange,
      error: socialsErrors.linkedin,
      errorMessage: "Must be a URL!",
      id: "linkedin",
    },
    {
      label: "GitHub URL",
      value: socials.github,
      onChange: socialOnChange,
      error: socialsErrors.github,
      errorMessage: "Must be a URL!",
      id: "github",
    },
    {
      label: "Facebook URL",
      value: socials.facebook,
      onChange: socialOnChange,
      error: socialsErrors.facebook,
      errorMessage: "Must be a URL!",
      id: "facebook",
    },
  ];
  const fileChange = (event) => {
    if (event.target.files[0].size > 1048576) {
      setFile({
        file: event.target.files[0],
        error: true,
        errorMessage: "File must be less than 1Mb",
      });
    } else {
      setFile({
        file: event.target.files[0],
        error: false,
        errorMessage: null,
      });
    }
  };
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const descChangeHandler = (event) => {
    if (event.target.value.length < 10 || event.target.value > 100) {
      setDescription({
        description: event.target.value,
        error: true,
        errorMessage: "Description must be 10 to 100 char long!",
      });
    } else {
      setDescription({
        description: event.target.value,
        error: false,
        errorMessage: null,
      });
    }
  };
  const submitHandler = (event) => {
    dispatch(essentialAction.toggleSpinner());
    event.preventDefault();
    var formData = new FormData();
    formData.append("profileImg", file.file);
    formData.append("name", name);
    formData.append("desc", description.description);
    formData.append("instagram", socials.instagram);
    formData.append("linkedin", socials.linkedin);
    formData.append("facebook", socials.facebook);
    formData.append("github", socials.github);
    axios
      .post(`${variable.serverURL}/assist/author/create`, formData)
      .then(async (response) => {
        await setResult({
          status: true,
          message: response.data.message,
        });
        resetState();
        dispatch(essentialAction.toggleSpinner());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={classes.main}>
      <SimpleInput
        value={name}
        onChange={nameChangeHandler}
        label="Author Name"
        placeholder="Author Name"
        id="author"
      />
      <LargeInput
        value={description.description}
        label="Description"
        rows={3}
        error={description.error}
        id="description"
        errorMessage={description.errorMessage}
        onChange={descChangeHandler}
        placeholder="Description"
      />
      <FileInput
        accept=".jpg,.png,.webp,.jpeg"
        label="Profile Image"
        id="file"
        value={file.file}
        errorMessage={file.errorMessage}
        error={file.error}
        onChange={fileChange}
      />
      {socialsData.map((item, index) => {
        return (
          <SimpleInput
            key={index}
            value={item.value}
            onChange={item.onChange}
            label={item.label}
            error={item.error}
            errorMessage={item.errorMessage}
            placeholder={item.label}
            id={item.id}
          />
        );
      })}
      <Submit onClick={submitHandler} text="Submit" disabled={false} />
      {result.status && (
        <Overlay onClick={closehandler} message={result.message} />
      )}
    </div>
  );
};

export default AuthorCreate;

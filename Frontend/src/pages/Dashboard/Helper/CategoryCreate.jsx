import React, { useState } from "react";
import classes from "./helper.module.css";
import SimpleInput from "../../../components/UI/Input/Simple";
import LargeInput from "../../../components/UI/Input/LargeInput";
import Submit from "../../../components/UI/Input/Submit";
import { useDispatch } from "react-redux";
import variable from "../../../config/variables";
import axios from "axios";
import Overlay from "../../../components/UI/Overlay/Overlay";
import { essentialAction } from "../../../store/slice/essential";

const CategoryCreate = () => {
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
  const [description, setDescription] = useState({
    description: "",
    error: false,
    errorMessage: null,
  });
  const [name, setName] = useState("");
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const resetState = () => {
    setName("");
    setDescription({
      description: "",
      error: false,
      errorMessage: null,
    });
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
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(essentialAction.toggleSpinner());
    const data = {
      name,
      desc: description.description,
    };
    axios
      .post(`${variable.serverURL}/assist/category/create`, data)
      .then(async (response) => {
        await setResult({
          status: true,
          message: response.data.message,
        });
        if (response.data.success) {
          resetState();
        }
        dispatch(essentialAction.toggleSpinner());
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
  };
  return (
    <div className={classes.main}>
      <SimpleInput
        value={name}
        onChange={nameChangeHandler}
        label="Category Name"
        placeholder="Category Name"
        id="category"
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
      <Submit onClick={submitHandler} text="Submit" disabled={false} />
      {result.status && (
        <Overlay onClick={closehandler} message={result.message} />
      )}
    </div>
  );
};

export default CategoryCreate;

import React, { useState, useEffect } from "react";
import SimpleInput from "../../../components/UI/Input/Simple";
import FileInput from "../../../components/UI/Input/FileInput";
import Dropdown from "../../../components/UI/Input/Dropdown";
import LargeInput from "../../../components/UI/Input/LargeInput";
import classes from "./helper.module.css";
import Submit from "../../../components/UI/Input/Submit";
import axios from "axios";
import variable from "../../../config/variables";
import Overlay from "../../../components/UI/Overlay/Overlay";
import { useDispatch } from "react-redux";
import { essentialAction } from "../../../store/slice/essential";

const BlogCreate = () => {
  const dispatch = useDispatch();
  const [overlay, setOverlay] = useState({
    on: false,
    message: null,
  });
  const overlayClose = () => {
    setOverlay({
      on: false,
      message: null,
    });
  };
  const [preData, setPreData] = useState({ authors: [], categories: [] });
  useEffect(() => {
    dispatch(essentialAction.toggleSpinner());
    const fetchData = async () => {
      const authorsData = await axios.get(
        `${variable.serverURL}/assist/author/all`
      );
      const categories = await axios.get(
        `${variable.serverURL}/assist/category/all`
      );

      setPreData({
        authors: authorsData.data.authors,
        categories: categories.data.categories,
      });
    };
    fetchData();
    dispatch(essentialAction.toggleSpinner());
  }, [dispatch]);
  const [title, setTitle] = useState("");
  const tilteChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const [file, setFile] = useState({
    file: null,
    error: false,
    errorMessage: null,
  });
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
  const [content, setContent] = useState({
    content: "",
    error: false,
    errorMessage: null,
  });

  const contentChangeHandler = (event) => {
    if (event.target.value.length < 100) {
      setContent({
        content: event.target.value,
        error: true,
        errorMessage: "Content must be atleast 100 char long!",
      });
    } else {
      setContent({
        content: event.target.value,
        error: false,
        errorMessage: null,
      });
    }
  };
  const [tags, setTags] = useState("");
  const tagsChangeHandler = (e) => {
    setTags(e.target.value);
  };
  const [author, setAuthor] = useState();
  const [category, setCategory] = useState();

  const resetInput = () => {
    setTitle("");
    setFile({
      file: null,
      error: false,
      errorMessage: null,
    });
    setContent({
      content: "",
      error: false,
      errorMessage: null,
    });
    setTags("");
    setAuthor(null);
    setCategory(null);
  };
  const submitHandler = async (e) => {
    console.log(author, category);
    e.preventDefault();
    dispatch(essentialAction.toggleSpinner());
    var formData = new FormData();
    formData.append("BlogImage", file.file);
    formData.append("title", title);
    formData.append("content", content.content);
    formData.append("tags", tags);
    formData.append("author", author);
    formData.append("category", category);
    const response = await axios.post(
      `${variable.serverURL}/blog/post/new`,
      formData
    );
    if (response.data) {
      setOverlay({
        on: true,
        message: response.data.message,
      });
      if (response.data.success) {
        resetInput();
      }
    }
    dispatch(essentialAction.toggleSpinner());
  };
  return (
    <div className={classes.main}>
      <SimpleInput
        value={title}
        onChange={tilteChangeHandler}
        label="Blog Title"
        placeholder="Blog Title"
        id="title"
      />
      <FileInput
        accept=".jpg,.png,.webp,.jpeg"
        label="Title Image"
        id="file"
        value={file.file}
        errorMessage={file.errorMessage}
        error={file.error}
        onChange={fileChange}
      />
      <LargeInput
        value={content.content}
        label="Blog Content"
        rows={5}
        error={content.error}
        id="content"
        errorMessage={content.errorMessage}
        onChange={contentChangeHandler}
        placeholder="Blog Content"
      />

      <Dropdown
        data={preData.authors}
        id="authors"
        label="Author"
        value={author}
        onChange={setAuthor}
        placeholder="Select Author"
      />
      <Dropdown
        value={category}
        onChange={setCategory}
        data={preData.categories}
        id="categories"
        label="Category"
        placeholder="Select Category"
      />
      <SimpleInput
        value={tags}
        onChange={tagsChangeHandler}
        label="Tags"
        placeholder="Seperate them with (,)"
        id="tags"
      />
      <Submit onClick={submitHandler} text="Submit" disabled={false} />
      {overlay.on && (
        <Overlay onClick={overlayClose} message={overlay.message} />
      )}
    </div>
  );
};

export default BlogCreate;

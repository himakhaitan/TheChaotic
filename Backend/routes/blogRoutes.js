const upload = require("../middlewares/upload");
const fs = require("fs");
const router = require("express").Router();
const blogValidator = require("../validation/blogValidator");

// Models
const Blog = require("../models/Blog");
const Author = require("../models/Author");
const Category = require("../models/Category");

/*
Method  : POST
Route   : /blog/post/new
Access  : Private
*/
router.post("/post/new", upload.single("BlogImage"), async (req, res) => {
  // Checking Data Validity
  const { errors, isValid } = blogValidator(req.body);

  //   Sending Response if the Data is InValid
  if (!isValid) {
    fs.unlinkSync("uploads\\" + req.file.filename);
    return res.json({
      success: false,
      errors,
    });
  }
  // Finding Author
  const author = Author.findById(req.body.author);

  if (!author) {
    errors.author = "Author Not Find!";
    return res.json({
      success: false,
      errors,
    });
  }

  // Finding Category

  const category = Category.findById(req.body.category);

  if (!category) {
    errors.category = "Category not Found!";
    return res.json({
      success: false,
      errors,
    });
  }

  // Processing Tags
  const tags = req.body.tags.split(",").map((item) => {
    return item.trim().toLowerCase();
  });

  //   Crating Final Data
  const submitData = {
    title: req.body.title,
    content: req.body.content,
    image: {
      data: fs.readFileSync("uploads\\" + req.file.filename),
      contentTyps: req.file.mimetype,
    },
    author,
    likes: 0,
    category,
    tags,
  };
  console.log(submitData);
});

module.exports = router;

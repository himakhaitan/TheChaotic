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
Func    : Create New Blog
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
    fs.unlinkSync("uploads\\" + req.file.filename);
    return res.json({
      success: false,
      errors,
    });
  }

  // Finding Category

  const category = Category.findById(req.body.category);

  if (!category) {
    errors.category = "Category not Found!";
    fs.unlinkSync("uploads\\" + req.file.filename);
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
    author: req.body.author,
    likes: 0,
    category: req.body.category,
    tags,
  };
  const newBlog = await new Blog(submitData);

  if (!newBlog) {
    fs.unlinkSync("uploads\\" + req.file.filename);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }

  const savedBlog = await newBlog.save();

  if (!savedBlog) {
    fs.unlinkSync("uploads\\" + req.file.filename);
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
  fs.unlinkSync("uploads\\" + req.file.filename);

  return res.json({
    savedBlog: savedBlog.id,
  });
});


/*
Method  : GET
Route   : /blog/post/:id
Access  : Public
Func    : Fetch Blog using ID
*/
router.get("/post/:id", async (req, res) => {
  const id = req.params.id;

  const data = await Blog.findOne({id: id});
  console.log(data);
  if (!data) {
    return res.json({
      success: false,
      message: "No blog Available!",
    });
  }

  return res.json({
    success: true,
    message: "Blog Found!",
    blog: data
  });
});

module.exports = router;

const upload = require("../middlewares/upload");
const fs = require("fs");
const passport = require("passport");
const router = require("express").Router();
const blogValidator = require("../validation/blogValidator");
const mongoose = require("mongoose");
const commentValidator = require("../validation/commentValidator");
const superheros = require("superheroes");

// Models

const Blog = require("../models/Blog");
const Author = require("../models/Author");
const Category = require("../models/Category");

/*
Method  : POST
Route   : /blog/post/comment/:id
Access  : Public
Func    : POST comment on a Blog
*/
router.post("/post/comment/:id", async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      success: false,
      message: "Invalid Blog ID!",
    });
  }
  const { errors, isValid } = commentValidator(req.body);
  if (!isValid) {
    return res.json({
      success: false,
      message: errors.comment,
    });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.json({
      success: false,
      message: "Blog Not Found!",
    });
  }
  superheros.all;
  const data = {
    author: superheros.random(),
    text: req.body.comment,
  };
  blog.comments.push(data);

  const savedBlog = await blog.save();
  if (!savedBlog) {
    return res.json({
      success: false,
      message: "Internal Server Error!",
    });
  }
  return res.json({
    success: true,
    message: "Comment Made!",
    comments: savedBlog.comments,
  });
});

/*
Method  : POST
Route   : /blog/post/new
Access  : Private
Func    : Create New Blog
*/
router.post(
  "/post/new",
  passport.authenticate("jwt", { session: false }),
  upload.single("BlogImage"),
  async (req, res) => {
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
        contentType: req.file.mimetype,
      },
      author: mongoose.Types.ObjectId(req.body.author),
      likes: 0,
      category: mongoose.Types.ObjectId(req.body.category),
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
      success: true,
      blog: savedBlog,
      message: "Blog Created",
    });
  }
);

/*
Method  : GET
Route   : /blog/post/:id
Access  : Public
Func    : Fetch Blog using ID
*/
router.get("/post/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      success: false,
      message: "Invalid Blog ID!",
    });
  }
  const data = await Blog.findOne({ _id: id }).populate("author");
  if (!data) {
    return res.json({
      success: false,
      message: "No blog Available!",
    });
  }

  return res.json({
    success: true,
    message: "Blog Found!",
    blog: data,
  });
});

/*
Method  : GET
Route   : /blog/post/:id/like
Access  : Public
Func    : Like Blog with ID
*/

router.get("/post/:id/like", async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      success: false,
      message: "Invalid Blog ID!",
    });
  }
  let blog = await Blog.findById(id);
  blog.likes = +blog.likes + 1;
  let blogSave = await blog.save();
  if (!blogSave) {
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
  return res.json({
    success: true,
    message: "Blog Liked!",
    blogID: blogSave.id,
  });
});

/*
Method  : GET
Route   : /blog/post/:id/like
Access  : Public
Func    : Like Blog with ID
*/

router.get("/post/:id/like", async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      success: false,
      message: "Invalid Blog ID!",
    });
  }
  let blog = await Blog.findById(id);
  blog.likes = +blog.likes - 1;
  let blogSave = await blog.save();
  if (!blogSave) {
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
  return res.json({
    success: true,
    message: "Blog Unliked!",
    blogID: blogSave.id,
  });
});

/*
Method  : GET
Route   : /blog/all
Access  : Public
Func    : Fetch All Blogs
*/
router.get("/all", async (req, res) => {
  const blogs = await Blog.find({});

  if (!blogs || blogs.length === 0) {
    return res.json({
      success: false,
      message: "No Blogs Found!",
    });
  }

  return res.json({
    success: true,
    message: "Blogs Found!",
    blogs,
  });
});

/*
Method  : GET
Route   : /blog/category/:id
Access  : Public
Func    : Fetch All Blogs of a Category
*/
router.get("/category/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      success: false,
      message: "Invalid Category ID!",
    });
  }

  const blogs = await Blog.find({ category: id }).populate("author");
  if (!blogs || blogs.length === 0) {
    return res.json({
      success: false,
      message: "No Blogs Found!",
    });
  }

  return res.json({
    success: true,
    message: "Blogs Found!",
    blogs,
  });
});

/*
Method  : GET
Route   : /blog/author/:id
Access  : Public
Func    : Fetch All Blogs of an Author
*/
router.get("/author/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({
      success: false,
      message: "Invalid Author ID!",
    });
  }

  const blogs = await Blog.find({ author: id })
    .populate("category.name")
    .populate("author.name");
  if (!blogs || blogs.length === 0) {
    return res.json({
      success: false,
      message: "No Blogs Found!",
    });
  }

  return res.json({
    success: true,
    message: "Blogs Found!",
    blogs,
  });
});

/*
Method  : GET
Route   : /blog/tags/:tag
Access  : Public
Func    : Fetch Blogs through Tag
*/

router.get("/tags/:tag", async (req, res) => {
  let tag = req.params.tag;
  tag = tag.toLowerCase();
  const blogs = await Blog.find({ tags: { $in: [`${tag}`] } }).populate(
    "author"
  );
  if (!blogs || blogs.length == 0) {
    return res.json({
      success: false,
      message: "No Blogs Found!",
    });
  }
  return res.json({
    success: true,
    message: "Blogs Found!",
    blogs,
  });
});

/*
Method  : GET
Route   : /blog/:sort/:limit
Access  : Public
Func    : Get Sorted Blogs According :sort
*/
router.get("/:sort/:limit", async (req, res) => {
  let { sort, limit } = req.params;
  const blogs = await Blog.find(
    {},
    [
      "title",
      "content",
      "image",
      "category",
      "likes",
      "comments",
      "published",
      "author",
    ],
    {
      limit: +limit,
      sort: {
        [sort]: -1,
      },
    }
  ).populate("author", "name");
  if (!blogs) {
    return res.json({
      success: false,
      message: "Blogs Found!",
    });
  }
  return res.json({
    success: true,
    message: "Blogs Found!",
    blogs,
  });
});

/*
Method  : GET
Route   : /blog/:year/:month/all
Access  : Public
Func    : Fetch All Blogs according to duration
*/

router.get("/:year/:month/all", async (req, res) => {
  const { year, month } = req.params;
  const blogs = await Blog.find({
    published: {
      $gte: new Date(+year, +month, 30),
      $lte: new Date(+year, +month, 1),
    },
  });
  // if (!blogs || blogs.length == 0) {
  //   return res.json({
  //     success: false,
  //     message: "No blogs Found!",
  //   });
  // }
  res.json({
    success: true,
    message: "Blogs Found",
    blogs,
  });
});

module.exports = router;

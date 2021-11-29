const express = require("express");
const router = express.Router();
const upload = require("../../server");

const auth = require("../../middleware/auth");

const Post = require("../../models/Post");

//GET /api/posts
//gets posts
//access public
router.get("/", (req, res) => {
  Post.find({})
    .sort({ date: -1 })
    .then((posts) => res.json(posts));
});

//GET /api/posts/images/:imageId
//gets posts
//access public
router.get("/images/:filename", (req, res) => {
  req.app.locals.gfs.files.findOne(
    { filename: req.params.filename },
    (err, file) => {
      // File exists ?
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exists",
        });
      }

      // Image ?
      if (
        file.contentType === "image/jpeg" ||
        file.contentType === "image/png"
      ) {
        const readstream = req.app.locals.gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        return res.status(404).json("Not an image");
      }
    }
  );
});

//POST /api/posts
//posts post
//access private
router.post("/", auth, upload.single("file"), (req, res) => {
  const newPost = new Post({
    head: req.body.head,
    body: req.body.body,
    user: req.body.user,
    comments: req.body.comments,
    fileId: req.file.filename,
  });

  newPost.save().then((post) => res.json(post));
});

//POST /api/posts
//posts post
//access private
router.put("/:id", auth, (req, res) => {
  const newComment = {
    user: req.body.user,
    body: req.body.comment,
  };

  Post.findById(req.params.id)
    .then((post) => {
      post.comments.push(newComment);
      post.save().then((post) =>
        Post.find({})
          .sort({ date: -1 })
          .then((posts) => res.json(posts))
      );
    })
    .catch(() => res.json({ success: false }));
});

//DELETE /api/posts
//deletes post
//access private
router.delete("/:id", auth, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      req.app.locals.gfs.remove(
        { filename: post.fileId, root: "uploads" },
        (err, gridStore) => {
          if (err) {
            return res.status(404).json({ err: err });
          }
        }
      );

      post.remove().then(() => res.json({ success: true }));
    })
    .catch(() => res.json({ success: false }));
});

module.exports = router;

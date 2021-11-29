const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const methodOverride = require("method-override");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

const app = express();

//Express bodyparser
app.use(express.json());

//Mongo db setup
const db = config.get("mongoURI");

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((err) => console.log(err));

const conn = mongoose.connection;

// Initialize gridfs
let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  app.locals.gfs = gfs;
});

// Storage engine
const storage = new GridFsStorage({
  url: config.get("mongoURI"),
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

module.exports = upload;

//Use routes
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

//Port setup and listening
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

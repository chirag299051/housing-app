const {
  addListing,
  fetchData,
  editListing,
} = require("../Controllers/UserController");
const router = require("express").Router();

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: "./images/",
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, callback) => {
  let pattern = /jpg|png|svg/;
  if (pattern.test(path.extname(file.originalname))) {
    callback(null, true);
  } else {
    callback("Error: not a valid file");
  }
};

let upload = multer({
  storage,
  fileFilter,
  limits: { fieldSize: 10 * 1024 * 1024 },
});

router.get("/", fetchData);
router.post("/add", upload.single("file"), addListing);
router.put("/edit/:id", editListing);

module.exports = router;

const {
  addListing,
  fetchData,
  editListing,
} = require("../Controllers/UserController");
const router = require("express").Router();
const multer = require("multer");

const storage = new multer.memoryStorage();
const upload = multer({
  storage,
});

router.get("/", fetchData);
router.post("/add", upload.single("file"), addListing);
router.put("/edit/:id", upload.single("file"), editListing);

module.exports = router;

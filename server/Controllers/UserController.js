const Listing = require("../Models/Listing");
const cloudinary = require("cloudinary").v2;
const sample =
  "https://res.cloudinary.com/dxfhu6m44/image/upload/v1694257010/houseSample.webp";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

module.exports.fetchData = async (req, res, next) => {
  try {
    const data = await Listing.find();

    res.status(200).json({ message: "data fetched successfully", data });
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports.addListing = async (req, res, next) => {
  try {
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);

      const listing = await Listing.create({
        ...req.body,
        img: cldRes.secure_url,
      });
      res
        .status(200)
        .json({ message: "Data added successfully", listing, cldRes });
    } else {
      const listing = await Listing.create({
        ...req.body,
        img: sample,
      });
      res
        .status(200)
        .json({ message: "Data added successfully", listing, sample });
    }
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
};

module.exports.editListing = async (req, res, next) => {
  try {
    const id = req.params.id;
    let data = req.body;

    if (req.file) {
      console.log("req.file ", req.file);
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);
      console.log("I:", cldRes);

      data = { ...data, img: cldRes.secure_url };

      const updatedListing = await Listing.findByIdAndUpdate(id, data, {
        new: true,
      });
      res
        .status(200)
        .json({ message: "data updated successfully", updatedListing });
    } else {
      const updatedListing = await Listing.findByIdAndUpdate(id, data, {
        new: true,
      });
      res
        .status(200)
        .json({ message: "data updated successfully", updatedListing });
    }
  } catch (error) {
    console.log(error);
  }
};

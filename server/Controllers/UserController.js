const fs = require("fs");
const path = require("path");
const Listing = require("../Models/Listing");

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
    // First Check image is available or not in Payload.
    if (!req.file) {
      const filePath = path.join(__dirname, "../images/house2.jpeg");
      fs.readFile(filePath, async (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error reading the image file.");
        }
        console.log("DATA: ", data);
        const base64Image = Buffer.from(data).toString("base64");

        // Adding Mimetype to it.
        const base64ImageWithMimeType = `data:image/jpeg;base64,${base64Image}`;

        // Create a new listing document and store the base64-encoded image data
        const listing = await Listing.create({
          ...req.body,
          img: base64ImageWithMimeType,
        });
        res.status(200).json({ message: "Data added successfully", listing });
      });
      // return res.status(400).json({ message: "No file uploaded" });
    } else {
      fs.readFile(req.file.path, async (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error reading the image file.");
        }

        // Convert the image data to base64
        const base64Image = Buffer.from(data).toString("base64");

        // Adding Mimetype to it.
        const base64ImageWithMimeType = `data:${req.file.mimetype};base64,${base64Image}`;

        // Create a new listing document and store the base64-encoded image data
        const listing = await Listing.create({
          ...req.body,
          img: base64ImageWithMimeType,
        });
        res.status(200).json({ message: "Data added successfully", listing });
      });
      // Delete the temporary image file
      // fs.unlink(req.file.path, (err) => {
      //   if (err) console.error(err);
      // });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.editListing = async (req, res, next) => {
  try {
    const id = req.params.id;
    let data = req.body;
    console.log("id = " + req.params.id);
    console.log(data);

    // If there is any image
    // Then convert the image to 64
    // else simply update the data.
    if (req.file) {
      // Reading File
      fs.readFile(req.file.path, async (err, imageData) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error reading the image file.");
        }

        // Convert the image data to base64
        const base64Image = Buffer.from(imageData).toString("base64");

        // Adding Mimetype to it.
        const base64ImageWithMimeType = `data:${req.file.mimetype};base64,${base64Image}`;

        data = { ...data, img: base64ImageWithMimeType };

        const updatedListing = await Listing.findByIdAndUpdate(id, data, {
          new: true,
        });
        res
          .status(200)
          .json({ message: "data updated successfully", updatedListing });
      });
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

const fs = require("fs");
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
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Reading File
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

      // Delete the temporary image file
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error(err);
        }
      });

      res.status(200).json({ message: "Data added successfully", listing });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.editListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log(req.params);
    await Listing.findOneAndUpdate({ _id: id }, data);

    res
      .status(200)
      .json({ message: "data updated successfully", listing: data });
    next();
  } catch (error) {
    console.log(error);
  }
};

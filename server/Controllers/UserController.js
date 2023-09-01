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
    const data = req.file;
    console.log("data :", data);
    const listing = await Listing.create({ ...req.body, img: data.path });

    res.status(200).json({ message: "data added successfully", listing });
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports.editListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log(id);
    await Listing.findOneAndUpdate({ _id: id }, data);

    res
      .status(200)
      .json({ message: "data updated successfully", listing: data });
    next();
  } catch (error) {
    console.log(error);
  }
};

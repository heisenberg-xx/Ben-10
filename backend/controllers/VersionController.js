import asyncHandler from "../middlewares/asynHandler.js";
import asynHandler from "../middlewares/asynHandler.js";
import Version from "../models/VersionModel.js";

const createVersions = asynHandler(async (req, res) => {
  try {
    const { name, description, logo, omnitrixLogo } = req.body;

    const version = await new Version({
      name,
      description,
      logo,
      omnitrixLogo,
    }).save();
    res.json(version);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

const fetchAllVersions = asynHandler(async (req, res) => {
  try {
    const versions = await Version.find({}).select("_id name logo header");
    res.status(200).json(versions);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

const readVersion = asyncHandler(async (req, res) => {
  try {
    const version = await Version.findOne({
      $or: [{ _id: req.params.versionId }, { name: req.params.versionName }],
    });
    res.json(version);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});
const readVersionById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const version = await Version.findById(id);

    res.json(version);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

export { fetchAllVersions, createVersions, readVersion, readVersionById };

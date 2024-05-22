const Character = require("../models/Character");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


exports.check_post = asyncHandler(async (req, res, next) => {

  res.json({ title: "POST check" });
});
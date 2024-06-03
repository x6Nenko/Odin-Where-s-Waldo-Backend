const Character = require("../models/Character");
const Game = require("../models/Game");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


exports.check_post = asyncHandler(async (req, res, next) => {
  const selectedChar = req.body.selectedCharacter;
  const charData = await Character.findOne({name: selectedChar}).populate("game").exec();

  const coordX = charData.coordinates[0].x;
  const maxX = coordX + 0.02;
  const minX = coordX - 0.02;

  const coordY = charData.coordinates[0].y;
  const maxY = coordY + 0.02;
  const minY = coordY - 0.02;

  const pickedX = Math.floor(req.body.pickedPosition.x * 100) / 100;
  const pickedY = Math.floor(req.body.pickedPosition.y * 100) / 100;

  if (pickedX >= minX && pickedX <= maxX && pickedY >= minY && pickedY <= maxY) {
    return res.json({ match: true });
  } else {
    return res.json({ match: false });
  };

});

exports.wakeup_get = asyncHandler(async (req, res, next) => {
  return res.json({ msg: true });
});
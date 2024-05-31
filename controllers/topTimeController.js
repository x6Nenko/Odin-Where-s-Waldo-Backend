const Game = require("../models/Game");
const TopTime = require("../models/TopTime");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// TIMER
const formatTime = (totalMilliseconds) => {
  // const ms = (totalMilliseconds % 1000).toString().padStart(2, '0');
  const ms = (totalMilliseconds % 1000).toString().padStart(3, '0').slice(0, 2);
  const seconds = Math.floor((totalMilliseconds / 1000) % 60).toString().padStart(2, '0');
  const minutes = Math.floor((totalMilliseconds / 60000) % 60).toString().padStart(2, '0');
  const hours = Math.floor(totalMilliseconds / 3600000).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}:${ms}`;
};


let startTime;
let endTime;

exports.start_timer = asyncHandler(async (req, res, next) => {
  startTime = Date.now();
  console.log(formatTime(startTime));
  return res.json({ title: "start timer", time: formatTime(startTime) }); 
});

exports.end_timer = asyncHandler(async (req, res, next) => {
  endTime = Date.now();
  console.log(formatTime(endTime));
  return res.json({ title: "end timer", time: endTime, difference: formatTime(endTime - startTime) }); 
});

// TOP TIME
exports.alltt_get = asyncHandler(async (req, res, next) => {
  const allTopTimes = await TopTime.find().populate("game").exec();
  return res.json({ toptimes: allTopTimes }); 
});


exports.newtt_post = [
  body("username", "Username must be between 1 - 20 characters")
    .trim()
    .isLength({ min: 1, max: 20 })
    .escape(),
  body("toptime_client", "Can't be null")
    .trim()
    .escape(),
  body("toptime_server", "Can't be null")
    .trim()
    .escape(),
  body("game", "Can't be null")
    .trim()
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const gameData = await Game.findOne({name: req.body.game}).exec();

    // Create a user object with escaped and trimmed data.
    const toptime = new TopTime({ 
      username: req.body.username,
      time_client: req.body.toptime_client,
      time_server: req.body.toptime_server,
      game: gameData._id,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      res.status(400).json({
        msg: "Something is wrong",
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      await toptime.save();
      res.json({
        msg: "Top time saved"
      });
    }
  }),
];
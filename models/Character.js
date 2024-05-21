const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 50 },
  game: { type: Schema.Types.ObjectId, ref: "Game", required: true },
  coordinates: [{
    media_query: {type: String, required: true},
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  }]
});

CharacterSchema.virtual("url").get(function () {
  return `/character/${this._id}`;
});

// Export model
module.exports = mongoose.model("Character", CharacterSchema);
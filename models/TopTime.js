const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TopTimeSchema = new Schema({
  username: { type: String, required: true, minLength: 1, maxLength: 20 },
  game: { type: Schema.Types.ObjectId, ref: "Game", required: true },
  time_client: { type: String, required: true},
  time_server: { type: String, required: true},
}, { timestamps: true });

TopTimeSchema.virtual("url").get(function () {
  return `/toptime/${this._id}`;
});

// Export model
module.exports = mongoose.model("toptime", TopTimeSchema);
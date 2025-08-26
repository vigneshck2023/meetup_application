const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, enum: ["Online", "Offline"], required: true },
    image: { type: String },
    description: { type: String, required: true },
    venue: { type: String, required: true },
    price: { type: Number, default: 0 },
    speakers: [
      {
        name: String,
        designation: String,
        image: String,
      },
    ],
    tags: [String],
    additionalInfo: String,
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
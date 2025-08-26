const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db/db.connect");

const app = express();
app.use(cors());
app.use(express.json());

initializeDatabase();

// root test route
app.get("/", (req, res) => {
  res.send("✅ Meetup Backend is running!");
});

// Example event route
const Event = require("./models/event.models");
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

module.exports = app; // required for Vercel

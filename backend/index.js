const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { initializeDatabase } = require("../db/db.connect");
const Event = require("../models/event.model");

const app = express();

app.use(cors());
app.use(express.json());

// Connect Database (only once)
initializeDatabase();

// Routes
app.get("/", (req, res) => {
  res.send("✅ Meetup Backend running on Vercel!");
});

app.get("/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

app.post("/events", async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ error: "Failed to create event" });
  }
});

// Export app for Vercel
module.exports = app;

const express = require("express");
const cors = require("cors");

const { initializeDatabase } = require("./db/db.connect");
const Event = require("./models/event.models");

const app = express();
app.use(cors());
app.use(express.json());

// connect database
initializeDatabase();

// root test route
app.get("/", (req, res) => {
  res.send("🚀 Meetup Backend is running locally!");
});

// ---------------- CREATE EVENT ----------------
app.post("/events", async (req, res) => {
  try {
    if (!req.body.title || !req.body.date || !req.body.venue) {
      return res
        .status(400)
        .json({ error: "Title, date, and venue are required" });
    }
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
});

// ---------------- READ ALL EVENTS ----------------
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// ---------------- READ EVENT BY ID ----------------
app.get("/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

// ---------------- UPDATE EVENT ----------------
app.put("/events/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Failed to update event" });
  }
});

// ---------------- DELETE EVENT ----------------
app.delete("/events/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Failed to delete event" });
  }
});

// ---------------- LISTEN LOCALLY ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

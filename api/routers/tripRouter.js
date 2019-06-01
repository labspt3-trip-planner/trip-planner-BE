const router = require("express").Router();

const db = require("../../database/trips/tripsHelper.js");

router.post("/", async (req, res) => {
  const trip = req.body;
  try {
    if (trip.destination && trip.name && trip.planner) {
      const tripId = await db.addTrip(trip);
      console.log(tripId);
      const returnTrip = await db.getTripById(tripId);
      console.log(returnTrip);
      res.status(201).json(returnTrip);
    } else {
      res.status(400).json({ err: "Destination, name, and planner required" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const trip = await db.getTripById(id);
    if (trip) {
      res.status(200).json(trip);
    } else {
      res.status(404).json({ error: "Trip not found" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "There was a problem processing your request" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const updated = await db.updateTrip(id, changes);
    console.log(updated);
    if (updated._writeTime) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({ err: "Trip not found" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err: "There was a problem processing your request" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.removeTrip(id);
    const trip = await db.getTripById(id);
    console.log(trip);
    if (trip) {
      res.status(400).json(trip);
    } else {
      res.status(200).json(trip);
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err: "There was a problem processing your request" });
  }
});

module.exports = router;

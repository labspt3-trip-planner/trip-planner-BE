const router = require("express").Router();

const trip = require("../../database/trips/tripsHelper.js");
const dest = require("../../database/destinations/destinationHelper.js");

router.post("/", async (req, res) => {
  const trip = req.body;
  try {
    if (trip.destination && trip.name && trip.planner) {
      const tripId = await trip.addTrip(trip);
      console.log(tripId);
      const returnTrip = await trip.getTripById(tripId);
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
    const result = await trip.getTripById(id);
    const whereTo = await result.destinations
      .get()
      .then(res => res.data())
      .catch(err => console.log(err));
    if (result) {
      res.status(200).json({ ...result, destinations: whereTo });
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
    const updated = await trip.updateTrip(id, changes);
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
router.put("/:tripId/destinations", async (req, res) => {
  const destination = req.body;
  const id = req.params.tripId;
  try {
    const isItThere = await dest.getByName(destination.name);
    if (isItThere) {
      await trip.appendDestination(id, isItThere);
      res.status(201).json({ message: "Destination set" });
    } else {
      const newDest = await dest.add(destination);
      const success = await trip.appendDestination(id, newDest);
      res.status(201).json({ message: "Destination added and set" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await trip.removeTrip(id);
    const trip = await trip.getTripById(id);
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

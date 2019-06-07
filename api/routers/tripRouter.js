const router = require("express").Router();

const { trip, dest, list } = require("../../database");

//add a trip
router.post("/", async (req, res) => {
  const addition = req.body;
  try {
    if (addition.destination && addition.name && addition.planner) {
      const tripId = await trip.addTrip(addition);
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

//get trip by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await trip.getTripById(id);
    console.log(result);

    if (result) {
      const whereTo = [];
      for (i of result.destinations) {
        let gotIt = await dest.getById(i.id);
        whereTo.push({ name: gotIt.name, destId: i.id });
      }
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

//edit trip by id
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

//Add destination to a trip
router.put("/:tripId/destinations", async (req, res) => {
  const destination = req.body;
  const id = req.params.tripId;
  try {
    //check if destination is in collecttion
    const isItThere = await dest.getByName(destination.name);
    if (isItThere) {
      //add existing dest doc reference to destinations array
      await trip.appendDestination(id, isItThere);
      res.status(201).json({ message: "Destination set" });
    } else {
      //add destination to collection, and then add reference to destinations array
      const newDest = await dest.add(destination);
      const success = await trip.appendDestination(id, newDest);
      res.status(201).json({ message: "Destination added and set" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//add list item to trip
router.post("/:tripId/lists", async (req, res) => {
  const { tripId } = req.params;
  const item = req.body;

  try {
    const added = await list.addItem(tripId, item);
    console.log("Added :", added);
    res.status(201).json(added);
  } catch (err) {
    res
      .status(500)
      .json({ err: "There was a problem processing your request" });
  }
});

//get all list items for trip
router.get("/:tripId/lists", async (req, res) => {
  const { tripId } = req.params;
  try {
    const everything = await list.getAllItems(tripId);
    console.log(everything);
    res.status(200).json(everything);
  } catch (err) {
    res
      .status(500)
      .json({ err: "There was a problem processing your request" });
  }
});

//remove destination from trip
router.delete("/:tripId/destinations", async (req, res) => {
  const destination = req.body;
  const id = req.params.tripId;
  try {
    const removed = await trip.removeDestination(tripId, destination);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//delete trip
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

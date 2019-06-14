const router = require("express").Router();

const { trip, dest, list } = require("../../database");

router.post("/", async (req, res) => {
  const { destination, name, planner } = req.body;
  //checks for required fields
  if (destination && name && planner) {
    try {
      //checks to see if destination exists in collection
      const getDest = await dest.getByName(destination);
      //gets reference to existing document and adds it to post object
      if (getDest) {
        const tripId = await trip.addTrip({
          name,
          planner,
          destinations: [getDest]
        });
        res.status(201).json(tripId);
      } else {
        //adds new destination to collection, and gets reference to add to post object
        const newDest = await dest.add({ name: destination });
        const tripId = await trip.addTrip({
          name,
          planner,
          destinations: [newDest]
        });
        res.status(201).json(tripId);
      }
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ err: "There was a problem processing your request" });
    }
  } else
    res
      .status(400)
      .json({ err: "Please include name, destination, and planner" });
});

//get trip by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await trip.getTripById(id);
    console.log(result);

    if (result) {
      const whereTo = [];
      if (Array.isArray(result.destinations)) {
        for (i of result.destinations) {
          let gotIt = await dest.getById(i.id);
          whereTo.push({ name: gotIt.name, destId: i.id, geo: gotIt.geo });
        }
      } else whereTo.push(result.destinations);
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
//get all items by list name
router.get("/:tripId/lists/:listName", async (req, res) => {
  const { tripId, listName } = req.params;
  try {
    const getEm = await list.getByListName(tripId, listName);
    if (getEm) {
      res.status(200).json(getEm);
    } else {
      res.status(404).json({ err: "No list by that name" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ err: "There was a problem processing your request" });
  }
});

//edit list item
router.put("/:tripId/lists/:itemId", async (req, res) => {
  const { tripId, itemId } = req.params;
  const changes = req.body;

  try {
    const edited = await list.editItem(tripId, itemId, changes);
    console.log(edited);
    if (!edited) {
      res.status(404).json({ err: "Item not found" });
    } else {
      res.status(201).json(1);
    }
  } catch (err) {
    res
      .status(500)
      .json({ err: "There was a problem processing your request" });
  }
});

//delete list item
router.delete("/:tripId/lists/:itemId", async (req, res) => {
  const { tripId, itemId } = req.params;

  try {
    await list.removeItem(tripId, itemId);
    const stillThere = await list.getById(tripId, itemId);
    console.log(stillThere);
    if (!stillThere) {
      res.status(200).json(1);
    } else {
      res.status(400).json(0);
    }
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

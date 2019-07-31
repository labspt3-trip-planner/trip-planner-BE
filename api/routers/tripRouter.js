const router = require("express").Router();

const restricted = require("../../firebase/auth/authMiddleware");
const { trip, dest, list } = require("../../database");

// router.post("/", async (req, res) => {
//   const { destination, name, planner } = req.body;
//   //checks for required fields
//   if (destination && name && planner) {
//     try {
//       //checks to see if destination exists in collection
//       const getDest = await dest.getByName(destination);
//       //gets reference to existing document and adds it to post object
//       if (getDest) {
//         const tripId = await trip.addTrip({
//           name,
//           planner,
//           destinations: [getDest]
//         });
//         res.status(201).json(tripId);
//       } else {
//         //adds new destination to collection, and gets reference to add to post object
//         const newDest = await dest.add({ name: destination });
//         const tripId = await trip.addTrip({
//           name,
//           planner,
//           destinations: [newDest]
//         });
//         res.status(201).json(tripId);
//       }
//     } catch (err) {
//       console.log(err);
//       res
//         .status(500)
//         .json({ err: "There was a problem processing your request" });
//     }
//   } else
//     res
//       .status(400)
//       .json({ err: "Please include name, destination, and planner" });
// });

//new add trip endpoint
// Add new trip to DB 'trips' collection
router.post("/", restricted, async (req, res) => {
  try {
    const planner = req.body.uid;
    const {
      tripName,
      destinations,
      startDate,
      endDate,
      participants
    } = req.body;
    const newTrip = {
      tripName,
      destinations,
      startDate,
      endDate,
      planner,
      participants,
      favorites: [],
      packing: [],
      todos: []
    };
    const addedTrip = await trip.addTrip(newTrip);
    console.log(addedTrip);
    res.status(201).json({ "New trip id": addedTrip });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err: "There was a problem processing your request" });
  }
});

//get trip by ID
router.get("/:id", restricted, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await trip.getTripById(id);
    console.log(result);

    if (result) {
      res.status(200).json(result);
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
router.put("/:id", restricted, async (req, res) => {
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
      res.status(201).json({ success });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//add todo item to todo list
router.post("/:tripId/todos", async (req, res) => {
  const { tripId } = req.params;
  const todo = req.body;

  try {
    const added = await list.addTodo(tripId, todo);
    console.log("Added todo: ", added);
    res.status(201).json({ message: "succesful addition" });
  } catch (err) {
    console.log("router.put todos: ", err);
    res
      .status(500)
      .json({ message: "There is a problem processing request", error: err });
  }
});

//add packing item to packing list
router.post("/:tripId/packing", async (req, res) => {
  const { tripId } = req.params;
  const pack = req.body;

  try {
    const added = await list.addPacking(tripId, pack);
    console.log("Added packing: ", added);
    res.status(201).json({ message: "succesful addition" });
  } catch (err) {
    console.log("router.put packing: ", err);
    res
      .status(500)
      .json({ message: "There is a problem processing request", error: err });
  }
});

//edit todo list done status
router.put("/:tripId/:list", async (req, res) => {
  const { tripId } = req.params;
  const listType = req.params.list;
  try {
    if (listType === "todos") {
      const todo = req.body;
      const edited = await list.checkTodo(tripId, todo);
      console.log("edit todo success: ", edited);
      res.status(201).json({ message: "edit successful" });
    } else if (listType === "packing") {
      const pack = req.body;
      const edited = await list.checkPacking(tripId, pack);
      console.log("edit packing success: ", edited);
      res.status(201).json({ message: "edit successful" });
    } else {
      res.status(404).json({ message: "List doesn't exist" });
    }
  } catch (err) {
    console.log("Edit list ep: ", err);
    res.status(500).json({ message: "wrong", err });
  }
});

//delete todo list item in trip
router.delete("/:tripId/todos", async (req, res) => {
  const { tripId } = req.params;
  const todo = req.body;

  try {
    const updated = await list.removeTodo(tripId, todo);
    console.log("Updated todo: ", updated);
    res.status(200).json({ message: "Updated" });
  } catch (err) {
    console.log("delete todos endpoint: ", err);
    res.status(500).json({ message: "Processing Error", err: err });
  }
});

//delete packing list item in trip
router.delete("/:tripId/packing", async (req, res) => {
  const { tripId } = req.params;
  const pack = req.body;

  try {
    const updated = await list.removePacking(tripId, pack);
    console.log("Updated packing: ", updated);
    res.status(200).json({ message: "Updated" });
  } catch (err) {
    console.log("delete packing endpoint: ", err);
    res.status(500).json({ message: "Processing Error", err: err });
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

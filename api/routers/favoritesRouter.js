const router = require("express").Router();

const { fave } = require("../../database");

//post favorite data from frontend to trip favorites array
router.post("/:tripId", async (req, res) => {
  const favorite = req.body;
  const { tripId } = req.params;
  try {
    if (favorite.geometry.location) {
      const added = await fave.add(favorite);
      console.log("added: ", added);
      await fave.addToTrip(tripId, added);
      res.status(201).json({ id: added });
    } else res.status(400).json({ error: "Please provide a location" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const favorite = await fave.getById(id);
    if (favorite) {
      res.status(200).json(favorite);
    } else {
      res.status(404).json({ err: "Could not find favorite" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { favId } = req.body;
  try {
    const favorited = await fave.addToUser(userId, favId);
    res.status(201).json(favorited);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Could not process request" });
  }
});

router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { favId } = req.body;
  try {
    const deleted = await fave.delFromUser(userId, favId);
    res.status(201).json(deleted);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Could not process request" });
  }
});

module.exports = router;

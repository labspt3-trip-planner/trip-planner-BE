const router = require("express").Router();

const db = require("../../database/trips/tripsHelper.js");

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

module.exports = router;

const router = require("express").Router();

const fave = require("../../database/favorites/faveHelpers.js");

router.post("/", async (req, res) => {
  const favorite = req.body;
  try {
    const added = await fave.add(favorite);
    console.log(added);
    res.status(201).json({ id: added });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const favorite = await fave.getById(id);
    console.log("Favorite: ", favorite);
    res.status(200).json(favorite);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;

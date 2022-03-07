const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

// create the new user.
router.post("/add", userController.createUser);

// Get all the user present in the database.
router.get("/fetch-all", userController.fetchAll);

// Update a user using userId.
router.put("/update/:userId", userController.update);

// Delete a user using userId
router.delete("/delete/:userId", userController.delete);

module.exports = router;

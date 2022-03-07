const express = require("express");
const router = express.Router();
const rewardController = require("../controller/reward");

// Create the service including details.
router.post("/service", rewardController.services);

// Add the reward in already created service model using service-name.
router.post("/add/:serviceId", rewardController.addReward);

// Fetch all the rewards with details
router.get("/fetch-all-reward", rewardController.fetchReward);

module.exports = router;

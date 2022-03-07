const File = require("../models/reward");

exports.services = async (req, res) => {
  try {
    let arrLength = req.body.length;
    let totalReward,
      rewardFormula,
      x = 10,
      y = 1;

    for (let i = 0; i < arrLength; i++) {
      let serviceName = req.body[i].serviceName;
      let serviceDescription = req.body[i].serviceDescription;
      if (serviceName === "xyz") {
        rewardFormula = "x * y";
        totalReward = x * y;
      } else if (serviceName === "abc") {
        rewardFormula = "2 * (x + y)";
        totalReward = 2 * (x + y);
      } else if (serviceName === "pqr") {
        rewardFormula = "x + y";
        totalReward = x + y;
      }

      const userReward = new File({
        serviceName,
        serviceDescription,
        serviceRewardTotal: totalReward,
        serviceRewardFormula: rewardFormula,
      });

      const data = await userReward.save();
      if (!data) {
        res.send("userReward not saved");
      }
    }
    res.status(200).json({ message: "saved successfully" });
  } catch (err) {
    res.send(err);
  }
};

exports.addReward = async (req, res) => {
  try {
    const serviceName = req.body.serviceName;
    let totalReward;
    let x = 10,
      y = 1;

    const file = await File.findOne({ _id: req.params.serviceId });
    const reward = file.serviceRewardTotal;
    if (!file) {
      res.send("service not found");
    }

    if (serviceName === "xyz") {
      totalReward = x * y;
    } else if (serviceName === "abc") {
      totalReward = 2 * (x + y);
    } else if (serviceName === "pqr") {
      totalReward = x + y;
    }

    file.serviceRewardTotal = reward + totalReward;
    const data = await file.save();
    if (!data) {
      res.send("totalReward not updated");
    }
    res.status(200).json({ message: "updated success", service: data });
  } catch (err) {
    res.send(err);
  }
};

exports.fetchReward = async (req, res) => {
  try {
    const rewardData = await File.find();
    if (!rewardData) {
      res.send("No data found");
    }
    res.status(200).json({ message: "Fetched success", rewards: rewardData });
  } catch (err) {
    res.send(err);
  }
};

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const BetslipStake = require("../models/BetslipStake");

// @route       GET api/betslip
// @desc        Get all betslip stakes
// @access      Private
router.get("/", auth, async (req, res) => {
    try {
        const betslipStakes = await BetslipStake.find({
            user: req.user.id,
        }).sort({ date: -1 });
        res.json(betslipStakes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route       POST api/betslip
// @desc        Add new betslip-stake
// @access      Private
router.post("/", auth, async (req, res) => {
    console.log("Ответ из тела:", req.body);
    const { betslipMatches, expressIsActivated, stakeDescriptions } = req.body;

    try {
        const newBetslip = new BetslipStake({
            betslipMatches,
            expressIsActivated,
            stakeDescriptions,
            user: req.user.id,
        });

        const betslip = await newBetslip.save();

        res.json(betslip);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;

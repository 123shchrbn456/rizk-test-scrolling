const mongoose = require("mongoose");

const BetslipStakeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    betslipMatches: {
        type: Array,
        required: true,
    },
    stakeDescriptions: {
        type: Array,
        required: true,
    },
    expressIsActivated: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Betslip-stake", BetslipStakeSchema);

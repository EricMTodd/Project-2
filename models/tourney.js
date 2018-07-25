console.log("tourneys.js is running...");


// Required npm modules
const mongoose = require("mongoose");


// Required schema for tournaments
const tourneySchema = mongoose.Schema({
	name: String,
	capacity: Number,
	fighters: []
});

tourneySchema.methods.runTourney = () => {
	console.log("ROUND START");
};

module.exports = mongoose.model("Tourney", tourneySchema);
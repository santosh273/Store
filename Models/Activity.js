const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
    username : String,
    id : String,
    title : String,
    activity : String
});

const Activity = mongoose.model("activity",ActivitySchema);

module.exports = Activity;
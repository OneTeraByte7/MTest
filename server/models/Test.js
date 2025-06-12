
// For test model 
const mongoose = require("mongoose");
const testSchema = new mongoose.Schema ({
    title: {type:String, required:true},
    description: { type:String},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    createdAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model("Test", testSchema);
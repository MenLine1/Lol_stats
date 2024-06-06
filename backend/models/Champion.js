const mongoose = require('mongoose');

const ChampionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    win_rate: { type: Number, required: true },
    pick_rate: { type: Number, required: true }
});

module.exports = mongoose.model('Champion', ChampionSchema);
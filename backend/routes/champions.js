const express = require('express');
const router = express.Router();
const Champion = require('../models/Champion');

router.get('/', async (req, res) => {
    const champions = await Champion.find();
    res.json(champions);
});

router.post('/', async (req, res) => {
    const champion = new Champion(req.body);
    await champion.save();
    res.status(201).json(champion);
});

router.put('/:id', async (req, res) => {
    await Champion.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: 'Champion updated successfully' });
});

router.delete('/:id', async (req, res) => {
    await Champion.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Champion deleted successfully' });
});

module.exports = router;
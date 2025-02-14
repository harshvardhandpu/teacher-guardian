const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

router.post('/send', async (req, res) => {
    const { sender, receiver, content } = req.body;
    try {
        const message = new Message({ sender, receiver, content });
        await message.save();
        res.status(201).json({ message: 'Message sent' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:userId/:contactId', async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.params.userId, receiver: req.params.contactId },
                { sender: req.params.contactId, receiver: req.params.userId }
            ]
        }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

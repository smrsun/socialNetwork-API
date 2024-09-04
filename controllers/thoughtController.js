const { Thought, User } = require('../models');

module.exports = {
     async getThought(req, res) {
        try {
            const thoughts = await Thought.find().populate('thought');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
     async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate('thought')

        if(!thought) {
            return res.status(404).json({ message: 'No thought found.'});
        }
         res.status(200).json(thought);  
        } catch (err) {
        res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch(err) {
            res.status(500).json(err)
        }
    }
}

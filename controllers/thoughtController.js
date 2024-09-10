const { Thought, User } = require('../models');

module.exports = {
    
  async getThought(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought found.' });
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      const currentUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id }},
        { new: true }
      )

      if(!currentUser) {
        res.status(403).json({ msg: "User not found"})
      }

      res.status(200).json(thought);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      // Also remove the thoughts from the User
      const currentUser = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId}},
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, { $set: req.body }, { new: true });
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try {
      const reactions = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body }},
        { new: true }
      )

      res.status(200).json(reactions);
    } catch(err) {
      res.status(500).json(err);
      
    }
  },
  async removeReaction(req, res) {
    try {
      const reactions = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId }}},
        { new: true }
      )
  
      res.status(200).json(reactions);
    } catch(err) {
      res.status(500).json(err);
      
    }    
  }

};


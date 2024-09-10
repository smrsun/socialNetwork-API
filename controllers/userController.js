const { Thought, User } = require('../models');

module.exports = {
  async getUser(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'No user with that Id' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      
      res.status(200).json(user);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    console.log('Request: ', req.params);
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      
      await Thought.deleteMany({ _id: { $in: user.thought } });
      res.json({ message: 'User and thoughts are deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidator: true, new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId }},
        { new: true }
      )

      res.status(200).json(friend);
    } catch(err) {
      res.status(500).json(err);
      
    }
  },
  async removeFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId }},
        { new: true }
      )
  
      res.status(200).json(friend);
    } catch(err) {
      res.status(500).json(err);
      
    }    
  }
};

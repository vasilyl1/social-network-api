const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single user
    getSingleUser(req, res) {
        User.findOne(
            { _id: req.params.userId }
        ).populate('thoughts')
            .populate('friends')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that id' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a single user
    async deleteSingleUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) { // no user has been found
                res.status(404).json({ message: 'No user found with that id' });
            } else {
                const thought = await Thought.deleteMany({ _id: { $in: user.thoughts } });
                if (!thought) { // no thoughts have been found
                    res.status(200).json({ message: 'User successfully deleted' });
                } else {
                    res.status(200).json({ message: 'User and associated thoughts successfully deleted' });
                }
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update single user
    updateSingleUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that id' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    // Add friend to user
    async addFriend(req, res) {
        try {
            const friend = await User.findOne({ _id: req.params.friendId });
            const user = await User.findOne({ _id: req.params.userId });
            /*const alreadyFriend = await User.findOne(
                {$and: [{_id: req.params.userId}, {'req.params.friendId': { $in: user.friends.ObjectId}}] }
                );*/
            let alreadyFriend = false;
            if (user.friendCount > 0) { alreadyFriend = user.friends.find(element => element._id == req.params.friendId);}
            if (!friend || !user || alreadyFriend || req.params.friendId == req.params.userId) { // user not found, friend not found or already friends
                if (req.params.friendId == req.params.userId) {
                    return res.status(500).json({ message: 'Can not assign the friend relation to the same user' });
                } else if (alreadyFriend) {
                    return res.status(500).json({ message: 'Friends relationship is already present' });
                } else {
                    return res.status(404).json({ message: 'No such user or friend - check IDs' });
                }
            } else { // update friend to the user
                const userUpdated = await User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $addToSet: { friends: req.params.friendId } },
                    { new: true }
                );
                return res.json(userUpdated);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete friend from user
    async deleteFriend(req, res) {
        try {
            const friend = await User.findOne({ _id: req.params.friendId });
            const user = await User.findOne({ _id: req.params.userId });
            let alreadyFriend = false;
            if (user.friendCount > 0) { alreadyFriend = user.friends.find(element => element._id == req.params.friendId);};
            if (!friend || !user || !alreadyFriend) { // user not found, friend not found or not friends
                return res.status(404).json({ message: 'Can not modify friend relation' });
            } else { // update friend to the user
                const userUpdated = await User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $pull: { friends: req.params.friendId } },
                    { new: true },
                );
                return res.json(userUpdated);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

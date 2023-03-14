const { Thought } = require('../models');
module.exports = {
    // Create reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            };
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            );
            if (!reaction) { return res.status(500).json({ message: 'Could not add reaction to the thought' }); }
            return res.json(reaction);

        } catch (err) { res.status(500).json(err); }
    },
    // Delete reaction from thought
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            const reaction = await Thought.findOne({ 'reactions._id' : req.params.reactionId });
            if (!thought || !reaction) { // thought not found or reaction not found
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID found' })
                    : res.status(500).json({ message: 'Thought does not have reaction with that ID' });
                return;
            } else { // update thought with deleted reaction
                const thoughtUpdated = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $pull: { reactions: { _id: req.params.reactionId } } },
                    { new: true }
                );
                return res.json(thoughtUpdated);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
}
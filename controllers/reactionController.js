const { User, Thought } = require('../models');
module.exports = {
    // Create reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID'});
            };
            thought.reactions.push(req.body);
            const reaction = await thought.updateOne({_id: req.params.thoughtId }, thought);
            if (!reaction) { return res.status(404).json({ message: 'Could not add reaction to the thought' }); }
            return res.json(reaction);
        } catch (err) { res.status(500).json(err); }
    },
     // Delete reaction from thought
     async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            const reaction = thought.reactions.find(element => element._id == req.params.reactionId );
            if (!thought || !reaction) { // thought not found or reaction not found
                return res.status(404).json({ message: 'Can not delete reaction from thought' });
            } else { // update friend to the user
                const thoughtUpdated = await Thought.updateOne(
                    { _id: req.params.thoughtId }, 
                    { reactions: thought.reactions._id.splice(thought.reactions._id.indexOf(req.params.reactionId),1) }
                    );
                return res.json(thoughtUpdated);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
}
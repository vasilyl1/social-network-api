const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Update thought
    updateThought(req, res) {
        Thought.updateOne({ _id: req.params.thoughtId }, req.body)
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete thought
    deleteThought(req, res) {
        Thought.deleteOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create thought
    async createThought(req, res) {
        try {
            const user = await User.findOne({_id: thought.userId });
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID'});
            };
            const thought = await Thought.create(req.body);
            user.thoughts.push(thought);
            const updatedUser = User.updateOne({_id: thought.userId }, user);
            if (!updatedUser) { return res.status(404).json({ message: 'Could not update the user thought' }); }
            return res.json(thought);
        } catch (err) { res.status(500).json(err); }
    },
}
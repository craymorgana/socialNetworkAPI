const { User, Thought } = require("../models");
const dateFormat = require("../utils/dateFormat");

const thoughtsController = {
	getThoughts(req, res) {
		Thought.find()
			.then((thought) => res.json(thought))
			.catch((err) => res.status(500).json(err));
	},

	// Get a single thought
	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.select("-__v")
			.then((thought) =>
				!thought
					? res.status(404).json({ message: "No user with that ID" })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	// create a new thought
	createThought(req, res) {
		const { thoughtText, username } = req.body;

		Thought.create({ thoughtText, username })
			.then((thoughtData) => {
				return User.findOneAndUpdate(
					{ username },
					{ $push: { thoughts: thoughtData._id } },
					{ new: true }
				);
			})
			.then((userData) => {
				if (!userData) {
					return res
						.status(404)
						.json({ message: "No user found with this username!" });
				}
				res.json({ message: "Thought created successfully!" });
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	updateThought(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res.status(404).json({ message: "No thought with this id!" })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},

	// delete a thought
	deleteThought(req, res) {
		Thought.findOneAndDelete({ _id: req.params.thoughtId })
			.then((thought) => {
				if (!thought) {
					res.status(404).json({ message: "No thought with that ID" });
				}
				return User.findOneAndUpdate(
					{ _id: req.body.userId },
					{ $pull: { thoughts: thought._id } },
					{ new: true }
				);
			})
			.then(() => res.json({ message: "Thought deleted!" }))
			.catch((err) => res.status(500).json(err));
	},

	addReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $addToSet: { reactions: req.body } },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res.status(404).json({ message: "No thought found with this Id" })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},

	deleteReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: { reactionId: req.params.reactionId } } },
			{ new: true }
		)
			.then((thought) => {
				if (!thought) {
					return res
						.status(404)
						.json({ message: "No thought found with this Id" });
				}
				res.json(thought);
			})
			.catch((err) => res.status(500).json(err));
	},
};

module.exports = thoughtsController;

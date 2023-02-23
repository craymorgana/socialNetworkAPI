const { User, Thought } = require("../models");

module.exports = {
	// Get all users
	getUsers(req, res) {
		User.find()
			.select("-__v")
			.then((users) => res.json(users))
			.catch((err) => res.status(500).json(err));
	},
	// Get a single user
	getSingleUser(req, res) {
		User.findOne({ _id: req.params.userId })
			.select("-__v")
			.then((user) =>
				!user
					? res.status(404).json({ message: "No user with that ID" })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	// create a new user
	createUser(req, res) {
		User.create(req.body)
			.then((user) => res.json(user))
			.catch((err) => res.status(500).json(err));
	},
	// delete a user
	deleteUser(req, res) {
		User.findOneAndRemove({ _id: req.params.userId })
			.then((user) =>
				!user
					? res.status(404).json({ message: "No user with that ID" })
					: Thought.findOneAndUpdate(
							{ user: req.params.userId },
							{ $pull: { user: req.params.userId } },
							{ new: true }
					  )
			)
			.then((thought) =>
				!thought
					? res.status(404).json({
							message: "User deleted, but no thoughts found",
					  })
					: res.json({
							message: "User and thought have been successfully deleted",
					  })
			)
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	updateUser(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((user) => {
				!user
					? res.status(404).json({ message: "No user with this Id" })
					: res.json(user);
			})
			.catch((err) => res.status(500).json(err));
	},
};

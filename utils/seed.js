const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
	console.log("connected");

	await connection.dropDatabase();
	console.log('Database Dropped');

	const userSeeds = [
		{
			username: "user1",
			email: "user1@email.com",
			thoughts: [],
			friends: [],
		},
		{
			username: "user2",
			email: "user2@email.com",
			thoughts: [],
			friends: [],
		},
	];
	const thoughtSeeds = [
		{
			thoughtText: "Thought 1",
			username: "user1",
			reactions: [],
		},
		{
			thoughtText: "Thought 2",
			username: "user2",
			reactions: [],
		},
	];
	const reactionSeeds = [
		{
			reactionBody: "Reaction 1",
			username: "user1",
		},
		{
			reactionBody: "Reaction 2",
			username: "user2",
		},
	];

	const users = await User.insertMany(userSeeds);

	const thoughts = [];
	for (let i = 0; i < thoughtSeeds.length; i++) {
	  const thought = await Thought.create(thoughtSeeds[i]);
	  thoughts.push(thought);
  
	  const userId = users[i]._id;
	  const user = await User.findByIdAndUpdate(
		userId,
		{ $push: { thoughts: thought._id } },
		{ new: true }
	  );
	}

	for (let i = 0; i < reactionSeeds.length; i++) {
		const thoughtId = thoughts[i]._id;
		const reaction = await Thought.findByIdAndUpdate(
			thoughtId,
			{ $push: { reactions: reactionSeeds[i] } },
			{ new: true }
		);
	}

	console.info("Seeding complete! 🌱");
	process.exit(0);
});

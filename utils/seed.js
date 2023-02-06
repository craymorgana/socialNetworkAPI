const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
	console.log("connected");

	await User.deleteMany({});
	await Thought.deleteMany({});
	await Reaction.deleteMany({});

	const userSeed = [{ username: "user1", email: "test@email.com" }];
	const thoughtSeed = [
		{ thoughtText: "This is thought text 1", username: "user1" },
	];
	const reactionSeed = [{ reactionBody: "Like", username: "user1" }];

    await User.collection.insertMany(userSeed);
    await Thought.collection.insertMany(thoughtSeed);
    await Reaction.collection.insertMany(reactionSeed);

    console.info('Seeding complete! 🌱');
    process.exit(0);
});

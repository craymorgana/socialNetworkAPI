const { Schema, model, default: mongoose } = require("mongoose");
const { Thought } = require('./Thought')

// Schema to create User model
const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
	},
	{
		email: {
			type: String,
			unique: true,
			required: true,
			match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
		},
	},
	{
		thoughts: [
			{
				type: mongoose.Types.ObjectId,
				ref: Thought,
			},
		],
	},
	{
		friends: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
	.virtual("friendCount")
	// Getter
	.get(function () {
		return this.friends.length;
	});

// Initialize our User model
const User = mongoose.model("User", userSchema);

module.exports = User;

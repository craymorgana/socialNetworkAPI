const { Schema, model, default: mongoose } = require("mongoose");

const reactionSchema = new mongoose.Schema(
	{
		reactionId: {
			type: mongoose.Types.ObjectId,
            default: mongoose.Types.ObjectId
		},
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
		username: {
            type: String,
			required: true,
		},
        createdAt: {
            type: Date,
            default: Date.now,
            //
        },
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

reactionSchema.virtual("formattedDate").get(function () {
	return this.createdAt.toLocaleDateString();
});

const Reaction = mongoose.model("Reaction", reactionSchema)

module.exports = Reaction;

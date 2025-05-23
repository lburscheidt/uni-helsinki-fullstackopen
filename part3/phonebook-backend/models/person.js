const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
	.connect(url)
	.then((result) => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message);
	});

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: [true, "Name required"],
	},
	number: {
		type: String,
		minLength: [8, "Number too short"],
		required: [true, "User phone number required"],
		validate: {
			validator: (v) => /^(\d{2}|\d{3})-(\d{4,})/.test(v),
			message: (props) => `${props.value} is not a valid phone number!`,
		},
	},
});

personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		returnedObject._id = undefined;
		returnedObject.__v = undefined;
	},
});

module.exports = mongoose.model("Person", personSchema);

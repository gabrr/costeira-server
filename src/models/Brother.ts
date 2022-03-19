import mongoose from "mongoose"

const brotherSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	isTalker: {
		type: Boolean,
		required: true,
	},
	fieldGroup: {
		type: String,
		required: true,
	},
	isElder: {
		type: Boolean,
		required: true,
	},
	isVideoSupporter: {
		type: Boolean,
		required: true,
	},
})

export default mongoose.model('brothers', brotherSchema)
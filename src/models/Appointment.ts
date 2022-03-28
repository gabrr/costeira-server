import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
	group: {
		type: String,
		required: true,
	},
	dateGroup: {
		type: String,
		required: true,
	},
	datetime: {
		type: String,
		required: true,
	},
	suffix: {
		type: String
	},
	bro1: {
		type: String,
	},
	bro2: {
		type: String,
	},
})

export default mongoose.model('Appointment', appointmentSchema)
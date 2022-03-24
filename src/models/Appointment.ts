import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
	dateGroup: {
		type: String,
		required: true,
	},
	datetime: {
		type: String,
		required: true,
	},

	bro1: {
		type: String,
	},
	bro2: {
		type: String,
	},
})

export default mongoose.model('Appointment', appointmentSchema)
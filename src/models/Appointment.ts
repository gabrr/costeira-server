import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
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
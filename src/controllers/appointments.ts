import Appointments from 'models/Appointment'
import { Request, Response } from 'express'
import { dateHelper } from 'utils/date'

class AppointmentController {
	async index(req: Request, res: Response ) {
		try {
			const appointments = await Appointments.find()
			return res.json(appointments)

		} catch (error: any) {
			return res.status(400).json(error.message)
		}
  }

	async getByMonth(req: Request, res: Response ) {
		try {
			const date = new Date(`${req.params.year}/${req.params.month}`)
			const group = req.params.group
			const isDateStringValid = !!date?.getDate() || false
			if (!isDateStringValid) throw Error('It should be a valid date string')

			const search = await Appointments
				.find({ group, dateGroup: date.toLocaleDateString('pt', { month: '2-digit', year: 'numeric' })})

			return res.json(search)

		} catch (error: any) {
			return res.status(400).json(error.message)
		}
	}

	async getMonthObject(req: Request, res: Response ) {
		try {
			const date = new Date(req.body.date)
			const isDateStringValid = !!date?.getDate() || false
			if (!isDateStringValid) throw Error('It should be a valid date string')

			const search = await Appointments
				.findOne({ datetime: new Date(date).toISOString() })

			if (search) return res.json("Months have been already created.")

			const newAppointments = await Appointments.create(dateHelper(date).createMonth())
			return res.json(newAppointments)

		} catch (error: any) {
			return res.status(400).json(error.message)
		}
	}

	async setAppointment(req: Request, res: Response ) {
		try {
			const { appointmentId, group } = req.params
			const { bro1, bro2 } = req.body

			if (!!!appointmentId || typeof appointmentId !== 'string') return res.json('Appointment ID must be provided.')
			
			const result = await Appointments.findOneAndUpdate({ _id: appointmentId, group }, { bro1, bro2 }, { new: true })

			return res.json(result)

		} catch (error: any) {
			return res.status(400).json(error.message)
		}
	}

}

export default new AppointmentController()
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

		async createMonth(req: Request, res: Response ) {
			try {
				const date = new Date(req.body.date)
				const isDateStringValid = date.getDate() || false
				if (!isDateStringValid) throw Error('It should be a valid date string')

				dateHelper(new Date()).isLastSunday()

			} catch (error: any) {
				return res.status(400).json(error.message)
			}
	}

}

export default new AppointmentController()
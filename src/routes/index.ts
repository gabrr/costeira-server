import express from "express"

import appointmentsController from 'controllers/appointments'
import brothersController from 'controllers/brothers'


const routes = express.Router()

// Appointments
routes.get('/api/v1/appointments', appointmentsController.index)
routes.get('/api/v1/appointments/year/:year/month/:month/group/:group', appointmentsController.getByMonth)
routes.post('/api/v1/appointments/get-month-object', appointmentsController.getMonthObject)
routes.patch('/api/v1/appointments/:appointmentId/group/:group', appointmentsController.setAppointment)

// Brothers
routes.get('/api/v1/brothers', brothersController.index)
routes.post('/api/v1/brother', brothersController.addBrother)
routes.post('/api/v1/brothers', brothersController.addBrothers)

export default routes 
import Brothers from 'models/Brother'
import { Request, Response } from 'express'
import { IBrother } from '_types/brother'
import Brother from 'models/Brother'

class BrotherController {
    async index(req: Request, res: Response ) {
        try {
					const reservations = await Brothers.find()
					return res.json(reservations)

        } catch (error: any) {
					return res.status(400).json(error.message)
        }
    }

		async addBrother(req: Request, res: Response ) {
			try {

				const brother: IBrother = {
					fieldGroup: req.body.fieldGroup,
					isElder: req.body.isElder || false,
					isTalker: req.body.isTalker || true,
					isVideoSupporter: req.body.isVideoSupporter || false,
					name: req.body.name || '—'
				}

				const newBrother = await new Brother(brother)
				newBrother.save()

				return res.json({
					message: "Brother added!",
					brother: newBrother,
				})
				
			} catch (error: any) {
				return res.status(400).json(error.message)
			}
		}

		async addBrothers(req: Request, res: Response ) {
			try {
				const isAnArray = Array.isArray(req.body)
				
				if (!isAnArray) throw Error('Body sent is not an array.')

				await Brother.insertMany(req.body)

				return res.json({ message: `${req.body.length} brothers were added!` })
				
			} catch (error: any) {
				return res.status(400).json(error.message)
			}
		}

}

export default new BrotherController()
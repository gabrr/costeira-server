import { IAppointment } from "_types/appointment"

export const dateHelper = (dateParentParam: Date) => {
	const year = new Date(dateParentParam).getFullYear()
	const month = new Date(dateParentParam).getMonth()

	/**
	 * 
	 * @param date Dates are zero based
	 * @returns
	 */
	const getDaysToWeekend = () => (6 - new Date(year, month).getDay()) === 6 ? 0 : (6 - new Date(year, month).getDay())

	const getFirstWeekendDate = () => new Date(year, month,  getDaysToWeekend() + 1).getDate()

	/**
	 * 
	 * @param dateNumber 2022/12/13; 13 Will be the parameter value.
	 * @returns 
	 */
	const isASunday = (dateNumber = dateParentParam.getDate()) => new Date(year, month, dateNumber).getDay() === 0;

	/**
	 * 
	 * @param day If it's set, the check will start from the set day.
	 * By default is set to zero because that value will find the last
	 * day of the month.
	 * @param year 
	 * @param month 0 means January.
	 * @returns 
	 */
	const findLastSunday = (year: number, month: number, day = 0): Date => {
    const newDate = (_day = day, _month = month, _year = year ) => new Date(_year, _month, _day)
    const lastDay = (day === 0) ? newDate(day, month + 1).getDate() : newDate().getDate()

		if ((!Number(lastDay) || day < lastDay - 7) && day !== 0) return new Date()
    if (newDate().getDay() === 0) return newDate()

		return findLastSunday(year, month, lastDay - 1)
	}
	
	/**
	 * 
	 * @param date Placing a date like new Date(2022/01/13) will return a boolean
	 * on whether this date is a Sunday.
	 * @returns 
	 */
	const isLastSunday = (date = dateParentParam) => {
		const endDate = new Date(year, month, 0)
		const isEndDateASunday = endDate.getDay() === 0

		if (isEndDateASunday) return (date.getDate() === endDate.getDate())
		
		const lastSunday = findLastSunday(year, month, 0)

		return (lastSunday.getDate() === date.getDate())
	}

	/**
	 * 
	 * @param year 
	 * @param month
	 * @returns Returns an Object in a format for the Appointments Schema.
	 */
	const createMonth = (_year = year, _month = month): IAppointment[] => {
		//startDay 0 equals to sunday
		//month as parameter for Date is 1 based.
		const startDay = new Date(_year, _month, 1).getDay()
		const endDate = new Date(_year, _month + 1, 0).getDate()
		
		//if the start day is saturday we want to start from saturday again, but not if it is sunday.
		const daysToSum = startDay === 0 ? 6 : 7
		const firstWeekendDate = getFirstWeekendDate()

		const result: IAppointment[] = []

		type CreateEmptyAppointObjProps = {
			datetime: Date
			isFirstSunday?: boolean
			isLastSunday?: boolean
			list?: IAppointment[]
		}
		
		type CreateEmptyAppointObj = (props: CreateEmptyAppointObjProps) => void

		const createEmptyAppointObj: CreateEmptyAppointObj = ({
			datetime,
			isFirstSunday = false,
			isLastSunday = false,
			list = result
		}) => {
			
			const suffix = (isFirstSunday || isLastSunday) ? 'Todos grupos juntos.' : ''
			
			const appoint = {
				dateGroup: datetime.toLocaleDateString('pt', { month: '2-digit', year: 'numeric' }),
				datetime: datetime.toDateString(),
				suffix,
				bro1: '',
				bro2: '',
			}

			const appointA = {...appoint, group: 'A'}
			const appointB = {...appoint, group: 'B'}
			
			list.push(appointA, appointB)
	
			return
		}

		const buildDates = (day: number) => {
			if (day > endDate) return
	
			const newDate = (day: number) => (day === 0) ? new Date(_year, _month + 1, day) : new Date(_year, _month, day)
	
			// the first weekend. It can be saturday or sunday.
			if (day === firstWeekendDate) {
				createEmptyAppointObj({ datetime: newDate(day), isFirstSunday: isASunday(day) })
				//if it's saturday, let's add sunday too.
				if (isASunday(day + 1)) {
					createEmptyAppointObj({ datetime: newDate(day + 1), isFirstSunday: true })
				}
				buildDates(day + daysToSum)
				return
			}
	
			// all the following weekends.
			createEmptyAppointObj({
				datetime: newDate(day),
				isLastSunday: isLastSunday(newDate(day))
			})
			
			
			// If we add one more weekend day and is still part of the same month — GOOD.
			if ((day + 1) < endDate) createEmptyAppointObj({
				datetime: newDate(day + 1),
				isLastSunday: isLastSunday(newDate(day + 1))
			})
	
			buildDates(day + 7)
			return
		}

		buildDates(firstWeekendDate)

		return result
	}
	
	const isDateEqual = (dateOne: string, dateTwo: string): boolean => {
		const _dateOne = new Date(dateOne)
		const _dateTwo = new Date(dateTwo)
		
		if (!_dateOne.getDate() || !_dateTwo.getDate()) return false
		
		return _dateOne.toDateString() === _dateTwo.toDateString()
	}

	return {
		getFirstWeekendDate,
		getDaysToWeekend,
		isASunday,
		isLastSunday,
		findLastSunday,
		createMonth,
		isDateEqual,
	}
}
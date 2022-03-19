export const dateHelper = (dateParentParam: Date) => {
	const year = new Date(dateParentParam).getFullYear()
	const month = new Date(dateParentParam).getMonth()

	/**
	 * 
	 * @param date Dates are zero based
	 * @returns
	 */
	const daysToWeekend = () => (6 - new Date(year, month).getDay()) === 6 ? 0 : (6 - new Date(year, month).getDay())

	const firstWeekendDate = () => new Date(year, month,  daysToWeekend() + 1).getDate()

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

	return {
		firstWeekendDate,
		daysToWeekend,
		isASunday,
		isLastSunday,
		findLastSunday,
	}
}
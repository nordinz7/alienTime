export default class AlienTime {
  private earthToAlienSecond: number

  private alienMinuteInSeconds: number
  private alienHourInSeconds: number
  private alienDayInSeconds: number
  private alienMonthDays: number[]
  private alienYearInSeconds: number
  private referenceAlienTime: {
    year: number
    month: number
    day: number
    hour: number
    minute: number
    second: number
  }

  constructor() {
    // Base conversion factors
    this.earthToAlienSecond = 2

    // Alien time units in seconds
    this.alienMinuteInSeconds = 90
    this.alienHourInSeconds = 90 * this.alienMinuteInSeconds
    this.alienDayInSeconds = 36 * this.alienHourInSeconds

    // Days in each month
    this.alienMonthDays = [44, 42, 48, 40, 48, 44, 40, 44, 42, 40, 40, 42, 44, 48, 42, 40, 44, 38]
    this.alienYearInSeconds =
      this.alienMonthDays.reduce((acc, days) => acc + days, 0) * this.alienDayInSeconds

    // Start reference points
    this.referenceAlienTime = {
      year: 2804,
      month: 18,
      day: 31,
      hour: 2,
      minute: 2,
      second: 88
    }
  }

  // Convert Earth time to Alien time
  private convertEarthToAlien(earthDate: Date) {
    const elapsedEarthSeconds = earthDate.getTime() / 1000
    const elapsedAlienSeconds = elapsedEarthSeconds * this.earthToAlienSecond

    let remainingSeconds = elapsedAlienSeconds

    const aYear = Math.floor(remainingSeconds / this.alienYearInSeconds)
    this.referenceAlienTime.year += aYear
    remainingSeconds -= aYear * this.alienYearInSeconds

    const aMonth = Math.floor(remainingSeconds / this.alienDayInSeconds)
    this.referenceAlienTime.month += aMonth
    remainingSeconds -= aMonth * this.alienDayInSeconds

    const aDay = Math.floor(remainingSeconds / this.alienDayInSeconds)
    this.referenceAlienTime.day += aDay
    remainingSeconds -= aDay * this.alienDayInSeconds

    const aHour = Math.floor(remainingSeconds / this.alienHourInSeconds)
    this.referenceAlienTime.hour += aHour
    remainingSeconds -= aHour * this.alienHourInSeconds

    const aMinute = Math.floor(remainingSeconds / this.alienMinuteInSeconds)
    this.referenceAlienTime.minute += aMinute
    remainingSeconds -= aMinute * this.alienMinuteInSeconds

    const aSecond = Math.floor(remainingSeconds)
    this.referenceAlienTime.second += aSecond

    return this.referenceAlienTime
  }

  getAlienDate(date = new Date()) {
    const d = this.convertEarthToAlien(date)
    return new Date(d.year, d.month, d.day, d.hour, d.minute, d.second)
  }
}

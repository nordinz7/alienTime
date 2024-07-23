export default class AlienTime {
  private earthToAlienSecond: number

  private alienMinuteInSeconds: number
  private alienHourInSeconds: number
  private alienDayInSeconds: number
  private alienMonthDays: number[]
  private alienYearInSeconds: number
  private referenceEarthTime: Date
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
    this.referenceEarthTime = new Date(0) // 1970-01-01 00:00:00 UTC
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

    // Calculate Alien time
    const alienSecond = Math.floor(remainingSeconds % 90)
    remainingSeconds = Math.floor(remainingSeconds / 90)

    const alienMinute = remainingSeconds % 90
    remainingSeconds = Math.floor(remainingSeconds / 90)

    const alienHour = remainingSeconds % 36
    remainingSeconds = Math.floor(remainingSeconds / 36)

    let alienDay = remainingSeconds % this.alienMonthDays[this.referenceAlienTime.month - 1]
    remainingSeconds = Math.floor(
      remainingSeconds / this.alienMonthDays[this.referenceAlienTime.month - 1]
    )

    let alienMonth = this.referenceAlienTime.month
    let alienYear = this.referenceAlienTime.year

    while (remainingSeconds > 0) {
      alienDay++
      if (alienDay > this.alienMonthDays[alienMonth - 1]) {
        alienDay = 1
        alienMonth++
        if (alienMonth > 18) {
          alienMonth = 1
          alienYear++
        }
      }
      remainingSeconds--
    }

    return {
      year: alienYear,
      month: alienMonth,
      day: alienDay,
      hour: alienHour,
      minute: alienMinute,
      second: alienSecond
    }
  }

  getAlienDate(date = new Date()) {
    const d = this.convertEarthToAlien(date)
    return new Date(d.year, d.month, d.day, d.hour, d.minute, d.second)
  }
}

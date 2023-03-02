import daysjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import isToday from 'dayjs/plugin/isToday.js'

export class DateTime {
  public date: Date

  private constructor(date: Date) {
    daysjs.extend(utc)
    daysjs.extend(isToday)
    this.date = daysjs(date).utc().toDate()
  }

  static createFromDate(date: Date): DateTime {
    return new DateTime(date)
  }

  static createFromString(dateStr: string, timezone?: string): DateTime {
    const date = daysjs(dateStr).toDate()
    return DateTime.createFromDate(date)
  }

  static now(): DateTime {
    return new DateTime(new Date())
  }

  static today(): DateTime {
    const today = daysjs().startOf('day').toDate()
    return new DateTime(today)
  }

  getDate(): Date {
    return this.date
  }

  getHours() {
    return this.date.getHours()
  }

  greaterThan(d: DateTime): boolean {
    return this.date > d.date
  }

  greaterThanOrEqual(d: DateTime): boolean {
    return this.date >= d.date
  }

  lowerThan(d: DateTime): boolean {
    return this.date < d.date
  }

  lowerThanOrEqual(d: DateTime): boolean {
    return this.date <= d.date
  }

  isToday(): boolean {
    return daysjs(this.date).isToday()
  }

  dayDiff(d: DateTime): number {
    const d1 = daysjs(this.date).utc().startOf('day')
    const d2 = daysjs(d.date).utc().startOf('day')

    return d1.diff(d2, 'day')
  }

  addDays(days: number): DateTime {
    const date = daysjs(this.date).utc()
    return DateTime.createFromDate(date.add(days, 'day').toDate())
  }

  formatDate(opts?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat('es-AR', opts).format(this.date)
  }
}

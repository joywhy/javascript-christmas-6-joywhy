import Validator from '../utils/Validator.js';
import { DATE_RANGE, WEEKEND, CHRISTMAS, ERROR_MESSAGES } from '../constants/messages.js';
import InputError from '../error/InputError.js';

class ReservationDate {
  #date;
  #specialDay = [3, 10, 17, 24, 25, 31];

  constructor(day) {
    this.#validate(day);
    this.setDate(day);
  }
  #validate(day) {
    if (!Validator.isInteger(Number(day))) throw new InputError(ERROR_MESSAGES.notRange);

    if (!Validator.isRange(DATE_RANGE.to, DATE_RANGE.from, Number(day)))
      throw new InputError(ERROR_MESSAGES.notRange);
  }

  setDate(date) {
    this.#date = new Date(`2023-12-${date}`);
  }

  getbenefitDetails() {
    const benefitDetails = {
      isWeekend: false,
      isChristmasDday: false,
      isSpecialDay: false,
      isWeekday: false,
    };
    if (this.#isWeekend()) benefitDetails.isWeekend = true;
    if (this.#isChristmasDday()) benefitDetails.isChristmasDday = true;
    if (this.#isSpecialDay()) benefitDetails.isSpecialDay = true;
    if (!benefitDetails.isWeekend) benefitDetails.isWeekday = true;

    return benefitDetails;
  }
  #isWeekend() {
    const day = this.#date.getDay();
    return day === WEEKEND.friday || day === WEEKEND.saturday; //5= 금 6= 토 , 일=0
  }
  #isChristmasDday() {
    return this.getDate() <= CHRISTMAS;
  }
  #isSpecialDay() {
    return this.#specialDay.includes(this.getDate());
  }
  getDate() {
    return this.#date.getDate();
  }
}
export default ReservationDate;

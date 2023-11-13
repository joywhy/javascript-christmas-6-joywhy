import Validator from '../utils/Validator.js';
import {
  DATE_RANGE,
  WEEKEND,
  CHRISTMAS,
  ERROR_MESSAGES,
} from '../constants/messages.js';
import InputError from '../error/InputError.js';

class ReservationDate {
  #date;
  #specialDay;

  constructor(day) {
    this.#validate(day);
    this.setDate(day);
    this.#specialDay = [3, 10, 17, 24, 25, 31];
  }
  #validate(day) {
    if (!Validator.isInteger(Number(day))) {
      throw new InputError(ERROR_MESSAGES.notRange);
    }

    if (!Validator.isRange(DATE_RANGE.to, DATE_RANGE.from, Number(day))) {
      throw new InputError(ERROR_MESSAGES.notRange);
    }
  }

  setDate(date) {
    this.#date = new Date(`2023-12-${date}`);
  }
  getDate() {
    return this.#date.getDate();
  }
  getbenefitDetails() {
    const benefitDetails = [];

    if (this.isWeekend()) {
      benefitDetails.push('weekend');
    }
    if (this.isChristmasDday()) {
      benefitDetails.push('christmasDday');
    }
    if (this.isSpecialDay()) {
      benefitDetails.push('specialDay');
    }
    if (!benefitDetails.includes('weekend')) {
      benefitDetails.push('weekday');
    }
    return benefitDetails;
  }

  isWeekend() {
    const day = this.#date.getDay();
    return day === WEEKEND.friday || day === WEEKEND.saturday; //5= 금 6= 토 , 일=0
  }
  isChristmasDday() {
    return this.getDate() > CHRISTMAS ? false : true;
  }
  isSpecialDay() {
    return this.#specialDay.includes(this.getDate());
  }
}
export default ReservationDate;

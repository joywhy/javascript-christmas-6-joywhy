import Validator from '../utils/Validator.js';
import { DATE_RANGE, WEEKEND, CHRISTMAS } from '../constants/index.js';
class ReservationDate {
  //날짜
  //할인 가능 내역
  #date;
  #specialDay;
  constructor(date) {
    this.#validate(date);
    this.setDate(date);
    this.#specialDay = [3, 10, 17, 24, 31];
  }
  #validate(date) {
    Validator.isInteger(date);
    Validator.isRange(DATE_RANGE.to, DATE_RANGE.from, date);
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
    //주말인지 평일인지
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

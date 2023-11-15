import { MENU } from '../constants/menu.js';

class Event {
  #reservationDate;
  #menuList;
  #giftedMenu = 'champagne';
  constructor(reservationDate, menuList) {
    this.#reservationDate = reservationDate;
    this.#menuList = menuList;
  }
  isEventApplicable() {
    return this.#menuList.getTotalPrice() >= 10000;
  }
  hasGiftedMenu() {
    return this.#menuList.getTotalPrice() >= 120000;
  }
  getGiftedMenuPrice() {
    return MENU.beverages[this.#giftedMenu];
  }
  getBenefitsDetails() {
    let details = {};
    const benefits = this.#reservationDate.getbenefitDetails(); //가능성이 있는 할인 내역
    if (benefits.isChristmasDday)
      details['크리스마스 디데이 할인'] = this.calculateChristmasDiscount();
    if (this.isWeekdayEvent(benefits)) {
      details['평일 할인'] = this.calculateDiscount('desserts', 2023);
    }
    if (this.isWeekendEvent(benefits))
      details['주말 할인'] = this.calculateDiscount('mainCourses', 2023);
    if (benefits.isSpecialDay) details['특별 할인'] = 1000;
    if (this.hasGiftedMenu()) details['증정 이벤트'] = 25000;

    return details;
  }
  isWeekdayEvent(benefits) {
    return benefits.isWeekday && this.#menuList.isIncludedCategory('desserts');
  }
  isWeekendEvent(benefits) {
    return benefits.isWeekend && this.#menuList.isIncludedCategory('mainCourses');
  }
  calculateChristmasDiscount() {
    const date = this.#reservationDate.getDate();
    const discount = 1000 + (date - 1) * 100;
    return discount;
  }
  calculateDiscount(category, discountAmount) {
    //getDishs().filter 돌리는 부분은 다른곳에서도 저렇게 많이 쓴다면  다형성 적용
    const filterdMenus = this.#menuList.filterMenus(category);
    const count = filterdMenus.reduce((acc, cur) => {
      return (acc += cur.getCount());
    }, 0);
    return count * discountAmount;
  }
  calculateEstimatedPaymentAmount(totalBenefit) {
    if (this.hasGiftedMenu()) {
      return this.#menuList.getTotalPrice() - totalBenefit + this.getGiftedMenuPrice();
    }
    return this.#menuList.getTotalPrice() - totalBenefit;
  }
  getTotalBenefit() {
    const benefitsDetails = this.getBenefitsDetails();

    if (!this.isEventApplicable()) return 0;
    let totalBenefits = Object.values(benefitsDetails).reduce((acc, cur) => {
      return (acc += cur);
    }, 0);
    return totalBenefits;
  }
  getEventBadge() {
    const totalBenefit = this.getTotalBenefit();

    if (totalBenefit >= 20000) {
      return '산타';
    }
    if (totalBenefit >= 10000) {
      return '트리';
    }
    if (totalBenefit >= 5000) {
      return '별';
    }
    return '없음';
  }
}
export default Event;

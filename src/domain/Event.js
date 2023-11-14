import { MENU } from '../constants/menu.js';

class Event {
  #reservationDate;
  #menuList;
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
  getGiftedMenu() {
    if (this.hasGiftedMenu()) {
      return '샴페인 1개';
    }
    return '없음';
  }
  getGiftedMenuPrice() {
    return MENU.beverages.champagne;
  }
  getBenefitsDetails() {
    let benefitsDetails = {};
    const benefits = this.#reservationDate.getbenefitDetails(); //가능성이 있는 할인 내역

    if (this.isChristmasDdayEvent(benefits)) {
      benefitsDetails['크리스마스 디데이 할인'] =
        this.calculateChristmasDiscount();
    }
    if (this.isWeekdayEvent(benefits)) {
      benefitsDetails['평일 할인'] = this.calculateDiscount('desserts', 2023);
    }
    if (this.isWeekendEvent(benefits)) {
      benefitsDetails['주말 할인'] = this.calculateDiscount(
        'mainCourses',
        2023
      );
    }
    if (this.isSpecialDay(benefits)) {
      benefitsDetails['특별 할인'] = 1000;
    }
    if (this.hasGiftedMenu()) {
      benefitsDetails['증정 이벤트'] = 25000;
    }
    return benefitsDetails;
  }
  isChristmasDdayEvent(benefits) {
    return benefits.some((benefit) => benefit === 'christmasDday');
  }
  isSpecialDay(benefits) {
    return benefits.some((benefit) => benefit === 'specialDay');
  }
  calculateChristmasDiscount() {
    const date = this.#reservationDate.getDate();
    const discount = 1000 + (date - 1) * 100;
    return discount;
  }
  isWeekdayEvent(benefits) {
    return (
      benefits.some((benefit) => benefit === 'weekday') &&
      this.#menuList.isDessertsIncluded()
    );
  }
  isWeekendEvent(benefits) {
    // 주말 할인(금요일, 토요일): 주말에는 메인 메뉴를 메뉴 1개당 2,023원 할인
    return (
      benefits.some((benefit) => benefit === 'weekend') &&
      this.#menuList.isMainDishIncluded()
    );
  }

  calculateDiscount(category, discountAmount) {
    //[Menu{},Menu{}]
    //getDishs().filter 돌리는 부분은 다른곳에서도 저렇게 많이 쓴다면  다형성 적용
    const filterdMenus = this.#menuList.filterMenus(category);
    const count = filterdMenus.reduce((acc, cur) => {
      // 갯수합하기 메서드로 Menus 메서드 순수함수로 분리
      return (acc += cur.getCount());
    }, 0);
    return count * discountAmount;
  }

  // <총혜택 금액>
  // 0원

  // <할인 후 예상 결제 금액>
  // 8,500원

  // <12월 이벤트 배지>
  // 없음
  // - [ ] 총주문 금액 10,000원 이상부터 이벤트가 적용된다.
  // - [ ] 해택 내역이 출력되며 해택 내역에 따른 할인 금액이 출력된다.
  // - [ ] 총혜택 금액을 출력한다. 총혜택 금액에는 증정용 샴페인1개에 대한 값이 포함된다.
  // - [ ] 할인 후 예상 결제 금액을 출력한다. 증정용 샴페인이 존재할 경우 총주문금액-총혜택금액 + 샴페인값

  // - [ ] 12월 이벤트 배지을 출력한다.
  // - [ ] 총혜택 금액에 따라 5천 원 이상: 별,1만 원 이상: 트리, 2만 원 이상: 산타, 해택받지 못하면 없음을 출력한다.
  calculateEstimatedPaymentAmount(totalBenefit) {
    if (this.hasGiftedMenu()) {
      return (
        this.#menuList.getTotalPrice() -
        totalBenefit +
        this.getGiftedMenuPrice()
      );
    }
    return this.#menuList.getTotalPrice() - totalBenefit;
  }
}
export default Event;

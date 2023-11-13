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
    if (!this.isEventApplicable()) {
      return false;
    }
    return this.#menuList.getTotalPrice() >= 120000;
  }
  getGiftedMenu() {
    if (this.hasGiftedMenu()) {
      return '샴페인 1개';
    }
    return '없음';
  }
  getBenefitsDetails() {
    let benefitsDetails = {};
    if (!this.isEventApplicable()) {
      return undefined;
    }
    const benefits = this.#reservationDate.getbenefitDetails(); //가능성이 있는 할인 내역
    if (benefits.some((benefit) => benefit === 'christmasDday')) {
      const christmasDday = '크리스마스 디데이 할인';
      benefitsDetails[christmasDday] = this.calculateChristmasDiscount();
    }
    //해택 내역이 출력되며 해택 내역에 따른 할인 금액이 출력된다.
    //날짜에 대한 이벤트 내역 this.#reservationDate.getbenefitDetails() 배열형태로
    // 평일 할인(일요일~목요일): 평일에는 디저트 메뉴를 메뉴 1개당 2,023원 할인
    if (this.isWeekendEvent(benefits)) {
      const weekday = '평일 할인';
      benefitsDetails[weekday] = this.calculateWeekdayDiscount();
    }
    // 주말 할인(금요일, 토요일): 주말에는 메인 메뉴를 메뉴 1개당 2,023원 할인
    // 특별 할인: 이벤트 달력에 별이 있으면 총주문 금액에서 1,000원 할인
    return benefitsDetails;
  }
  calculateChristmasDiscount() {
    const date = this.#reservationDate.getDate();
    const discount = 1000 + date * 100;
    return discount;
  }
  isWeekendEvent(benefits) {
    //평일 할인(일요일~목요일)평일이고  디저트 메뉴가 있으면
    return (
      benefits.some((benefit) => benefit === 'weekday') &&
      this.#menuList.isDessertsIncluded()
    );
  }
  calculateWeekdayDiscount() {
    // 디져트 메뉴 1개당 2,023원 할인
    const deserts = this.#menuList
      .getDishs()
      .filter((dish) => dish.findCategory() === 'desserts');
    const count = deserts.reduce((acc, cur) => {
      return (acc += cur.getCount());
    }, 0);
    return count * 2023;
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
}
export default Event;

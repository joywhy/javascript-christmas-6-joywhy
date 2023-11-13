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

  // <혜택 내역>
  // 없음

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

import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import ReservationDate from '../domain/ReservationDate.js';
import Parser from '../utils/Parser.js';
import Menu from '../domain/Menu.js';
import Menus from '../domain/Menus.js';
import Event from '../domain/Event.js';

class ChristmasController {
  #event;
  constructor() {
    OutputView.printIntroduction();
  }
  async promote() {
    const reservationDate = await this.#inputDate();
    const menuList = await this.#inputOrder();

    this.#event = new Event(reservationDate, menuList);
    this.#showPromotionResult({ reservationDate, menuList }); //event 인자
  }
  async #inputDate() {
    try {
      const input = await InputView.readDate();
      const date = new ReservationDate(Number(input));
      return date;
    } catch (error) {
      OutputView.printError(error);
      return await this.#inputDate();
    }
  }
  async #inputOrder() {
    try {
      const input = await InputView.readOrder();
      //, 없이 단메뉴만시켜도 유효하다. 공백을 사이사이 추가해도 유효하다.
      const dishs = Parser.stringToArray(input, ',').map((menu) => {
        return new Menu(menu);
      });
      return new Menus(dishs);
    } catch (error) {
      OutputView.printError(error);
      return await this.#inputOrder();
    }
  }
  #showPromotionResult({ menuList, reservationDate }) {
    OutputView.printBenefitsPreview(reservationDate.getDate());
    //주문메뉴와 할인전 총주문금액
    this.#showOrderedMenu(menuList);
    //증정 메뉴 출력
    OutputView.printGiftedMenu(this.#event.getGiftedMenu());
    //해택 내역 출력
    const benefitsDetails = this.#showBenefitsDetails();

    //총 해택 내역 출력
    this.#showTotalBenefits(benefitsDetails);

    //할인 후 예상 결제 금액
    OutputView.printEstimatedPaymentAmount();
    //12월 이벤트 배지
    OutputView.printEventBadge();
  }
  #showOrderedMenu(menuList) {
    OutputView.printOrderedMenu();

    const dishs = menuList.getDishs();
    dishs.forEach((dish) => {
      OutputView.print(dish.getDishNCount());
    });

    OutputView.printSubtotalBFDiscount();
    //3자리마다 , 로 작성해아여 출력
    OutputView.print(`${menuList.getTotalPrice()}원`);
  }
  #showBenefitsDetails() {
    OutputView.printBenefitsDetails();

    const benefitsDetails = this.#event.getBenefitsDetails();
    console.log(benefitsDetails);
    if (!benefitsDetails) {
      OutputView.print('없음');
      return;
    }
    for (let key in benefitsDetails) {
      OutputView.print(`${key}: -${benefitsDetails[key]}원`);
    }
    return benefitsDetails;
  }
  #showTotalBenefits(benefitsDetails) {
    OutputView.printTotalBenefitsAmount();
    //증정샴페인이 있는지 없는지
  }
}
export default ChristmasController;

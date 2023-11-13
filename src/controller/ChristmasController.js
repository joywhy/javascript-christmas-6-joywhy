import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import ReservationDate from '../domain/ReservationDate.js';
import Parser from '../utils/Parser.js';
import Menu from '../domain/Menu.js';
import Menus from '../domain/Menus.js';

class ChristmasController {
  #reservationDate;
  #menuList;
  constructor() {
    OutputView.printIntroduction();
  }
  async promote() {
    const reservationDate = await this.#inputDate();
    const menuList = await this.#inputOrder();
    this.#reservationDate = reservationDate;
    this.#menuList = menuList;
    // const event = new Event(reservationDate,menuList);
    this.#showPromotionResult(); //event 인자
  }
  async #inputDate() {
    try {
      const input = await InputView.readDate();
      const date = new ReservationDate(Number(input));
      return date;
    } catch (error) {
      OutputView.printError(error);
      await this.#inputDate();
    }
  }
  async #inputOrder() {
    // 주문하실 메뉴 와 갯수 입력
    try {
      const input = await InputView.readOrder();
      //, 없이 단메뉴만시켜도 유효하다. 공백을 사이사이 추가해도 유효하다.
      const dishs = Parser.stringToArray(input, ',').map(
        (menu) => new Menu(menu)
      );
      return new Menus(dishs);
    } catch (error) {
      OutputView.printError(error);
      await this.#inputOrder();
    }
  }
  #showPromotionResult(event) {
    // 프로모션 내용 출력
    OutputView.printBenefitsPreview();

    this.#showOrderedMenu();

    OutputView.printGiftedMenu();
    OutputView.printBenefitsDetails();
    OutputView.printTotalBenefitsAmount();
    OutputView.printEstimatedPaymentAmount();
    OutputView.printEventBadge();
  }
  #showOrderedMenu() {
    OutputView.printOrderedMenu();
    this.#menuList.getDishs().forEach((dish) => {
      OutputView.print(dish.getDishNCount());
    });

    OutputView.printSubtotalBFDiscount();
    OutputView.print(`${this.#menuList.getTotalPrice()}원`);
  }
}
export default ChristmasController;

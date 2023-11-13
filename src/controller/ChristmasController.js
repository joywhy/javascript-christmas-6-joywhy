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
    // 주문하실 메뉴 와 갯수 입력
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
    OutputView.printBenefitsPreview();

    this.#showOrderedMenu(menuList);
    OutputView.printGiftedMenu(this.#event.getGiftedMenu());
    this.#showBenefitsDetails();

    OutputView.printTotalBenefitsAmount();
    OutputView.printEstimatedPaymentAmount();
    OutputView.printEventBadge();
  }
  #showOrderedMenu(menuList) {
    OutputView.printOrderedMenu();
    // console.log(menuList.getDishs());
    const dishs = menuList.getDishs();
    // console.log(dishs);
    dishs.forEach((dish) => {
      OutputView.print(dish.getDishNCount());
    });

    OutputView.printSubtotalBFDiscount();
    OutputView.print(`${menuList.getTotalPrice()}원`);
  }
  #showBenefitsDetails() {
    OutputView.printBenefitsDetails();
    const benefitsDetails = this.#event.getBenefitsDetails();
    if (!benefitsDetails) {
      OutputView.print('없음');
      return;
    }
    for (let key in benefitsDetails) {
      OutputView.print(`${key}: -${benefitsDetails[key]}원`);
    }
  }
}
export default ChristmasController;

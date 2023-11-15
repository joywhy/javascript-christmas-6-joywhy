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

    this.#event = new Event(reservationDate, menuList); //
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
      const input = await InputView.readOrder(); //, 없이 단메뉴만시켜도 유효하다. 공백을 사이사이 추가해도 유효하다.
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

    this.#showOrderedMenu(menuList);
    this.#showSubtotalBFDiscount(menuList);
    this.#showGiftedMenu();
    this.#showBenefitsDetails();
    this.#showTotalBenefits();
    this.#showEstimatedAmount();
    this.#showEventBadge();
  }
  #showOrderedMenu(menuList) {
    OutputView.printOrderedMenuTitle();

    const dishs = menuList.getDishs(); //[Menu{},Menu{}]
    dishs.forEach((dish) => {
      OutputView.print(`${dish.getdish()} ${dish.getCount()}개`); //고민
    });
  }
  #showSubtotalBFDiscount(menuList) {
    OutputView.printSubtotalBFDiscountTitle();
    const totalPrice = Parser.toCommaSeparated(menuList.getTotalPrice());
    OutputView.print(`${totalPrice}원`);
  }
  #showGiftedMenu() {
    OutputView.printGiftedMenu();
    if (this.#event.hasGiftedMenu()) {
      return OutputView.print('샴페인 1개');
    }
    OutputView.print('없음');
  }
  #showBenefitsDetails() {
    OutputView.printBenefitsDetailsTitle(); //해택내역 // OutputView.print(MESSAGES.benefitsDetails);

    if (!this.#event.isEventApplicable()) return OutputView.print('없음');

    const benefitsDetails = this.#event.getBenefitsDetails();
    for (let benefit in benefitsDetails) {
      let benefitsPrice = Parser.toCommaSeparated(benefitsDetails[benefit]);
      OutputView.print(`${benefit}: -${benefitsPrice}원`);
    }
  }
  #showTotalBenefits() {
    OutputView.printTotalBenefitsAmount();

    const totalBenefits = this.#event.getTotalBenefit();
    const separatedTotalBenefits = Parser.toCommaSeparated(totalBenefits);

    if (separatedTotalBenefits === '0') {
      return OutputView.print(`${separatedTotalBenefits}원`);
    }
    OutputView.print(`-${separatedTotalBenefits}원`);
  }

  #showEstimatedAmount() {
    OutputView.printEstimatedPaymentAmount();

    const totalBenefit = this.#event.getTotalBenefit();
    const finalPayment = this.#event.calculateEstimatedPaymentAmount(totalBenefit);

    OutputView.print(`${Parser.toCommaSeparated(finalPayment)}원`);
  }
  #showEventBadge() {
    OutputView.printEventBadge();
    const badge = this.#event.getEventBadge();
    OutputView.print(badge);
  }
}
export default ChristmasController;

import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import ReservationDate from '../domain/ReservationDate.js';
import Parser from '../utils/Parser.js';
import Menu from '../domain/Menu.js';
class ChristmasController {
  constructor() {
    OutputView.printIntroduction();
  }
  async promote() {
    const reservationDate = await this.#inputDate();
    // console.log(reservationDate.getbenefitDetails());
    const menuList = await this.#inputOrder();

    this.#showPromotionResult(reservationDate, menuList);
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
      //, 없이 단메뉴만시켜도 유효하다.
      //공백을 사이사이 추가해도 유효하다.
      const menus = Parser.stringToArray(input, ',').map(
        (menu) => new Menu(menu)
      );
    } catch (error) {
      OutputView.printError(error);
      await this.#inputOrder();
    }
  }
  #showPromotionResult(date, menuList) {
    // 프로모션 내용 출력
  }
}
export default ChristmasController;

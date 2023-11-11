import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import ReservationDate from '../domain/ReservationDate.js';

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
  }
  #showPromotionResult(date, menuList) {
    // 프로모션 내용 출력
  }
}
export default ChristmasController;

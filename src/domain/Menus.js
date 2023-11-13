import InputError from '../error/InputError.js';
import { ERROR_MESSAGES } from '../constants/messages.js';
class Menus {
  #dishs; //=[new Menu(menu),new Menu(menu)]

  constructor(dishs) {
    this.#dishs = dishs;
    this.#validate();
  }

  #validate() {
    if (this.#isOnlyDrink()) throw new InputError(ERROR_MESSAGES.onlyDrink);
  }
  #isOnlyDrink() {
    if (
      this.getCount() === 1 &&
      this.#dishs[0].findCategory() === 'beverages'
    ) {
      return true;
    }
    return false;
  }
  getCount() {
    return this.#dishs.length;
  }
  // - [ ] 음료만 주문 시, 주문할 수 없습니다.
  // - [ ] 중복 메뉴를 입력한 경우(e.g. 시저샐러드-1,시저샐러드-1), "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 에러 메시지를 보여 준다.
  //   - 총 menu 갯수 구하기
  //   - 메인디시 포함 되어있는지
  //   - 디져트 포함되어있는지
  //   - 메뉴형식이 다른경우 ->"[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
  //   - 중복 메뉴 입력하는 경우 -> "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.
  //   - 총 주문한 메뉴 목록
  //   - 총 주문 가격
}

export default Menus;

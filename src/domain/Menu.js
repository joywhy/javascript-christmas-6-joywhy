import Validator from '../utils/Validator.js';
import { ERROR_MESSAGES } from '../constants/messages.js';
import { MENU, KOREAN_MENU } from '../constants/menu.js';
import InputError from '../error/InputError.js';
import Parser from '../utils/Parser.js';

class Menu {
  #dish;
  #count;

  constructor(order) {
    this.#setOrder(order);
    this.#validate(order);
  }

  #setOrder(order) {
    const [dish, count] = order.split('-').map((str) => {
      str.trim();
      return Parser.removeSpace(str);
    });

    this.#dish = dish;
    this.#count = Number(count);
  }
  #findCategory() {
    let title = '';
    const categorys = Object.keys(MENU);

    categorys.forEach((category) => {
      let menus = Object.keys(KOREAN_MENU[category]);
      const isSame = (menu) => KOREAN_MENU[category][menu] === this.#dish;
      if (menus.some(isSame)) title = category;
    });
    return title;
  }
  #validate(order) {
    Validator.IsIncluded(order, '-');
    this.isValidDish();
    // 갯수가 1미만이거나 숫자가 아닐시
    Validator.isInteger(this.#count);
    if (!Validator.isRange(1, 20, this.#count)) {
      throw new InputError(ERROR_MESSAGES.otherFormat);
    }
  }
  isValidDish() {
    if (this.#findCategory()) {
      return true;
    }
    throw new InputError(ERROR_MESSAGES.otherFormat);
  }
  getCount() {
    return this.#count;
  }

  getdish() {
    return this.#dish;
  }
}

// - [ ] 메뉴판에 없는 메뉴를 입력하는 경우, "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 에러 메시지를 보낸다.
// - [ ] 갯수에 대해 1미만 숫자이거나 숫자가 아닐시 ,[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 에러 메시지를 보여 준다.
// - [ ] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.
// - [ ] 메뉴 형식이 예시와 다른 경우, "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 에러 메시지를 보여 준다.
// - [ ] 음료만 주문 시, 주문할 수 없습니다.
// - [ ] 중복 메뉴를 입력한 경우(e.g. 시저샐러드-1,시저샐러드-1), "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 에러 메시지를 보여 준다.

export default Menu;

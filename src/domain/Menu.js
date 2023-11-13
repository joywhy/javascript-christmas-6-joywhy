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
  findCategory() {
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
    if (!Validator.isInteger(this.#count)) {
      throw new InputError(ERROR_MESSAGES.otherFormat);
    }

    if (!Validator.isRange(1, 20, this.#count)) {
      throw new InputError(ERROR_MESSAGES.otherFormat);
    }
  }
  isValidDish() {
    if (this.findCategory()) {
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
  getDishNCount() {
    return `${this.#dish} ${this.#count}개`;
  }
  getPrice() {
    let price = 0;
    const category = this.findCategory();
    const dishs = Object.keys(MENU[category]);
    dishs.forEach((dish) => {
      if (this.#dish === KOREAN_MENU[category][dish]) {
        price = this.#count * MENU[category][dish];
      }
    });
    return price;
  }
}
// const MENU = {
//   appetizers: {
//     mushroomSoup: 6000,
//     tapas: 5500,
//     caesarSalad: 8000,
//   },
//   mainCourses: {
//     tboneSteak: 55000,
//     barbecueRibs: 54000,
//     seafoodPasta: 35000,
//     christmasPasta: 25000,
//   },
//   desserts: {
//     chocolateCake: 15000,
//     iceCream: 5000,
//   },
//   beverages: {
//     zeroCola: 3000,
//     redWine: 60000,
//     champagne: 25000,
//   },
// };
// const KOREAN_MENU = {
//   appetizers: {
//     mushroomSoup: '양송이수프',
//     tapas: '타파스',
//     caesarSalad: '시저샐러드',
//   },
//   mainCourses: {
//     tboneSteak: '티본스테이크',
//     barbecueRibs: '바비큐립',
//     seafoodPasta: '해산물파스타',
//     christmasPasta: '크리스마스파스타',
//   },
//   desserts: {
//     chocolateCake: '초코케이크',
//     iceCream: '아이스크림',
//   },
//   beverages: {
//     zeroCola: '제로콜라',
//     redWine: '레드와인',
//     champagne: '샴페인',
//   },
// };

// - [ ] 메뉴 형식이 예시와 다른 경우, "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 에러 메시지를 보여 준다.

export default Menu;

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
  #validate(order) {
    this.#isIncluded(order, '-');
    this.#isValidDish();
    this.#isValidCount();
  }
  #isIncluded(value, separator) {
    if (!value.includes(separator)) {
      throw new InputError(ERROR_MESSAGES.otherFormat);
    }
    return true;
  }

  #isValidCount() {
    if (!Validator.isInteger(this.#count)) {
      throw new InputError(ERROR_MESSAGES.otherFormat);
    }

    if (!Validator.isRange(1, 20, this.#count)) {
      throw new InputError(ERROR_MESSAGES.otherFormat);
    }
  }
  #isValidDish() {
    if (this.findCategory()) {
      return true;
    }
    throw new InputError(ERROR_MESSAGES.otherFormat);
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

  getCount() {
    return this.#count; //일하는가
  }

  getdish() {
    return this.#dish; //일하는가
  }
  getDishNCount() {
    //이게 맞는가
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

export default Menu;

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
    if (!this.#isIncluded(order, '-')) throw new InputError(ERROR_MESSAGES.otherFormat);
    if (!this.#isValidDish()) throw new InputError(ERROR_MESSAGES.otherFormat);
    if (!this.#isValidCount()) throw new InputError(ERROR_MESSAGES.otherFormat);
  }
  #isIncluded(value, separator) {
    return value.includes(separator);
  }
  #isValidDish() {
    return this.findCategory();
  }
  #isValidCount() {
    return Validator.isInteger(this.#count) && Validator.isRange(1, 20, this.#count);
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
  getCount() {
    return this.#count;
  }

  getdish() {
    return this.#dish;
  }
}

export default Menu;

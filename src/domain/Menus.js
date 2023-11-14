import InputError from '../error/InputError.js';
import { ERROR_MESSAGES } from '../constants/messages.js';
class Menus {
  #dishs; // [ Menu{},Menu{},...]

  constructor(dishs) {
    this.#dishs = dishs;
    this.#validate();
  }

  #validate() {
    if (this.#isOnlyDrink()) throw new InputError(ERROR_MESSAGES.otherFormat);
    if (this.#isDuplicates()) throw new InputError(ERROR_MESSAGES.otherFormat);
    if (this.getTotalCount() > 20) throw new InputError(ERROR_MESSAGES.overOrderCount);
  }
  #isOnlyDrink() {
    let isOnlyDrink = true;

    this.#dishs.forEach((dish) => {
      if (dish.findCategory() !== 'beverages') {
        isOnlyDrink = false;
      }
    });
    return isOnlyDrink;
  }

  #isDuplicates() {
    const menus = this.#dishs.map((dish) => dish.getdish());
    const uniqueMenus = new Set(menus);

    return menus.length !== uniqueMenus.size;
  }
  getDishs() {
    return this.#dishs;
  }
  getCount() {
    return this.#dishs.length;
  }
  getTotalCount() {
    return this.#dishs.reduce((acc, cur) => {
      return acc + cur.getCount();
    }, 0);
  }
  getTotalPrice() {
    return this.#dishs.reduce((acc, cur) => {
      return (acc += cur.getPrice());
    }, 0);
  }
  isMainDishIncluded() {
    return this.#dishs.some((dish) => dish.findCategory() === 'mainCourses');
  }
  isDessertsIncluded() {
    return this.#dishs.some((dish) => dish.findCategory() === 'desserts');
  }
  //   - 총 주문한 메뉴 목록
  filterMenus(category) {
    return this.#dishs.filter((dish) => dish.findCategory() === category);
  }
}

export default Menus;

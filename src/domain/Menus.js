import InputError from '../error/InputError.js';
import { ERROR_MESSAGES } from '../constants/messages.js';
class Menus {
  #dishs; //=[ Menu{},Menu{},...]

  constructor(dishs) {
    this.#dishs = dishs;
    this.#validate();
  }

  #validate() {
    if (this.#isOnlyDrink()) throw new InputError(ERROR_MESSAGES.onlyDrink);
    if (this.#isDuplicates()) throw new InputError(ERROR_MESSAGES.otherFormat);
    if (this.getTotalCount() > 20)
      throw new InputError(ERROR_MESSAGES.overOrderCount);
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

  #isDuplicates() {
    const menus = this.#dishs.map((dish) => dish.getdish());
    const uniqueMenus = new Set(menus);

    if (menus.length !== uniqueMenus.size) {
      return true;
    }
    return false;
  }
  getDishs() {
    return this.#dishs;
  }
  getCount() {
    return this.#dishs.length;
  }
  //   #findDuplicates() {
  //     const hashTable = {};
  //     const duplicates = [];

  //     for (let i = 0; i < this.#dishs.length; i++) {
  //       const dish = this.#dishs[i].getdish();

  //       if (hashTable[dish]) {
  //         duplicates.push(...this.#filterDish(dish));
  //       } else {
  //         hashTable[dish] = true;
  //       }
  //     }
  //     return duplicates;
  //   }
  //   #filterDish(menu) {
  //     console.log(menu);
  //     const menus = this.#dishs.filter((dish) => dish.getdish() === menu);
  //     return menus;
  //   }
  getTotalCount() {
    const totalCount = this.#dishs.reduce((acc, cur) => {
      return acc + cur.getCount();
    }, 0);

    return totalCount;
  }
  getTotalPrice() {
    const totalPrice = this.#dishs.reduce((acc, cur) => {
      return (acc += cur.getPrice());
    }, 0);

    return totalPrice;
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

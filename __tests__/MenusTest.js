import Menu from '../src/domain/Menu.js';
import Menus from '../src/domain/Menus.js';

const INVALID_ORDER_MESSAGE = '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.';

describe('Menus 에러 처리 테스트', () => {
  test('음료만 주문 시, 에러 처리한다.', () => {
    expect(() => {
      const dishs = ['제로콜라-2', '레드와인-3', '샴페인-2'];
      const menus = dishs.map((dish) => new Menu(dish));
      new Menus(menus);
    }).toThrow(INVALID_ORDER_MESSAGE);
  });
  test('중복 메뉴 입력시 에러처리 ', () => {
    expect(() => {
      const dishs = ['타파스-2', '레드와인-3', ' 타파 스-3'];
      const menus = dishs.map((dish) => new Menu(dish));
      new Menus(menus);
    }).toThrow(INVALID_ORDER_MESSAGE);
  });
  test('메뉴 갯수 20개 초과시 에러처리 ', () => {
    expect(() => {
      const dishs = ['타파스-1', '레드와인-3', '티본스테이크-7', '시저 샐러드-10'];
      const menus = dishs.map((dish) => new Menu(dish));
      new Menus(menus);
    }).toThrow(INVALID_ORDER_MESSAGE);
  });
});

describe('Menus 내부 메서드 테스트', () => {
  test('getTotalCount 테스트', () => {
    const dishs = ['타파스-1', '레드와인-3', '티본스테이크-7'];
    const menus = dishs.map((dish) => new Menu(dish));
    const order = new Menus(menus);
    const count = order.getTotalCount();
    expect(count).toBe(11);
  });
  test('getTotalCount 테스트  한 개주문했을 때', () => {
    const dishs = ['타파스-1'];
    const menus = dishs.map((dish) => new Menu(dish));
    const order = new Menus(menus);
    const count = order.getTotalCount();
    expect(count).toBe(1);
  });
  test('isIncludedCategory 테스트 true 일때', () => {
    const dishs = ['타파스-1', '해산물파스타-2', '초코케이크-1'];
    const menus = dishs.map((dish) => new Menu(dish));
    const order = new Menus(menus);
    const isIncluded = order.isIncludedCategory('mainCourses');
    expect(isIncluded).toBeTruthy();
  });
  test('isIncludedCategory 테스트 false 일 때 ', () => {
    const dishs = ['샴페인-1', '해산물파스타-2'];
    const menus = dishs.map((dish) => new Menu(dish));
    const order = new Menus(menus);
    const isIncluded = order.isIncludedCategory('desserts');
    expect(isIncluded).toBe(false);
  });
});

import Menu from '../src/domain/Menu.js';
import Menus from '../src/domain/Menus.js';

const INVALID_ORDER_MESSAGE = '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.';

describe('Menus 테스트', () => {
  test('음료만 주문 시, 에러 처리한다.', () => {
    expect(() => {
      const dishs = ['제로콜라-2', '레드와인-3', '샴페인-2'];
      const menus = dishs.map((dish) => new Menu(dish));
      new Menus(menus);
    }).toThrow(INVALID_ORDER_MESSAGE);
  });
});

// [x] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.
// - [x] 음료만 주문 시, 주문할 수 없습니다.
// - [x] 중복 메뉴를 입력한 경우(e.g. 시저샐러드-1,시저샐러드-1), "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."라는 에러 메시지를 보여 준다.

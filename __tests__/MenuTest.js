import Menu from '../src/domain/Menu.js';

const INVALID_ORDER_MESSAGE =
  '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.';

describe('메뉴 형식 테스트', () => {
  test.each([['티본스테이크+3'], ['해산물파스타--4']])(
    '-로 구분하여 메뉴를 입력하지 않으면, 예외가 발생한다.',
    (input) => {
      expect(() => {
        new Menu(input);
      }).toThrow(INVALID_ORDER_MESSAGE);
    }
  );
});

describe('메뉴 갯수 테스트', () => {
  test.each([
    ['초코케이크-0'],
    ['양송이수프-2.4'],
    ['아이스크림-^^df'],
    ['크리스마스파스타-21'],
  ])('숫자에 대한 예외 처리', (input) => {
    expect(() => {
      new Menu(input);
    }).toThrow(INVALID_ORDER_MESSAGE);
  });
});

describe('메뉴 이름 테스트', () => {
  test('메뉴판에 없는 메뉴를 입력하는 경우, 에외가 발생한다.', () => {
    expect(() => {
      new Menu('시카고피자-10');
    }).toThrow(INVALID_ORDER_MESSAGE);
  });
  test('메뉴를 띄어쓰며 작성했다면 공백을 제거한다.', () => {
    const menu = new Menu('   바 비큐 립  - 10');
    const result = menu.getdish();

    expect(result).toBe('바비큐립');
  });
});

describe('Menu 내부 메서드 테스트', () => {
  test('findCategory 메서드', () => {
    const menu = new Menu('   시저 샐러드 - 3');
    const category = menu.findCategory();

    expect(category).toBe('appetizers');
  });
  test('getPrice 메서드', () => {
    const menu = new Menu('   아이 스크림  - 2');
    const price = menu.getPrice();

    expect(price).toBe(10000);
  });
});

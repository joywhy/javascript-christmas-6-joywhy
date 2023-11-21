import Event from '../src/domain/Event.js';
import Menu from '../src/domain/Menu.js';
import Menus from '../src/domain/Menus.js';
import ReservationDate from '../src/domain/ReservationDate.js';

describe('Event 테스트', () => {
  test('이벤트 해택을 받을 수 있는 금액인지 검증한다.', () => {
    const dishs = ['아이스크림-1'];
    const menus = dishs.map((dish) => new Menu(dish));
    const order = new Menus(menus);
    const date = new ReservationDate('4');
    const event = new Event(date, order);
    const isApplicable = event.isEventApplicable();
    expect(isApplicable).toBe(false);
  });
});

describe('getEventBadge 테스트', () => {
  test('총 해택금액에 따른 뱃지를 부여한다. 5천 원 이상: 별', () => {
    const dishs = ['레드와인-1', '초코케이크-2'];
    const menus = dishs.map((dish) => new Menu(dish));
    const order = new Menus(menus);
    const date = new ReservationDate('24');
    const event = new Event(date, order);
    const badge = event.getEventBadge();
    expect(badge).toBe('별');
  });
  test('총 해택금액에 따른 뱃지를 부여한다.', () => {
    const dishs = ['타파스-2', '레드와인-1'];
    const menus = dishs.map((dish) => new Menu(dish));
    const order = new Menus(menus);
    const date = new ReservationDate('29');
    const event = new Event(date, order);
    const badge = event.getEventBadge();
    expect(badge).toBe('없음');
  });
  test('총 해택금액에 따른 뱃지를 부여한다.', () => {
    const dishs = ['타파스-2', '티본스테이크-1', '해산물파스타-4'];
    const menus = dishs.map((dish) => new Menu(dish));
    const order = new Menus(menus);
    const date = new ReservationDate('23');
    const event = new Event(date, order);
    const badge = event.getEventBadge();
    expect(badge).toBe('산타');
  });
  test('총 해택금액에 따른 뱃지를 부여한다.', () => {
    const dishs = ['타파스-2', '티본스테이크-1', '아이스크림-3'];
    const menus = dishs.map((dish) => new Menu(dish));
    const order = new Menus(menus);
    const date = new ReservationDate('25');
    const event = new Event(date, order);
    const badge = event.getEventBadge();
    expect(badge).toBe('트리');
  });
});

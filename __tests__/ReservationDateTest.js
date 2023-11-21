import ReservationDate from '../src/domain/ReservationDate.js';

const INVALID_notRange_MESSAGE = '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.';

describe('ReservationDate 테스트', () => {
  test.each(['0', '-1', '32', '2.4', '한글', 'dfdf'])(
    '1~31사이의 정수를 입력하지 않으면 예외가 발생한다.',
    (input) => {
      expect(() => {
        new ReservationDate(input);
      }).toThrow(INVALID_notRange_MESSAGE);
    },
  );

  test('getbenefitDetails 메서드 평일일때 ', () => {
    const date = new ReservationDate('24');
    const details = date.getbenefitDetails();

    expect(details).toEqual({
      isWeekend: false,
      isChristmasDday: true,
      isSpecialDay: true,
      isWeekday: true,
    });
  });
  test('getbenefitDetails 메서드 주말일때', () => {
    const date = new ReservationDate('29');
    const details = date.getbenefitDetails();

    expect(details).toEqual({
      isWeekend: true,
      isChristmasDday: false,
      isSpecialDay: false,
      isWeekday: false,
    });
  });
});

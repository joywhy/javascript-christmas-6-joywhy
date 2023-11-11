const MESSAGES = Object.freeze({
  IntroductionToEventPlanner: `안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.`,
});

const INPUT_QUERY_MESSAGES = Object.freeze({
  date: `12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n`,
});
const ERROR_MESSAGES = Object.freeze({
  emptyString: '사용자의 입력이 없습니다.',
  notInteger: '정수가 아닙니다.',
  notRange: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',

  incorrectUnit: '단위가 맞지 않습니다.',
  notANumber: '숫자가 아닙니다.',
  zero: '0은 유효한 금액이 아닙니다.',
});
// const WINNING_PRICE = {
//   threePoint: 5000,
//   fourPoint: 50000,
//   fivePoint: 1500000,
//   fivePointAndBonus: 30000000,
//   sixPoint: 2000000000,
// };

const DATE_RANGE = Object.freeze({
  to: 1,
  from: 31,
});
const WEEKEND = Object.freeze({
  friday: 5,
  saturday: 6,
});
const CHRISTMAS = 25;
export {
  MESSAGES,
  INPUT_QUERY_MESSAGES,
  ERROR_MESSAGES,
  DATE_RANGE,
  WEEKEND,
  CHRISTMAS,
};

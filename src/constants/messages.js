const MESSAGES = Object.freeze({
  introductionToEventPlanner: `안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.`,
  benefitsPreview: '12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
  orderedMenu: '\n<주문 메뉴>',
  subtotalBeforeDiscount: '\n<할인 전 총주문 금액>',
  giftedMenu: '\n<증정 메뉴>',
  benefitsDetails: '\n<혜택 내역>',
  totalBenefitsAmount: '\n<총혜택 금액>',
  estimatedPaymentAmount: '\n<할인 후 예상 결제 금액>',
  eventBadge: '\n<12월 이벤트 배지>',
});

const INPUT_QUERY_MESSAGES = Object.freeze({
  date: `12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n`,
  order: `주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n`,
});
const ERROR_MESSAGES = Object.freeze({
  emptyString: '사용자의 입력이 없습니다.',
  notInteger: '정수가 아닙니다.',
  notRange: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  otherFormat: '유효하지 않은 주문입니다. 다시 입력해 주세요.',

  incorrectUnit: '단위가 맞지 않습니다.',
  notANumber: '숫자가 아닙니다.',
  zero: '0은 유효한 금액이 아닙니다.',
});

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

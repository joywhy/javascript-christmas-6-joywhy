import { Console } from '@woowacourse/mission-utils';
import { MESSAGES } from '../constants/messages.js';

const OutputView = {
  print(message) {
    Console.print(message);
  },
  printOrderedMenuTitle() {
    Console.print(MESSAGES.orderedMenu);
  },
  printSubtotalBFDiscountTitle() {
    Console.print(MESSAGES.subtotalBeforeDiscount);
  },
  printGiftedMenu() {
    Console.print(MESSAGES.giftedMenu);
  },
  printBenefitsDetailsTitle() {
    Console.print(MESSAGES.benefitsDetails);
  },
  printTotalBenefitsAmount() {
    Console.print(MESSAGES.totalBenefitsAmount);
  },
  printEstimatedPaymentAmount() {
    Console.print(MESSAGES.estimatedPaymentAmount);
  },
  printEventBadge() {
    Console.print(MESSAGES.eventBadge);
  },

  printIntroduction() {
    Console.print(MESSAGES.introductionToEventPlanner);
  },
  printBenefitsPreview(date) {
    Console.print(`12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`);
  },

  printError(error) {
    Console.print(error.message);
  },
};

export default OutputView;

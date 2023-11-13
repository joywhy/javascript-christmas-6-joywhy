import { Console } from '@woowacourse/mission-utils';
import { MESSAGES } from '../constants/messages.js';
const OutputView = {
  printOrderedMenu(menu) {
    Console.print(MESSAGES.orderedMenu);
    Console.print(menu);
  },
  printSubtotalBFDiscount(amount) {
    Console.print(MESSAGES.subtotalBeforeDiscount);
    Console.print(`${amount}원`);
  },
  printGiftedMenu(gift) {
    Console.print(MESSAGES.giftedMenu);
    Console.print(gift);
  },
  printBenefitsDetails(benefit) {
    Console.print(MESSAGES.benefitsDetails);
    Console.print(benefit);
  },
  printTotalBenefitsAmount(price) {
    Console.print(MESSAGES.totalBenefitsAmount);
    Console.print(`${price}원`);
  },
  printEstimatedPaymentAmount(price) {
    Console.print(MESSAGES.estimatedPaymentAmount);
    Console.print(`${price}원`);
  },
  printEventBadge(badge) {
    Console.print(MESSAGES.eventBadge);
    Console.print(badge);
  },

  printIntroduction() {
    Console.print(MESSAGES.introductionToEventPlanner);
  },
  printBenefitsPreview() {
    Console.print(MESSAGES.benefitsPreview);
  },

  printError(error) {
    Console.print(error.message);
  },
  // ...
};

export default OutputView;

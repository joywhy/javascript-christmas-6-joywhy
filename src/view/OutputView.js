import { Console } from '@woowacourse/mission-utils';
import { MESSAGES } from '../constants/messages.js';
const OutputView = {
  print(message) {
    Console.print(message);
  },
  printOrderedMenu() {
    Console.print(MESSAGES.orderedMenu);
  },
  printSubtotalBFDiscount() {
    Console.print(MESSAGES.subtotalBeforeDiscount);
    // Console.print(`${amount}원`);
  },
  printGiftedMenu(message) {
    Console.print(MESSAGES.giftedMenu);
    Console.print(message);
  },
  printBenefitsDetails() {
    Console.print(MESSAGES.benefitsDetails);
    // Console.print(benefit);
  },
  printTotalBenefitsAmount() {
    Console.print(MESSAGES.totalBenefitsAmount);
    // Console.print(`${price}원`);
  },
  printEstimatedPaymentAmount() {
    Console.print(MESSAGES.estimatedPaymentAmount);
    // Console.print(`${price}원`);
  },
  printEventBadge() {
    Console.print(MESSAGES.eventBadge);
    // Console.print(badge);
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

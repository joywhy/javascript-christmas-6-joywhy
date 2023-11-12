import { Console } from '@woowacourse/mission-utils';
import { MESSAGES } from '../constants/messages.js';
const OutputView = {
  printMenu() {
    Console.print('<주문 메뉴>');
    // ...
  },
  printIntroduction() {
    Console.print(MESSAGES.IntroductionToEventPlanner);
  },
  printError(message) {
    Console.print(message);
  },
  // ...
};

export default OutputView;

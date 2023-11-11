import { Console } from '@woowacourse/mission-utils';
import { INPUT_QUERY_MESSAGES } from '../constants/index.js';
import Validator from '../utils/Validator.js';
const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(INPUT_QUERY_MESSAGES.date);
    Validator.validateUserInput(input);
    return input;
  },
  // ...
  // async readLineAsync(message) {
  //   const userInput = await Console.readLineAsync(message);
  //   Validator.validateUserInput(userInput);
  //   return userInput;
  // },
};

export default InputView;

import { Console } from '@woowacourse/mission-utils';
import { INPUT_QUERY_MESSAGES } from '../constants/messages.js';
import Validator from '../utils/Validator.js';
const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(INPUT_QUERY_MESSAGES.date);
    Validator.validateUserInput(input);
    return input;
  },
  async readOrder() {
    const input = await Console.readLineAsync(INPUT_QUERY_MESSAGES.order);
    Validator.validateUserInput(input);
    return input;
  },
};

export default InputView;

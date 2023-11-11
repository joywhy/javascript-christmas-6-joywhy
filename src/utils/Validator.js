import { ERROR_MESSAGES } from '../constants/index.js';
import InputError from '../error/InputError.js';

const Validator = {
  emptyString: '',
  isEmptyString(value) {
    return value === this.emptyString;
  },
  isSpace(value) {
    return String(value).trim() === this.emptyString;
  },

  validateUserInput(value) {
    if (this.isEmptyString(value) || this.isSpace(value)) {
      throw new InputError(ERROR_MESSAGES.emptyString);
    }
  },
  isRange(from, to, value) {
    const numbers = Array(to)
      .fill(0)
      .map((_, index) => index + from);

    const isValid = numbers.some((num) => num === value);

    if (!isValid) {
      throw new InputError(ERROR_MESSAGES.notRange);
    }
  },
  isInteger(num) {
    if (typeof num === 'number' && num % 1 === 0) {
      return true;
    }
    throw new InputError(ERROR_MESSAGES.notInteger);
  },
};

export default Validator;

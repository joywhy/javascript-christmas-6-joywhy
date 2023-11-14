const Parser = {
  stringToArray(value, delimiter) {
    const splitted = value.split(delimiter).map((str) => str.trim());
    return splitted;
  },
  removeSpace(str) {
    return str.replace(/\s+/g, '');
  },
  toCommaSeparated(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
};
export default Parser;

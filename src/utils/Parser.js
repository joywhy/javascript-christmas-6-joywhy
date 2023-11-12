const Parser = {
  stringToArray(value, delimiter) {
    const splitted = value.split(delimiter).map((str) => str.trim());
    return splitted;
  },
  removeSpace(str) {
    return str.replace(/\s+/g, '');
  },
};
export default Parser;

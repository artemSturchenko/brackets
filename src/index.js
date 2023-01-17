module.exports = function check(str, bracketsConfig) {
const open = [],
    close = [],
    stack = [],
    cache = [],
    strArray = str.split(""),
    config = bracketsConfig.flat(Infinity);
  for (let q = 0; q < config.length; q++) {
    if (q % 2 !== 0) {
      close.push(config[q]);
    } else {
      open.push(config[q]);
    }
  }
  for (let i = 0; i < strArray.length; i++) {
    outer: for (let j = 0; j < open.length; j++) {
      if (open[j] === close[j]) {
        if (strArray[i] === cache[cache.length - 1]) {
          stack.pop();
          cache.pop();
        } else {
          stack.push(strArray[i]);
          cache.push(strArray[i]);
        }
        break outer;
      } else if (strArray[i] === open[j]) {
        stack.push(strArray[i]);
        break outer;
      } else if (strArray[i] === close[j]) {
        let index = config.indexOf(close[j]);
        let tmp = config[index - 1];

        if (tmp !== stack.pop()) return false;
        break outer;
      }
    }
  }

  return stack.length === 0 ? true : false;
}

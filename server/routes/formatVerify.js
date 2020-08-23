function formatVerify(target) {
  if (target >= 10) {
    return target;
  } else {
    return "0" + target;
  }
}
module.exports = {
  formatVerify,
};

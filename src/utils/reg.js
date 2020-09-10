function pass(value) {
  let reg = /^[a-zA-Z0-9]{6,8}$/;
  if (!reg.test(value)) {
    return false;
  } else {
    return true;
  }
}
export { pass };

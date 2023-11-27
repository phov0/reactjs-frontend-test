// string
export const removeNonDigitsFromString = (s) => {
  if (!s) return s;
  return s.replace(/\D/g, "");
};
export const getValueFromObject = (obj, name, defaultValue) => {
  if (!!obj && !!name) {
    const paths = name.split(/[,[\].]+?/);
    let p = 0;
    while (obj && p < paths.length) {
      obj = obj[paths[p++]];
    }
    return obj === undefined ? defaultValue : obj;
  }

  return undefined;
};

/**
 * @author Kingsley Victor
 */
export class Keys {
  /**
   *
   * @param {*} body
   * @param {string[]} keys
   * @return {boolean}
   */
  static contains(body, keys) {
    return keys.every((value) => {
      return Object.keys(body).some((key) => {
        return key === value;
      });
    });
  }

  /**
   *
   * @param {string} key
   * @param {string} type
   * @return {boolean}
   */
  static isOfType(key, type) {
    return typeof key === type;
  }

  /**
   *
   * @param {*} body
   * @param {string[]} keys
   * @return {string[]}
   */
  static missing(body, keys) {
    const missing = [];
    Object.keys(body).forEach((value) => {
      const isPresent = keys.some((key) => {
        return key === value;
      });
      if (!isPresent) {
        missing.push(value);
      }
    });
    return missing;
  }

  /**
   *
   * @param {*} body
   * @param {string[]} nonNullableKeys
   * @return {boolean}
   */
  static isNotNull(body, nonNullableKeys) {
    return nonNullableKeys.every((key) => {
      return ((body[key] !== null) || (typeof body[key] !== 'undefined'));
    });
  }

  /**
   *
   * @param {*} body
   * @param {*} config
   * @return {boolean}
   */
  static keysAreOfTypes(body, config) {
    return Object.keys(config).every((key) => {
      return typeof body[key] === config[key];
    });
  }
}

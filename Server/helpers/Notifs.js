export class Notifs {
  missingKeys(obj, keys) {
    const missingKeys = [];
    keys.forEach(
        (key) => {
          if (!obj.hasProperty(key)) {
            missingKeys.push(key);
          }
        });
    return missingKeys;
  }

  async showMissingKeys(res, body, keys) {
    await res.status(400).json({
      status: 400,
      error: `Body is missing keys: ${this.missingKeys(body, keys)}`
    });
  }
}

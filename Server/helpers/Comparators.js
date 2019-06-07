import {compareSync} from 'bcryptjs';

export class Comparators {
  comparePassword(raw, hash) {
    return compareSync(raw, hash);
  }

  hasKeys(obj, keys) {
    return keys.every(
        (key) => {
          return Object.keys(obj).some(
              (objectKey) => objectKey === key
          );
        }
    );
  }
}

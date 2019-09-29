import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../env';

/**
 * @author Kingsley Victor
 */
export class Encryptions {
  /**
   *
   * @param {string} str
   * @param {string} hash
   * @return {boolean}
   */
  static compare(str, hash) {
    return bcrypt.compareSync(str, hash);
  }

  /**
   *
   * @param {*} payload
   * @return {string}
   */
  static tokenize(payload) {
    return jwt.sign(payload, env.jwt_secret, {
      expiresIn: 72 * 60 * 60
    });
  }
}

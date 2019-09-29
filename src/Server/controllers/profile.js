import db from '../db';

const {models: {
  Profile
}} = db;

/**
 * @author Kingsley Victor
 */
export default class ProfileController {
  /**
   * 
   * @param {Request} req 
   * @param {Response} res 
   */
  static async create(req, res) {
    try {
      const {user, body} = req;
      body.owner = user._id;
      const data = await new Promise((resolve) => {
        Profile.create(body).then((profile) => {
          resolve(profile);
        });
      });
      res.status(201).json({
        status: 201,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }

  /**
   * 
   * @param {Request} req 
   * @param {Response} res 
   */
  static async update(req, res) {
    try {
      const {user, body} = req;
      const data = await new Promise((resolve) => {
        Profile.updateByOwner(user._id, body).then((profile) => {
          resolve(profile);
        });
      });
      res.status(200).json({
        status: 200,
        data
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      });
    }
  }
}

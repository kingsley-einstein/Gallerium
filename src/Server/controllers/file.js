import db from '../db';

const {
  models: {
    FileItem
  }
} = db;

/**
 * @author Kingsley Victor
 */
export default class FileController {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async create(req, res) {
    try {
      const {files} = req;
      const items = Array.from(files);
      const data = await new Promise((resolve) => {
        FileItem.create(items).then((docs) => {
          resolve(docs);
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
  static async getAllByUser(req, res) {
    try {
      const {user} = req;
      const data = await new Promise((resolve) => {
        FileItem.findAllByOwner(user._id).then((file) => {
          resolve(file);
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

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async getAllByAnotherUser(req, res) {
    try {
      const {user_id} = req.params;
      const data = await new Promise((resolve) => {
        FileItem.findAllByOwner(user_id).then((files) => {
          resolve(files);
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

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  static async delete(req, res) {
    try {
      const {user} = req;
      const isDeleted = await new Promise((resolve) => {
        FileItem.deleteByOwner(user._id).then((ok) => {
          resolve(ok);
        });
      });
      if (!isDeleted) {
        res.status(500).json({
          status: 400,
          error: 'Deletion could not occur'
        });
        return;
      }
      res.status(200).json({
        status: 200,
        data: 'Successfully deleted items'
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
  static async deleteOne(req, res) {
    try {
      const {user, params} = req;
      const isDeleted = await new Promise((resolve) => {
        FileItem.deleteByOwnerAndId(user._id, params.file_id).then((ok) => {
          resolve(ok);
        });
      });
      if (!isDeleted) {
        res.status(500).json({
          status: 500,
          error: 'Could not perform deletion'
        });
        return;
      }
      res.status(200).json({
        status: 200,
        data: 'Successfully deleted item'
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
  static async getFile(req, res) {
    try {
      const {file_id} = req.params;
      const data = await new Promise((resolve) => {
        FileItem.findById(file_id).then((file) => {
          resolve(file);
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

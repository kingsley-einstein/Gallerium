import fs from 'fs';

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
export const parseFiles = (req, res, next) => {
  const {user, files, body: {
    caption,
    description
  }} = req;
  const parsedFiles = [];
  if (!files || files.length === 0) {
    res.status(400).json({
      status: 400,
      error: 'No files present in request'
    });
    return;
  }
  Array.from(files).forEach((file) => {
    const parsedFile = {
      caption,
      description,
      mimeType: file.mimetype,
      bytes: Buffer.from(fs.readFileSync(file.path)).toString('base64'),
      owner: user._id
    };
    parsedFiles.push(parsedFile);
    fs.unlinkSync(file.path);
  });
  req.files = parsedFiles;
  next();
};

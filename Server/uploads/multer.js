import multer from 'multer';
import cloudinaryStorage from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import Environment from '../environment';

const {cloud_name, api_key, api_secret, folder} = new Environment();

cloudinary.config({
  cloud_name,
  api_key,
  api_secret
});

const storage = cloudinaryStorage({
  cloudinary,
  folder,
  allowedFormats: ['jpg', 'gif', 'png', 'mp4', '3gp']
});

export const parser = multer({storage});

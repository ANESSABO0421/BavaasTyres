import cloudinary from "../utils/cloudinary.js";

export const uploadToCloudinary = (fileStream, folder = "inventory") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    fileStream.pipe(stream);
  });
};
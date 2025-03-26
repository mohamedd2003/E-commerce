import multer from "multer";
import AppError from "../utils/appError.js";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: 'dnmwmrxmr', 
    api_key: '586539159664933', 
    api_secret: 'NvfUL5qc6pWKBmar4PPc8uMPfes' 
});

// Multer configuration
export const fileUpload = () => {
    const storage = multer.diskStorage({});

    function fileFilter(req, file, cb) {
        // Check if the file is an image
        if (!file.mimetype.startsWith('image')) {
            return cb(new AppError('Only images are allowed', 401), false);
        }
        // Accept the file
        cb(null, true);
    }

    const upload = multer({ storage, fileFilter });

    return upload;
};

// Middleware for uploading a single file
export const uploadSingleFile = (fieldname) => fileUpload().single(fieldname);

// Middleware for uploading multiple files
export const uploadMixFiles = (arrayOfFields) => fileUpload().fields(arrayOfFields);

// Function to upload file to Cloudinary
export const uploadToCloudinary = async (filePath, public_id) => {
    try {
        // Set WebP conversion during upload
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            public_id
        });

//      let x=   cloudinary.url(uploadResult.public_id, {
//         fetch_format: 'webp',
//         quality: 'auto'
//     })
// console.log(x);


        return{ 
            url:uploadResult.secure_url, public_id: uploadResult.public_id}; // Return the secure URL of the uploaded image
    } catch (error) {
        throw new AppError('Failed to upload file to Cloudinary', 500);
    }
};





  
export const replaceCloudinaryImage = async (newFilePath, publicId) => {
  await cloudinary.v2.api.delete_resources([publicId]);
  const uploadResult = await cloudinary.uploader.upload(newFilePath, {
        public_id: publicId, // Use the same public_id to replace the image
    });
    return{ url:uploadResult.secure_url, 
        public_id: uploadResult.public_id}; 
 
};
export const deleteCloudinaryImage = async (publicId) => {
  await cloudinary.v2.api.delete_resources([publicId]);
 
};
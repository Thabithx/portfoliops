import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Check if Cloudinary is configured
const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && 
                               process.env.CLOUDINARY_API_KEY && 
                               process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Upload route
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // If Cloudinary is not configured, return base64 data URL
    if (!isCloudinaryConfigured) {
      const base64 = req.file.buffer.toString('base64');
      const dataUrl = `data:${req.file.mimetype};base64,${base64}`;
      
      return res.json({
        success: true,
        url: dataUrl,
        fallback: true,
        message: 'Cloudinary not configured, using base64 fallback'
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: 'portfolio-build-uploads',
        transformation: [
          { quality: 'auto', fetch_format: 'auto' },
          { width: 1920, height: 1080, crop: 'limit' }
        ]
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          // Fallback to base64 if Cloudinary fails
          const base64 = req.file.buffer.toString('base64');
          const dataUrl = `data:${req.file.mimetype};base64,${base64}`;
          
          return res.json({
            success: true,
            url: dataUrl,
            fallback: true,
            message: 'Cloudinary upload failed, using base64 fallback'
          });
        }
        
        res.json({
          success: true,
          url: result.secure_url,
          public_id: result.public_id,
          width: result.width,
          height: result.height
        });
      }
    );

    // Pipe the file buffer to the upload stream
    result.end(req.file.buffer);
  } catch (error) {
    console.error('Upload error:', error);
    // Fallback to base64 on any error
    if (req.file) {
      const base64 = req.file.buffer.toString('base64');
      const dataUrl = `data:${req.file.mimetype};base64,${base64}`;
      
      return res.json({
        success: true,
        url: dataUrl,
        fallback: true,
        message: 'Upload error, using base64 fallback'
      });
    }
    
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

export default router;

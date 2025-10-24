const { default: axios } = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Upload route
exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // Prepare form-data
    const form = new FormData();
    form.append("file", fs.createReadStream(file.path), file.originalname);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "react_uploads",
    });

    // Delete temp file
    fs.unlinkSync(file.path);
   res.json({
      message: "File uploaded successfully",
     data:{ url: result.secure_url,
     }// cloudinaryId: result.public_id,
    }).status(200)
  } catch (err) {
    console.error("Upload failed:", err.response?.data || err.message);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
}


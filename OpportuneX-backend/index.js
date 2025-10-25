
const express = require('express');
const { dbConnect } = require('./config/Database');
const { appConfig } = require('./config/AppConfig');
const { connection } = require('./config/redis');

const { sendVerificationMail } = require("./services/mailServices");
const Candidate = require('./models/candidate');

const startServer = async () => {
  // server app instance
  const app = express();
  // database connection
  await dbConnect();
  // App Default Config
  // try {
  //   const result = await Candidate.deleteMany({});
  //   console.log(`Deleted ${result.deletedCount} users`);
  // } catch (err) {
  //   console.error('Error deleting users:', err);
  // }
  await appConfig(app);

};
startServer();

// const express = require('express');
// const multer = require('multer');
// const pdfParse = require('pdf-parse');
// const fs = require('fs');
// const cors = require('cors');
// const app = express();
// const port = 3000;

// // Set up multer for handling file uploads
// const upload = multer({ dest: 'uploads/' });

// app.use(cors());
// app.use(express.json());

// // Endpoint to handle PDF upload and parsing

// app.post('/upload', upload.single('pdf'), async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     const dataBuffer = fs.readFileSync(filePath);

//     const data = await pdfParse(dataBuffer);
    
//     // Delete the uploaded file after parsing
//     fs.unlinkSync(filePath);

//     res.json({
//       success: true,
//       text: data.text,
//       numpages: data.numpages,
//       metadata: data.metadata
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server listening on http://localhost:${port}`);
// });

import { IncomingForm } from 'formidable';
import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

// Configure AWS
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error parsing the file' });
      return;
    }

    if (!files.file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }

    try {
      const file = files.file[0];
      const fileContent = fs.readFileSync(file.filepath);
      
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: path.basename(file.filepath),
        Body: fileContent,
        ContentType: file.mimetype,
      };

      const data = await s3.upload(params).promise();
      res.status(200).json({ success: true, url: data.Location });
    } catch (uploadError) {
      res.status(500).json({ success: false, message: 'Error uploading the file' });
    }
  });
};

import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'public/uploads');
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error parsing the file' });
      return;
    }

    if (!files.file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }

    const filePath = files.file[0].filepath;
    const fileName = path.basename(filePath);
    const fileUrl = `/uploads/${fileName}`;

    res.status(200).json({ success: true, url: fileUrl });
  });
};

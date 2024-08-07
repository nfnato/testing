import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'public/uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

export const config = {
    api: {
        bodyParser: false
    }
};

export default function handler(req, res) {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: 'File upload error' });
        }

        const file = files.file[0];
        const filename = path.basename(file.filepath);
        const randomNumber = Math.floor(Math.random() * 1000000);

        res.status(200).json({ filename, randomNumber });
    });
}

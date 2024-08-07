const { parse } = require('url');
const { randomInt } = require('crypto');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { url } = req.body;

    try {
      const parsedUrl = new URL(url);
      const filename = path.basename(parsedUrl.pathname);
      const randomNumber = randomInt(1000000);
      const shortUrl = `https://testing-625n.vercel.app/files/${randomNumber}/${filename}`;

      // Save the Lua file to the appropriate directory
      const filePath = path.join(__dirname, '..', 'public', 'files', `${randomNumber}`, filename);
      const fileDir = path.dirname(filePath);

      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true });
      }

      const response = await fetch(url);
      const fileData = await response.buffer();

      fs.writeFileSync(filePath, fileData);

      res.status(200).json({ shortUrl });
    } catch (error) {
      res.status(400).json({ error: 'Invalid URL' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

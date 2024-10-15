const sharp = require('sharp');

const resizeImage = async (buffer) => {
  return sharp(buffer)
    .resize({ width: 200, height: 200, fit: 'cover' })
    .png()
    .toBuffer();
};

module.exports = resizeImage;

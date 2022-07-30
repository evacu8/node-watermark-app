const Jimp = require('jimp');

exports.invertColors = async function(inputFile, tempFile) {
  try {
    const image = await Jimp.read(inputFile);
    image.invert();
    image.quality(100).write(tempFile);
    console.log("Colors inverted successfully!");
  }
  catch {
    console.log('Something went wrong... Try again');
  }
};
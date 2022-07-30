const Jimp = require('jimp');

exports.changeToBW = async function(inputFile, tempFile) {
  try {
    const image = await Jimp.read(inputFile);
    image.greyscale();
    image.quality(100).write(tempFile);
    console.log("Changed to greyscale successfully!");
  }
  catch {
    console.log('Something went wrong... Try again');
  }
};
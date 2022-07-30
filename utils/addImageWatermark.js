const Jimp = require('jimp');

exports.addImageWatermarkToImage = async function(inputFile, outputFile, watermarkFile) {
  try {
    const image = await Jimp.read(inputFile);
    const watermark = await Jimp.read(watermarkFile);
    const x = image.getWidth() / 2 - watermark.getWidth() / 2;
    const y = image.getHeight() / 2 - watermark.getHeight() / 2;
    
    image.composite(watermark, x, y, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 0.3,
    });
    await image.quality(100).writeAsync(outputFile);
    console.log("Watermark added successfully!");
    startApp();
  }
  catch {
    console.log('Something went wrong... Try again3');
  }
};
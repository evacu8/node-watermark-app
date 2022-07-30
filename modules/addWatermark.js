const inquirer = require('inquirer');
const { existsSync } = require('node:fs');
const { addTextWatermarkToImage } = require('./addTextWatermark');
const { addImageWatermarkToImage } = require('./addImageWatermark');

exports.addWatermark = async(inputFilePath, outputFilePath) => {
  const options = await inquirer.prompt([
    {
      name: 'watermarkType',
      type: 'list',
      choices: ['Text watermark', 'Image watermark'],
    }]);

  if(options.watermarkType === 'Text watermark') {
    const text = await inquirer.prompt([{
      name: 'value',
      type: 'input',
      message: 'Type your watermark text:',
    }]);
    options.watermarkText = text.value;
    if(existsSync(inputFilePath)) {
      const addTextWatermark = await addTextWatermarkToImage(inputFilePath, outputFilePath, options.watermarkText);
      if (addTextWatermark) {
        return true
      }
    } else {
      console.log('Something went wrong... Try again')
    }
  }
  else {
    const image = await inquirer.prompt([{
      name: 'filename',
      type: 'input',
      message: 'Type your watermark name:',
      default: 'logo.png',
    }]);
    options.watermarkImage = image.filename;
    
    if(existsSync(inputFilePath) && existsSync(`./img/${options.watermarkImage}`)) {
      const addImageWatermark = await addImageWatermarkToImage(inputFilePath, outputFilePath, './img/' + options.watermarkImage);
      if (addImageWatermark) {
        return true
      }
    } else {
      console.log('Something went wrong... Try again')
    } 
  }
}
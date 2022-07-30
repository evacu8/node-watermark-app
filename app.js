const inquirer = require('inquirer');
const { existsSync } = require('node:fs');
const { addTextWatermarkToImage } = require('./modules/addTextWatermark');
const { addImageWatermarkToImage } = require('./modules/addImageWatermark');
const { prepareOutputFilename } = require('./modules/prepareOutputFilename');
const { prepareTempFilename } = require('./modules/prepareTempFilename');
const { handleEdition } = require('./modules/handleEdition');

const startApp = async () => {

  const addWatermark = async(options, inputFilePath, outputFilePath) => {
    if(options.watermarkType === 'Text watermark') {
      const text = await inquirer.prompt([{
        name: 'value',
        type: 'input',
        message: 'Type your watermark text:',
      }]);
      options.watermarkText = text.value;
      if(existsSync(`./img/${initialData.inputImage}`)) {
        const addTextWatermark = await addTextWatermarkToImage(inputFilePath, outputFilePath, options.watermarkText);
        if (addTextWatermark) {
          startApp();
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
          startApp();
        }
      } else {
        console.log('Something went wrong... Try again')
      } 
    }
  }

  const answer = await inquirer.prompt([{
      name: 'start',
      message: 'Hi! Welcome to "Watermark manager". Copy your image files to `/img` folder. Then you\'ll be able to use them in the app. Are you ready?',
      type: 'confirm'
    }]);

  if(!answer.start) process.exit();

  const initialData = await inquirer.prompt([{
    name: 'inputImage',
    type: 'input',
    message: 'What file do you want to mark?',
    default: 'test.jpg',
  },
  {
    name: 'additionalOperations',
    type: 'confirm',
    message: 'Would you like to perform additional editing of your image?'
  }]);

  const inputFile = initialData.inputImage;
  const inputFilePath = `./img/${inputFile}`;
  const outputFilePath = `./img/${prepareOutputFilename(inputFile)}`;
  const tempFilePath = `./img/${prepareTempFilename(inputFile)}`;

  if(!initialData.additionalOperations) {
    const options = await inquirer.prompt([
    {
      name: 'watermarkType',
      type: 'list',
      choices: ['Text watermark', 'Image watermark'],
    }]);
    addWatermark(options, inputFilePath, outputFilePath);
  } else {
    handleEdition(inputFilePath, tempFilePath);
  }  
}

startApp();



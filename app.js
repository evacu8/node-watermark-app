const inquirer = require('inquirer');
const { existsSync } = require('node:fs');
const { addTextWatermarkToImage } = require('./utils/addTextWatermark');
const { addImageWatermarkToImage } = require('./utils/addImageWatermark');

const startApp = async () => {

  const prepareOutputFilename = (inputFilename) => {
    const [filename, extension] = inputFilename.split('.');
    return `${filename}-with-watermark.${extension}`;
  }

  const addWatermark = async(options, operation) => {
    if(options.watermarkType === 'Text watermark') {
      const text = await inquirer.prompt([{
        name: 'value',
        type: 'input',
        message: 'Type your watermark text:',
      }]);
      options.watermarkText = text.value;
      if(existsSync(`./img/${operation.inputImage}`)) {
        addTextWatermarkToImage('./img/' + operation.inputImage, './img/' + prepareOutputFilename(operation.inputImage), options.watermarkText);
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
      
      if(existsSync(`./img/${options.inputImage}`) && existsSync(`./img/${options.watermarkImage}`)) {
        addImageWatermarkToImage('./img/' + options.inputImage, './img/' + prepareOutputFilename(options.inputImage), './img/' + options.watermarkImage);
      } 
      else console.log('Something went wrong... Try again')
    }
  }

    const answer = await inquirer.prompt([{
        name: 'start',
        message: 'Hi! Welcome to "Watermark manager". Copy your image files to `/img` folder. Then you\'ll be able to use them in the app. Are you ready?',
        type: 'confirm'
      }]);

    if(!answer.start) process.exit();

    const operation = await inquirer.prompt([{
      name: 'inputImage',
      type: 'input',
      message: 'What file do you want to mark?',
      default: 'test.jpg',
    },
    {
      name: 'additionalOperation',
      type: 'confirm',
      message: 'Would you like to perform additional editing of your image?'
    }]);

    if(!operation.additionalOperation) {
      const options = await inquirer.prompt([
      {
        name: 'watermarkType',
        type: 'list',
        choices: ['Text watermark', 'Image watermark'],
      }]);
      addWatermark(options, operation);
    } else {
      console.log('make another operation');
    }  
}

startApp();



const inquirer = require('inquirer');
const { prepareOutputFilename } = require('./modules/prepareOutputFilename');
const { prepareTempFilename } = require('./modules/prepareTempFilename');
const { handleEdition } = require('./modules/handleEdition');
const { addWatermark } = require('./modules/addWatermark');

const startApp = async () => {

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
    addWatermark(inputFilePath, outputFilePath);
    if(addWatermark()){
      startApp();
    }
  } else {
    handleEdition(inputFilePath, tempFilePath, outputFilePath);
  }  
}

startApp();



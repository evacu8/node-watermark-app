const inquirer = require('inquirer');
const { changeBrightness } = require('./changeBrightness');
const { changeContrast } = require('./changeContrast');
const { changeToBW } = require('./changeToBW');
const { invertColors } = require('./invertColors');
const { addWatermark } = require('./addWatermark');


exports.handleEdition = async(inputFile, tempFile, outputFile) => {
  const editOptions = await inquirer.prompt([
    {
      name: 'editionType',
      type: 'list',
      choices: ['Change brightness', 'Change contrast', 'Make image black & white', 'Invert colors']
    }
  ])
  if(editOptions.editionType === 'Change brightness') {
    await changeBrightness(inputFile, tempFile);
  } else if(editOptions.editionType === 'Change contrast') {
    await changeContrast(inputFile, tempFile);
  } else if(editOptions.editionType === 'Make image black & white') {
    await changeToBW(inputFile, tempFile);
  } else if(editOptions.editionType === 'Invert colors') {
    await invertColors(inputFile, tempFile);
  }
  addWatermark(tempFile, outputFile);
}

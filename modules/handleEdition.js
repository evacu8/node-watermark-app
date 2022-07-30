const inquirer = require('inquirer');
const { changeBrightness } = require('./changeBrightness');

exports.handleEdition = async(inputFile, tempFile) => {
  const editOptions = await inquirer.prompt([
    {
      name: 'editionType',
      type: 'list',
      choices: ['Change brightness', 'Change contrast']
    }
  ])
  if(editOptions.editionType === 'Change brightness') {
    changeBrightness(inputFile, tempFile);
  } else if(editOptions.editionType === 'Change contrast') {
    console.log('Change contrast');
  }

}

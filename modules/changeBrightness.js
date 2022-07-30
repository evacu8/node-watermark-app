const Jimp = require('jimp');
const inquirer = require('inquirer');

exports.changeBrightness = async function(inputFile, tempFile) {
  const brightness = await inquirer.prompt([{
    name: 'value',
    type: 'input',
    message: 'Type brightness value from -1 to +1',
  }]);
  if(brightness.value >= -1 && brightness.value <=1){
    try {
      const image = await Jimp.read(inputFile);
      const br = brightness.value;
      image.brightness(+br);
      image.quality(100).write(tempFile);
      console.log("Brightness changed successfully!");
    }
    catch {
      console.log('Something went wrong... Try again');
    }
  } else {
    console.log('provide proper value');
  }
};
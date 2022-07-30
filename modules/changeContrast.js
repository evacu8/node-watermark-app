const Jimp = require('jimp');
const inquirer = require('inquirer');

exports.changeContrast = async function(inputFile, tempFile) {
  const contrast = await inquirer.prompt([{
    name: 'value',
    type: 'input',
    message: 'Type contrast value from -1 to +1',
  }]);
  if(contrast.value >= -1 && contrast.value <=1){
    try {
      const image = await Jimp.read(inputFile);
      const cr = contrast.value;
      image.contrast(+cr);
      image.quality(100).write(tempFile);
      console.log("Contrast changed successfully!");
    }
    catch {
      console.log('Something went wrong... Try again');
    }
  } else {
    console.log('provide proper value');
  }
};
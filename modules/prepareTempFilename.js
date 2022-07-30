exports.prepareTempFilename = (inputFilename) => {
  const [filename, extension] = inputFilename.split('.');
  return `${filename}-temp.${extension}`;
}
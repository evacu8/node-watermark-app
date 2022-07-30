exports.prepareOutputFilename = (inputFilename) => {
  const [filename, extension] = inputFilename.split('.');
  return `${filename}-with-watermark.${extension}`;
}
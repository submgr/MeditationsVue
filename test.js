const path = require('path')
const fs = require('fs')

const directoryPath = path.join(__dirname, 'dist', 'img')
const endDirectoryPath = path.join(__dirname, 'dist', 'img-new')

fs.rmSync(directoryPath, { recursive: true, force: true }, function (err) {
    if (err) console.error(err)
  });
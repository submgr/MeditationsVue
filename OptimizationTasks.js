// automation tools to optimize image sizes by compression
// by Aram Virabyan
// 26.07.2023
// modes: 1 - Image Optimization

console.log("Running Optimization Tasks...")

console.log("[1/1] Compressing Images...")

const path = require('path')
const fs = require('fs-extra')
const sharp = require("sharp")

// dir where we are looking for!
const directoryPath = path.join(__dirname, 'dist', 'img')
const endDirectoryPath = path.join(__dirname, 'dist', 'img-new')
const util = require('util')

var overallFilesSizesOnstart = 0
var overallFilesSizesOnend = 0

// let's create new folder to store compressed images temporarily
const tempImgFolder = path.join("dist", "img-new")
fs.mkdirSync(tempImgFolder, { recursive: true })

let images = []
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err)
  }
  files.forEach((file) => {
    console.log(file.split('.').pop())
    if (file.split('.').pop() === 'jpg' || file.split('.').pop() === 'webp' || file.split('.').pop() === 'png') {
      const imgpath = path.join(directoryPath, file)
      images.push({ path: imgpath, type: file.split('.').pop() })
      var stats = fs.statSync(imgpath)
      overallFilesSizesOnstart += stats.size;
    }
  })

  cnt = 0

  imgs_overall = images.length

  async function fileFinished(info) {
    cnt += 1
    overallFilesSizesOnend += info.size
    if (imgs_overall == cnt) {

      fs.removeSync(directoryPath)

      fs.rename(endDirectoryPath, directoryPath, function (err) {
        if (err) {
          console.log(err)
        } else {
          var compressionDelay = (overallFilesSizesOnstart - overallFilesSizesOnend) / (2 ** 20)
          console.log("Successfully completed Images Compression!\nCompressed by " + compressionDelay.toFixed(2) + "MegaBytes! (" + ((overallFilesSizesOnstart - overallFilesSizesOnend) / overallFilesSizesOnend * 100.0).toFixed(0) + "% saved)")
        }
      })
      console.log("Optimization Tasks are completed now.")


    }
  }

  images.forEach((dataload) => {
    var img = dataload.path
    var destPath = img.split('.').slice(0, -1) + '.' + dataload.type
    destPath = destPath.replaceAll(",", ".")

    destPath = destPath.replace(path.join("dist", "img"), path.join("dist", "img-new"))

    sharp(img)
      .webp({
        quality: 80,
        force: false
      })
      .jpeg({
        quality: 80,
        force: false
      })
      .png({
        quality: 83,
        force: false,
        compressionLevel: 9
      })
      .toFile(destPath, (err, info) => {
        fs.remove(img, err => {
          if (err) return console.error(err)
          //console.log('success!') // I just deleted my entire HOME directory.
          fileFinished(info)
        })
        
      })

  })

})
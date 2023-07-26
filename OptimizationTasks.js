// automation tools to optimize image sizes by compression
// by Aram Virabyan
// 26.07.2023
// modes: 1 - Image Optimization

console.log("Running Optimization Tasks...")

console.log("[1/1] Compressing Images...")

const path = require('path')
const fs = require('fs')
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
        if (file.split('.').pop() === 'jpg' || file.split('.').pop() === 'webp' || file.split('.').pop() === 'png') {
            const imgpath = path.join(directoryPath, file)
            images.push({path: imgpath, type: file.split('.').pop()})
            var stats = fs.statSync(imgpath)
            overallFilesSizesOnstart += stats.size;
        }
    })

    cnt = 0

    imgs_overall = images.length

    function fileFinished(info){
      cnt += 1
      overallFilesSizesOnend += info.size
      if (imgs_overall == cnt){
        fs.rmSync(directoryPath, { recursive: true, force: true });

        fs.rename(endDirectoryPath, directoryPath, function(err) {
          if (err) {
            console.log(err)
          } else {
            var compressionDelay = (overallFilesSizesOnstart - overallFilesSizesOnend) / (2**20)
            console.log("Successfully completed Images Compression!\nCompressed by " + compressionDelay.toFixed(2) + "MegaBytes!")
          }
        })
        console.log("Optimization Tasks are completed now.")
      }
    }

    images.forEach((dataload) => {
        var img = dataload.path
        var destPath = img.split('.').slice(0, -1) + '.' + dataload.type
        destPath = destPath.replace(path.join("dist", "img"), path.join("dist", "img-new"))
        // console.log("destPath" + destPath)
        // console.log('converting jpg to => ', destPath)
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
          .toFile(destPath, (err, info) => fileFinished(info))
        
    })

    
})
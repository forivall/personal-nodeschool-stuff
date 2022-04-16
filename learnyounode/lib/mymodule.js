const fs = require('fs')

module.exports = (dir, ext, cb) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      return cb(err)
    }
  
    cb(null, files.filter((f) => f.endsWith(`.${ext}`)))
  })  
}

const fs = require('fs')

const [, , dir, ext] = process.argv
fs.readdir(dir, (err, files) => {
  if (err) {
    process.exitCode = 1
    return console.log(err)
  }

  for (const f of files) {
    if (f.endsWith(`.${ext}`)) {
      console.log(f)
    }
  }
})

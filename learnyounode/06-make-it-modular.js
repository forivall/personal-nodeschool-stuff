const filteredLs = require('./lib/mymodule')

const [, , dir, ext] = process.argv
filteredLs(dir, ext, (err, files) => {
  if (err) {
    process.exitCode = 1
    return console.log(err)
  }

  for (const f of files) {
    console.log(f)
  }
})

console.log(
  process.argv
    .slice(2)
    .map(Number)
    .reduce((total, n) => total + n, 0)
)

//隨機5碼產生器
function generatorText() {
  let collection = []
  let letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let lowerLetter = letter.toLocaleLowerCase()
  let number = '1234567890'
  collection = (letter + lowerLetter + number).split('')

  let randomCombin = ''
  for (let i = 0; i < 5; i++) {
    randomCombin += collection[Math.floor(Math.random() * collection.length)]
  }
  return randomCombin
}

module.exports = generatorText
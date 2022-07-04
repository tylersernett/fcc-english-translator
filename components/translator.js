const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

let translationList = []; //big translation list of everything in [american, british] form
Object.keys(americanOnly).forEach((key) => {
   translationList.push([
      key, americanOnly[key]
   ])
})
Object.keys(americanToBritishSpelling).forEach((key) => {
   translationList.push([
      key,
      americanToBritishSpelling[key]
   ])
})
Object.keys(americanToBritishTitles).forEach((key) => {
   translationList.push([
      key,
      americanToBritishTitles[key]
   ])
})
Object.keys(britishOnly).forEach((key) => {
   translationList.push([
      britishOnly[key],
      key
   ])
})

class Translator {

   translate(text, mode) {
      let newString = text;

      if (mode === 'american-to-british') {
         translationList.forEach((term) => {
            newString = newString.replace(term[0], '<span class="highlight">' + term[1] + "</span>")
         })
      } else {
         translationList.forEach((term) => {
            newString = newString.replace(term[1], '<span class="highlight">' + term[0] + "</span>")
         })
      }

      let timeRegex = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:|\.)([0-5][0-9]))/g

      let times = newString.match(timeRegex)
      if (times) {
         times.forEach((time) => {
            if (mode === 'american-to-british') {
               newString = newString.replace(time, '<span class="highlight">' + time.replace(':', '.') + "</span>")
            } else {
               newString = newString.replace(time, '<span class="highlight">' + time.replace('.', ':') + "</span>")
            }
         })
      }
      return newString
   }
}

module.exports = Translator;
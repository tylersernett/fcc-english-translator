const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

let wordList = []; //big translation list of everything in [american, british] form
Object.keys(americanOnly).forEach((key) => {
   wordList.push([
      key, americanOnly[key]
   ])
})
Object.keys(americanToBritishSpelling).forEach((key) => {
   wordList.push([
      key,
      americanToBritishSpelling[key]
   ])
})
Object.keys(americanToBritishTitles).forEach((key) => {
   wordList.push([
      key,
      americanToBritishTitles[key]
   ])
})
//this one is reverse order [british, american], so make key come 2nd
Object.keys(britishOnly).forEach((key) => {
   wordList.push([
      britishOnly[key],
      key
   ])
})

class Translator {

   translate(text, locale) {
      let returnString = text;

      if (locale === 'american-to-british') {
         wordList.forEach((term) => {
            if (new RegExp(`${term[0]} `, "gi").test(returnString) || //spaces okay
               new RegExp(`[^-]${term[0]}[^A-Za-z]`, "gi").test(returnString) || //NO neighboring letters, or dashes before
               new RegExp(`${term[0]}$`, "gi").test(returnString)) { //or word by itself $=end of line
               returnString = returnString.replace(term[0], '<span class="highlight">' + term[1] + "</span>")
            }
         })
      } else {
         wordList.forEach((term) => {
            if (new RegExp(`${term[1]} `, "gi").test(returnString) || //spaces okay
               new RegExp(`[^-]${term[1]}[^A-Za-z]`, "gi").test(returnString) || //NO neighboring letters, or dashes before
               new RegExp(`${term[1]}$`, "gi").test(returnString)) { //or word by itself $=end of line
               returnString = returnString.replace(term[1], '<span class="highlight">' + term[0] + "</span>")
            }
         })
      }

      let timeRegex = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:|\.)([0-5][0-9]))/g

      let times = returnString.match(timeRegex)
      if (times) {
         times.forEach((time) => {
            if (locale === 'american-to-british') {
               returnString = returnString.replace(time, '<span class="highlight">' + time.replace(':', '.') + "</span>")
            } else {
               returnString = returnString.replace(time, '<span class="highlight">' + time.replace('.', ':') + "</span>")
            }
         })
      }
      return returnString
   }
}

module.exports = Translator;
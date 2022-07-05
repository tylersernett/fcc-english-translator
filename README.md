# American British Translator

Live app: https://fcc-english-translator.herokuapp.com/

Things learned:

Prevent interior word matches (like 'ta' in 'Acetaminophen')
```Javascript
if (new RegExp(`${term[1]} `, "gi").test(returnString) || //spaces okay
               new RegExp(`[^-]${term[1]}[^A-Za-z]`, "gi").test(returnString) || //NO neighboring letters, or dashes before
               new RegExp(`${term[1]}$`, "gi").test(returnString)) { //or word by itself $=end of line
```
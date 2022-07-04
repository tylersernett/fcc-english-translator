'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      console.log(req.body);
      const {text, locale} = req.body;
      if (!locale || text == undefined) {
        return res.json({error: "Required field(s) missing"})
      } else if (text == "") {
        return res.json({error: "No text to translate"})
      }
    });
};

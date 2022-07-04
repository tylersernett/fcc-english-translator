'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      console.log(req.body);
      const { text, locale } = req.body;
      if (!locale || text == undefined) {
        return res.json({ error: "Required field(s) missing" });
      } else if (text == "") {
        return res.json({ error: "No text to translate" });
      }

      let translation = "";
      if (locale == "american-to-british" || locale == "british-to-american") {
        translation = translator.translate(text, locale);
      } else {
        return res.json({ error: 'Invalid value for locale field' });
      }

      if (translation == text || !translation) {
        res.json({ text, translation: "Everything looks good to me!" });
      } else {
        res.json({ text, translation: translation}); //[0] lacks hightlights, [1] has highlights
      }
    });
};

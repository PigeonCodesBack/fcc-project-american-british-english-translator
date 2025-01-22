'use strict';

const { translate, LOCALES } = require('../components/translator.js')

module.exports = function (app) {

  app.route("/api/translate").post((req, res) => {
    console.log("req.body :>> ", req.body);
    const { text, locale } = req.body;

    if (!locale || text == undefined) {
      return res.json({ error: "Required field(s) missing" });
    }

    if (!text.length) {
      return res.json({ error: "No text to translate" });
    }

    switch (locale) {
      case LOCALES.AMERICAN_TO_BRITISH:
      case LOCALES.BRITISH_TO_AMERICAN:
        const translation = translate(text, locale);
        if (translation === text || !translation) {
          return res.json({text: text, translation: "Everything looks good to me!"});
        } else {
          return res.json({text: text, translation: translation.html});
        }
      default:
        return res.json({ error: "Invalid value for locale field" });
    }
  });
};

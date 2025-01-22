// utils import
const stringUtils = require('./utils/string.js');
const dictionaryUtils = require('./utils/dictionary.js')

// constants import
const AMERICAN_ONLY = require('./locale/american-only.js');
const BRITISH_ONLY = require('./locale/british-only.js');
const AMERICAN_TO_BRITISH_SPELLING = require('./locale/american-to-british-spelling.js');
const AMERICAN_TO_BRITISH_TITLES = require('./locale/american-to-british-titles.js');


const BRITISH_TO_AMERICAN_SPELLING = dictionaryUtils.reverseDictionary(AMERICAN_TO_BRITISH_SPELLING);
const BRITISH_TO_AMERICAN_TITLES = dictionaryUtils.reverseDictionary(AMERICAN_TO_BRITISH_TITLES);

// RegExp(s)
const AMERICAN_TIME_REGEX = /([1-9]|1[012]):[0-5][0-9]/g;
const BRITISH_TIME_REGEX = /([1-9]|1[012]).[0-5][0-9]/g
const WHOLE_WORD_REGEX = /\w+([-']\w+)*/g;

// locales
const LOCALES = Object.freeze({
    BRITISH_TO_AMERICAN: 'british-to-american',
    AMERICAN_TO_BRITISH: 'american-to-british'
});

/**
 * @typedef {Object} Translation
 * @property {string} text
 * @property {string} html
 */

function getLocalizedParameters(locale) {
    const dictionary = {}, titlesDictionary = {}, phrasesDictionary = {};
    let timeRegex, convertTime;

    switch (locale) {
        case LOCALES.AMERICAN_TO_BRITISH:
            Object.assign(dictionary, { ...AMERICAN_ONLY, ...AMERICAN_TO_BRITISH_SPELLING })
            Object.assign(titlesDictionary, AMERICAN_TO_BRITISH_TITLES)
            timeRegex = AMERICAN_TIME_REGEX
            convertTime = (time) => time.replace(':', '.');
            break;

        case LOCALES.BRITISH_TO_AMERICAN:
            Object.assign(dictionary, { ...BRITISH_ONLY, ...BRITISH_TO_AMERICAN_SPELLING });
            Object.assign(titlesDictionary, BRITISH_TO_AMERICAN_TITLES);
            timeRegex = BRITISH_TIME_REGEX;
            convertTime = (time) => time.replace('.', ':');
            break;

        default:
            throw new Error(`unknown locale: ${locale}`);
    }


    Object.assign(phrasesDictionary, Object.fromEntries(
        Object.entries(dictionary).filter(([from, _to]) => from.includes(' '))
    ));

    return Object.freeze({
        wordsDictionary: dictionary, // FIXME: idk why but it works ok?
        titlesDictionary,
        phrasesDictionary,
        time: {
            regex: timeRegex,
            convert: convertTime
        }
    });
}

/**
 * 
 * @param {string} text 
 * @param {string} locale 
 * @returns {Translation | null}
 */
function translate(text, locale) {
    const localizedParameters = getLocalizedParameters(locale);
    const lowerCaseText = text.toLowerCase();
    const translationMap = {};

    const titlesRegex = new RegExp(
        '\\b(' +
        Object.keys(localizedParameters.titlesDictionary)
            .map(title => title.replace(/\./g, ''))
            .join('|')
        + `)${locale === LOCALES.BRITISH_TO_AMERICAN ? '\\b' : '[.]'}`, 'gi'
    );

    const titlesMatches = [...(lowerCaseText.match(titlesRegex) || [])];
    
    titlesMatches.forEach(title => {
        const translatedTitle = localizedParameters.titlesDictionary[title];
        translationMap[title] = stringUtils.getCapitalized(translatedTitle)
    })

    Object.entries(localizedParameters.phrasesDictionary).forEach(([from, to]) => {
        if (lowerCaseText.includes(from))
            translationMap[from] = to;
    });

    lowerCaseText.match(WHOLE_WORD_REGEX).forEach((word) => {
        if (localizedParameters.wordsDictionary[word])
            translationMap[word] = localizedParameters.wordsDictionary[word];
    });

    const timeMatches = lowerCaseText.match(localizedParameters.time.regex);

    if (timeMatches) {
        timeMatches.forEach((time) => {
            translationMap[time] = localizedParameters.time.convert(time);
        });
    }

    console.debug("translationMap :>> ", translationMap);

    if (Object.keys(translationMap).length === 0) {
        return null;
    }

    return translateFromMap(text, translationMap)
}

/**
 * 
 * @param {Object} translationMap 
 * @returns {RegExp}
 */
function getTranslationRegex(translationMap) {
    return new RegExp(Object.keys(translationMap).join("|"), 'gi')
}



/**
 * 
 * @param {string} text 
 * @param {Object} translationMap 
 * @returns {Translation}
 */
function translateFromMap(text, translationMap) {
    const translationRegex = getTranslationRegex(translationMap);
    
    const translatedText = text.replace(translationRegex, (from) => (
        translationMap[from.toLowerCase()]
    ));

    const translatedHtml = text.replace(translationRegex, (from) => (
        `<span class="highlight">${translationMap[from.toLowerCase()]}</span>`
    ));

    return Object.freeze({
        text: translatedText,
        html: translatedHtml
    });
}

const Translator = {
    LOCALES,
    translate
};

module.exports = Translator;
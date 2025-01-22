
/**
 * Is character [char] between [from] and [to] in ASCII table?
 * @param {string} char 
 * @param {string} from 
 * @param {string} to 
 * @returns {boolean}
 */
function isCharBetween(char, from, to){
    return (
        char.charCodeAt(0) >= from.charCodeAt(0) &&
        char.charCodeAt(0) <= to.charCodeAt(0)
    );
}

/**
 * Is string [string] between [from] and [to] in ASCII table? (spaces, punctuation and numbers excluded)
 * @param {string} string 
 * @param {string} from 
 * @param {string} to 
 * @returns {boolean}
 */
function isAllLettersBetween(string, from, to) {
    return string.split('').reduce( (result, char) => {
        if (/^\w/.test(char))
            return result && true;
        else
            return result && isCharBetween(char, from, to)
    }, true);
}

/**
 * Is the given string uppercase?
 * @param {string} string 
 * @returns {boolean}
 */
function isUpperCase(string) {
    return isAllLettersBetween(string, 'A', 'Z');
}

/**
 * Get string converted to uppercase.
 * @param {string} string 
 * @returns {string}
 */
function getUpperCase(string) {
    return string.toUpperCase();
}

/**
 * Is the given string lowercase?
 * @param {string} string 
 * @returns {boolean}
 */
function isLowerCase(string) {
    return isAllLettersBetween(string, 'a', 'z');
}

/**
 * Get string converted to lowercase.
 * @param {string} char 
 * @returns {string}
 */
function getLowerCase(char) {
    return char.toLowerCase();
}

/**
 * 
 * @param {string} string 
 * @returns {boolean}
 */
function isCapitalized(string) {
    return /\b[A-Z][a-z]+\b/.test(string)
}

/**
 * 
 * @param {string} string 
 * @returns {string}
 */
function getCapitalized(string) {
    return string.slice(0,1).toUpperCase() + string.slice(1).toLowerCase();
}

const stringUtils = {
    isUpperCase,
    getUpperCase,
    isLowerCase,
    getLowerCase,
    isCapitalized,
    getCapitalized
}

module.exports = stringUtils;
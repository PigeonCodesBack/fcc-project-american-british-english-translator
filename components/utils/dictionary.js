/**
 * Gets a dictionary and gives you a new one with swapped keys and values
 * @param {Object} dictionary 
 * @returns {Object} inverted dictionary
 */
function reverseDictionary(dictionary) {
    return Object.fromEntries(
        Object.entries(dictionary)
          .map(([key, value]) => ([value, key]))
      );      
};

const dictionaryUtils = {
    reverseDictionary
};

module.exports = dictionaryUtils;
/**
 * 随机值的生成(项目公共方法)
 */


/**
 * 产生一个在startUnicode和endUnocode直接的随机字符
 * @param startUnicode
 * @param endUnocode
 * @returns {*}
 */
let getRandomCharacter = (startUnicode, endUnocode)=> {
  return Math.random() * (endUnocode - startUnicode + 1) + startUnicode;
};

/**
 * 获取随机小写字母
 * @returns {*}
 */
let getRandomLowerCaseLetter = ()=> {
  return getRandomCharacter('a', 'z')

};

/**
 * 获取随机大写字母
 * @returns {*}
 */
let getRandomUpperCaseLetter = ()=> {
  return getRandomCharacter('A', 'Z')

};

/**
 * 获取随机0到9的数
 * @returns {*}
 */
let getRandomDigitCharacter = ()=> {
  return getRandomCharacter('0', '9')

};

/**
 * 获取随机字符'\u0000'到'\uFFFF'
 * @returns {*}
 */
let getRandomUnicodeCharacter = ()=> {
  return getRandomCharacter('\u0000', '\uFFFF')

};

module.exports = {
  getRandomCharacter,
  getRandomLowerCaseLetter,
  getRandomUpperCaseLetter,
  getRandomDigitCharacter,
  getRandomUnicodeCharacter
}
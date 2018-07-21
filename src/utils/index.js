
// base64解码
// function decodeBase64 (str) {
//   return decodeURIComponent(atob(str).split('').map(function (c) {
//     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
//   }).join(''))
// }

/**
 * 将base64编码解析成字符串
 * @param {String} str [输入字符串]
 * @return {String} [输出字符串]
 */

export function decodeBase64 (str) {
  return decodeURIComponent(escape(atob(str)))
}

/**
 * 打乱数组
 * @param {Array} array [输入数组]
 * @return {Array} [打乱后的数组]
 */
export function shuffle (array) {
  let index = array.length - 1
  let tmpValue
  while (index >= 0) {
    let randomIndex = Math.floor(Math.random() * (array.length - 1))
    tmpValue = array[randomIndex]
    array[randomIndex] = array[index]
    array[index] = tmpValue
    index--
  }
  return array
}

/**
 * 生成随机整数
 * @param {Number} min [最小值]
 * @param {Number} min [最小值]
 * @param {Array} exclude [不包含的数]
 * @return {Number}
 */
export function randomNumber (min, max, exclude) {
  while (true) {
    let rand = Math.floor(Math.random() * (max - min) + min)

    if (max === min) {
      return rand
    } else if (max - min === 1) {
      if (exclude[0] !== rand) {
        return rand
      }
    } else if (!exclude.includes(rand)) {
      return rand
    }
  }
}

/**
 * 获取圆周上的坐标点
 * @param {Number} rx [圆心x坐标]
 * @param {Number} ry [圆心y坐标]
 * @param {Number} r [半径]
 * @param {Number} angle [角度]
 * @return {Object} 坐标点
 */
export function getCoordinateOnCircle (rx, ry, r, angle) {
  return {
    x: Math.round((rx + r * Math.sin(angle)) * 100) / 100,
    y: Math.round((ry - r * Math.cos(angle)) * 100) / 100
  }
}

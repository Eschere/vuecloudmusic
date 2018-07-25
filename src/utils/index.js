
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

/**
 * 根据时间值返回标准时间格式 00:00:00
 * @param {Number} time [时间值，单位s]
 */
export function formatTime (time) {
  let s = Math.floor(time % 60)
  let m = Math.floor(time / 60)
  s = s < 10 ? '0' + s : s
  m = m < 10 ? '0' + m : m
  return m + ':' + s
}

/**
 * 根据时间字符串装换成具体时间数值
 * @param {String} str [时间字符串， 00:00.00]
 */
export function strToTime (str) {
  // 00:00.00
  let time = str.split(':')
  return time[0] * 60 + (time[1] - 0)
}

/**
 * 歌词解析，将歌词字符串解析成数组
 * @param {String} str [歌词内容字符串]
 */
export function lrcParser (str) {
  let reg = /\[([0-9]+.*)\].*/g
  let arr = str.match(reg)
  arr = arr.map((item, index) => {
    let rest = new RegExp(/\[([0-9]+.*)\](.*)/).exec(item)
    rest[2] = rest[2].replace(/&nbsp;/g, ' ')
    rest[2] = rest[2].replace(/^\/\/$/, '')
    return {
      index,
      time: strToTime(rest[1]),
      text: rest[2]
    }
  })
  return arr
}

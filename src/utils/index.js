
// base64解码
// function decodeBase64 (str) {
//   return decodeURIComponent(atob(str).split('').map(function (c) {
//     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
//   }).join(''))
// }

export function decodeBase64 (str) {
  return decodeURIComponent(escape(atob(str)))
}

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

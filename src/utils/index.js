
// base64解码
// function decodeBase64 (str) {
//   return decodeURIComponent(atob(str).split('').map(function (c) {
//     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
//   }).join(''))
// }

function decodeBase64 (str) {
  return decodeURIComponent(escape(atob(str)))
}

export default {
  decodeBase64
}

const https = require('https')

function requestData (options) {
  return new Promise((resolve, reject) => {
    https.get(options, res => {
      let chunks = ''

      res.on('data', chunk => {
        chunks += chunk
      })

      res.on('end', _ => {
        resolve(chunks)
      })

      res.on('error', e => {
        reject(e)
      })
    })
  })
}

module.exports = {
  requestData
}

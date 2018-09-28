exports.handler = function (event, context, callback) {
  const time = Date()
  const response = JSON.stringify({ time })

  const jsonResponse = {
    isBase64Encoded: true,
    statusCode: 200,
    headers: {
      "Content-type": "application/json",
    },
    body: new Buffer(response).toString('base64')
  }

  callback(null, jsonResponse)
}

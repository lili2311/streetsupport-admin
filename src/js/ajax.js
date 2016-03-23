var Q = require('q')

var post = function (url, headers, data) {
  if(Object.keys(headers).length === 0) {
    headers = {
      'content-type': 'application/json'
    }
  }
  return makeRequest({
    method: 'POST',
    url: url,
    headers: headers,
    data: data
  }).promise
}

var get = function (url, headers) {
  return makeRequest({
    method: 'GET',
    url: url,
    headers: headers
  }).promise
}

var makeRequest = function (options) {
  var deferred = Q.defer()
  var req = new XMLHttpRequest()
  req.open(options.method, options.url, true)

  for (var key in options.headers) {
    if (options.headers.hasOwnProperty(key)) {
      req.setRequestHeader(key, options.headers[key])
    }
  }

  req.onload = function () {
    if (this.status === 201) {
      deferred.resolve({
        'status': 'created',
        'statusCode': this.status,
        'data': JSON.parse(this.responseText)
      })
    } else if (this.status === 200) {
      deferred.resolve({
        'status': 'ok',
        'statusCode': this.status,
        'data': JSON.parse(this.responseText)
      })
    } else {
      deferred.resolve({
        'status': 'error',
        'statusCode': this.status,
        'data': JSON.parse(this.responseText)
      })
    }
  }

  req.onerror = function () {
    deferred.reject(new Error('Server responded with a status of ' + req.status))
  }

  if (options.data !== undefined) {
    req.send(JSON.stringify(options.data))
  } else {
   req.send()
  }

  return deferred
}
module.exports = {
  get: get,
  post: post
}
var ko = require('knockout')
var ajax = require('basic-ajax')
var Endpoints = require('../endpoint-builder')
var adminUrls = require('../admin-urls')
var cookies = require('../cookies')

function AddUser () {
  var self = this
  self.email = ko.observable()
  self.endpoints = new Endpoints()

  self.message = ko.observable()
  self.hasErrors = ko.observable(false)
  self.errors = ko.observableArray()
  self.hasErrors = ko.computed(function () {
    return self.errors().length > 0
  }, self)

  self.save = function () {
    var endpoint = self.endpoints.verifiedUsers().build()
    var headers = {
      'content-type': 'application/json',
      'session-token': cookies.get('session-token')
    }
    var payload = {
      'Email': self.email(),
    }
    ajax
      .post(endpoint, headers, JSON.stringify(payload))
      .then(function (result) {
        self.message('User created.')
      }, function (error) {
        self.errors(JSON.parse(error.response).messages)
      })
  }
}

module.exports = AddUser

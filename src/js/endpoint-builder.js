var endpoints = require('./api-endpoints')

function EndpointBuilder () {
  var self = this

  self.serviceProviders = function (providerId) {
    self.baseResource = endpoints.getServiceProviders
    self.baseResourceId = providerId
    return self
  }

  self.verifiedUsers = function (userId) {
    self.baseResource = endpoints.verifiedUsers
    self.baseResourceId = userId
    return self
  }

  self.unverifiedUsers = function (userId) {
    self.baseResource = endpoints.unverifiedUsers
    self.baseResourceId = userId
    return self
  }

  self.addresses = function (addressId) {
    self.childResource = 'addresses'
    self.childResourceId = addressId
    return self
  }

  self.services = function (serviceId) {
    self.childResource = 'services'
    self.childResourceId = serviceId
    return self
  }

  self.isVerified = function () {
    self.childResource = 'is-verified'
    return self
  }

  self.isPublished = function () {
    self.childResource = 'is-published'
    return self
  }

  self.generalInformation = function () {
    self.childResource = 'general-information'
    return self
  }

  self.contactDetails = function () {
    self.childResource = 'contact-details'
    return self
  }

  self.categories = function () {
    self.baseResource = endpoints.getServiceCategories
    return self
  }

  self.build = function () {
    var uri = self.baseResource
    if (self.baseResourceId !== undefined) {
      uri += '/' + self.baseResourceId
    }
    if (self.childResource !== undefined) {
      uri += '/' + self.childResource

      if (self.childResourceId !== undefined) {
        uri += '/' + self.childResourceId
      }
    }
    return uri
  }
}

module.exports = EndpointBuilder

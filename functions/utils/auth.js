const getAccessTokenFromHeaders = (headers) => {
  const rawAuthorization = headers.authorization
  const authorizationParts = rawAuthorization
    ? rawAuthorization.split(' ')
    : 'failed'
  if (authorizationParts[0] !== 'Bearer' || authorizationParts.length !== 2) {
    return null
  } else {
    const accessToken = authorizationParts[1]
    return accessToken
  }
}

module.exports = {
  getAccessTokenFromHeaders,
}

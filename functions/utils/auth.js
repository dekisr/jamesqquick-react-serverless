const jwt = require('jsonwebtoken')
const jwks = require('jwks-rsa')
const { promisify } = require('util')

const jwksClient = jwks({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  audience: process.env.AUTH0_AUDIENCE,
})

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

const validateAccessToken = async (token) => {
  try {
    const decodedToken = jwt.decode(token, { complete: true })
    const { kid, alg } = decodedToken.header
    const getSigningKey = promisify(jwksClient.getSigningKey)
    const key = await getSigningKey(kid)
    const signingKey = key.publicKey

    const options = { algorithms: alg }

    jwt.verify(token, signingKey, options)
    return decodedToken.payload
  } catch (error) {
    console.log(error)
    return null
  }
}

module.exports = {
  getAccessTokenFromHeaders,
  validateAccessToken,
}

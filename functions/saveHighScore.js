const { table, getHighScores } = require('./utils/airtable')
const { getAccessTokenFromHeaders } = require('./utils/auth')

exports.handler = async (event) => {
  const token = getAccessTokenFromHeaders(event.headers)
  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: 'User is not logged in or the token is invalid.',
      }),
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'That method is not allowed.' }),
    }
  }
  const { name, score } = JSON.parse(event.body)
  if (!name || (!score && score !== 0)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Bad request.' }),
    }
  }

  try {
    const records = await getHighScores(false)
    const lowestRecord = records[9]
    if (
      typeof lowestRecord.fields.score === 'undefined' ||
      score > lowestRecord.fields.score
    ) {
      const updatedRecord = { id: lowestRecord.id, fields: { name, score } }
      await table.update([updatedRecord])
      return {
        statusCode: 200,
        body: JSON.stringify(updatedRecord),
      }
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({}),
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to query records.' }),
    }
  }
}

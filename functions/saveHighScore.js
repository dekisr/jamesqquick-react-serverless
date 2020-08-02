const { table, getHighScores } = require('./utils/airtable')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'That method is not allowed.' }),
    }
  }
  const { name, score } = JSON.parse(event.body)
  if (!name || !score) {
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

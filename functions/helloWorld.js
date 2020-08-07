exports.handler = async (event, context, callback) => {
  return {
    statusCode: 200,
    // headers: {
    //   'Access-Control-Allow-Headers': 'Content-Type',
    //   'Access-Control-Allow-Origin': '*',
    // },
    body: JSON.stringify({
      msg: 'Hello World!',
    }),
  }
}

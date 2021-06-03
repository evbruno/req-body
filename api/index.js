exports.handler = async function(event, context) {

 let q = event.queryStringParameters
 const name = q.name || 'World' 

 return {
    headers: { 'content-type': 'application/json;charset=utf-8' },
    statusCode: 200,
    body: 
      JSON.stringify({
        msg:`Hello ${name}, you just parsed the request body!`
      })
  }

}
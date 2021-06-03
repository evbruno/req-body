// module.exports = async (req, res) => {
//   const { name = 'World' } = req.query
//   res.status(200).send(`Hello ${name}, you just parsed the request body!`)
// }

exports.handler = async function(event, context) {

 console.log("> event   : ", event)
 console.log("> context : ", context)
 
 const { name = 'World' } = event.query

 return {
    headers: { 'content-type': 'application/json;charset=utf-8' },
    statusCode: 200,
    body: 
      JSON.stringify({
        msg:`Hello ${name}, you just parsed the request body!`
      })
  }

}
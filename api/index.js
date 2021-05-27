module.exports = async (req, res) => {
  const { name = 'World' } = req.query
  res.status(200).send(`Hello ${name}, you just parsed the request body!`)
}

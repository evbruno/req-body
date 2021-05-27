const { Var, Reduce, Let, Append, Count, Lambda, ToObject } = require('faunadb')
var faunadb = require('faunadb')
var q = faunadb.query

const f_secret = process.env.FAUNA_ADMIN_KEY
const f_domain = process.env.FAUNA_DOMAIN || 'db.fauna-preview.com'
const client = new faunadb.Client({ domain: f_domain, secret: f_secret })

module.exports = async (req, res) => {
  var total = await client.query(q.Count(q.Documents(q.Collection("quotes"))))

  if (total == 0) {
    console.log('No quotes found; creating...')
    const quotes = require('./homer.json')

    await client.query(
      q.Foreach(
        
        q.Reduce(
          q.Lambda(
            (acc, curr) => q.Append(acc, [[ q.Add(1, q.Count(acc)), curr ]])
          ),
          [],
          quotes.homer
        ),

        q.Lambda((idx, qt) => 
          q.Create(q.Collection('quotes'), { data: {
            author: 'homer', 
            index: idx,
            quote: qt 
          }})
        )
      )
    )

    total = quotes.homer.length
  } else {
    console.log(`${total} quotes found...`)
  }

  const quote_index = Math.floor(Math.random() * total) + 1

  const quote_value = await client.query(q.Get(q.Match(q.Index('quote_author'), [ quote_index, 'homer' ])))
 
  res.json({ 
    author: quote_value.data.author, 
    quote: quote_value.data.quote
  })
}

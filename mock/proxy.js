const request = require('request')
module.exports = function (app) {
  app.use('/api/', function(req, res) {
    let url = `http://localhost:3000/api${req.url}`
    req.pipe(request(url)).pipe(res)
  })
}
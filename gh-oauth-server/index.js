const express = require('express');
const axios = require('axios')
const app = express();

app.get('/', (req, res) => {

  // The req.query object has the query params that were sent to this route.
  const requestToken = req.query.code;
  const clientID = req.query.client_id;
  const clientSecret = req.query.client_secret
  const redirectUrl = req.query.redirect_url
  console.log(requestToken)
  console.log(clientID)
  
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
         accept: 'application/json'
    }
  }).then((response) => {
    let accessToken = response.data.access_token
    console.log(accessToken)
    res.redirect(`${redirectUrl}&access_token=${accessToken}`);
  })
})

const port = process.env.PORT || 8000;
app.listen(port , () => console.log('App listening on port ' + port));

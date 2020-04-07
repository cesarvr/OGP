
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Dredd = require('./dredd')

const app = express()
const port = 8080

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', express.static('public'))

app.get('/api/dredd/:project', async (req, res) => {
  let project = req.params.project
  try {
    let validation = await Dredd.validate(project) 
    res.status(200).send(validation)
  }catch(e){
    if(e.code !==undefined)
      res.status(500).send(e)
    res.status(500).send({error:'Internal Error'})
    console.log('Error: ', e)
  }
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

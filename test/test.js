var superagent = require('superagent')
var assert = require('chai').assert

const HOST = process.env.HOSTNAME || 'localhost'
const PROTOCOL = process.env.PROTOCOL || 'http'
const PORT = process.env.PORT || '8080'

let URL = `${PROTOCOL}://${HOST}:${PORT}/api/dredd/`

describe('express rest api server', function(){

  it('Get All', async function(){
    let resp = await superagent.get(URL + 'ctest')

    console.log(resp.body)
    console.log(resp.body[0].containers)
  })

})


const okd = require('okd-api').okd

const hasLivenessProbe = (container) => 
  Object.assign({hasLivenessProbe:container.livenessProbe !== undefined}) 

const hasReadinessProbe = (container) => 
  Object.assign({hasReadinessProbe:container.readinessProbe !== undefined}) 


const process = function(item){
  let name = item.metadata.name 
  let containers = item.spec.template.spec.containers
  containers = containers.map(container => Object.assign({}, {name: container.name}, hasLivenessProbe(container), hasReadinessProbe(container)))

  return {name, containers }
}

function _validate(ret) {
  if(ret.status !== undefined) {
    throw {
      code:ret.code, 
      message:'Error handling request'
    } 
  }
  return true
}

const validate = async function(project) {

  if(project === undefined)
    throw {code:404, message:"Project cannot be empty."}

  let dc = okd('https://console.pro-eu-west-1.openshift.com', '').namespace(project).dc

  let dcs = await dc.all()

  _validate(dcs)

  //require('fs').writeFileSync('./test/sample.json', JSON.stringify(dcs,null,4))

  return dcs.items.map(item => process(item))
}

module.exports = {validate, process}

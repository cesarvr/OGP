(function(){
console.log('loaded')

  async function lookup(value) {
    let response = await fetch(`api/dredd/${value}`,{method:'GET'})
    let data = await response.json()
    console.log('resp ->', data)
    $('.json').html(JSON.stringify(data,null,4))
  }

  $('#search').click(async () => {
    let value = $('.project-name').val()
    console.log('val ->', value)
    lookup(value)
  })

  if(location.hash !== '') {
    let value = location.hash.replace('#', '')
    $('.project-name').val(value)
    lookup(value)
  } 
}())

console.log('This is coming from the static file')

fetch('http://puzzle.mead.io/puzzle').then((Response)=>{
    Response.json().then((data)=>{
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e)=>{

    e.preventDefault()

    const location = search.value

    document.getElementById('p1').innerHTML = 'Loading...'
    document.getElementById('p1').style.color = 'black'
    document.getElementById('p2').innerHTML = ''

    if(!location){
        document.getElementById('p1').innerHTML = 'Please enter an address!!!'
        document.getElementById('p1').style.color = 'red'
        document.getElementById('p2').innerHTML = ''
    }
    else{
        fetch('http://localhost:3000/weather?address=' + location).then((Response)=>{
        Response.json().then((data)=>{
        if(data.error){
            document.getElementById('p1').innerHTML = data.error
            document.getElementById('p1').style.color = 'red'
            document.getElementById('p2').innerHTML = ''
        }else{
            document.getElementById('p1').innerHTML = data.location
            document.getElementById('p1').style.color = 'black'
            document.getElementById('p2').innerHTML = data.dataFore
        }
    })
})
    }

})
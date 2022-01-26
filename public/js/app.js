// This script is running client side, so can use Fetch API, but is not accessible from node.js as that is backend only
// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             return console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

console.log('Loaded client side JS')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-error')
const messageTwo = document.querySelector('#message-forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading Flights'
    messageTwo.textContent = ''
    fetch('/flights?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = ''
                messageTwo.textContent = 'There are currently ' + data.flights + ' flights above ' + data.location
            }
        })
    })

    console.log(location)
})
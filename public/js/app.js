const weatherform = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#p1")
const messageTwo = document.querySelector("#p2")

weatherform.addEventListener("submit", (e) => {
    e.preventDefault()

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})
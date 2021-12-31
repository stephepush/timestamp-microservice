console.log("hello world")

async function getTime() {
    const response = await fetch('/api/:date?')
    const json = await response.json()
    document.getElementById("time").innerText = json
}

getTime()
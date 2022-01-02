//console.log("hello world")



const api_url = '/api/:date?';

async function getTime() {
    try {
        const response = await fetch(api_url)
        const time = await response.json()
        console.log(time.utc)
            //return time
        return JSON.parse(time)
    } catch (err) {
        console.error(err)
    }

}

/*async function renderTime() {
    const element = document.getElementById("time");
    element.innerText = await getTime()
}*/

getTime()
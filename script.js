const input = document.getElementById('input')
const cityName = document.getElementById('cityname')
const dateTime = document.getElementById('datetime')
const main = document.getElementById('main')
const feelsLike = document.getElementById('feelsLike')
const description = document.getElementById('description')
const body = document.getElementById('body')

async function fetchData(city){
    let response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=4fd239414e1c53315dd1cb53ed561e60")
    response = await response.json()
    console.log(response)
    return response
}

// fetchData("hosur")
  
const changeBackground = (temp) => {
    
    if ( temp < 5) {
        body.style.backgroundImage = `url("https://images.unsplash.com/photo-1612208695882-02f2322b7fee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`
    }

    else if ( temp >= 5 && temp < 10 ) {

        body.style.backgroundImage = `url("https://images.unsplash.com/photo-1651523862184-5663390bea44?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`
    }

    else if ( temp >= 10 && temp < 30 ) {
        body.style.backgroundImage = `url("https://images.unsplash.com/photo-1614434163906-5520f43d4e7d?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`
    }

    else if ( temp >= 30 && temp < 50) {
        body.style.backgroundImage =`url("https://images.unsplash.com/photo-1673344019269-ebfaba865769?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`
    }
    
    else {
        body.style.backgroundImage = `url("https://vid.alarabiya.net/images/2016/03/30/6d769d9e-efc6-4283-a554-948b716b0466/6d769d9e-efc6-4283-a554-948b716b0466_16x9_1200x676.jpg")`
    }
}

const noWeather = (error)=>{
    if (error == "404") {
        cityName.innerText = "NO CITY FOUND"
        dateTime.innerText = ""
        main.innerText = ""
        feelsLike.innerText = ""
        description.innerText = ""
    }
}


function handleChange(event) {
    fetchData(event.target.value).then((response)=>{
        noWeather(response.cod)

        changeBackground(response.main.temp)

        cityName.innerText = Math.round(response.main.temp) + "°C"

        feelsLike.innerText =  " Feels Like " + response.main.feels_like

        cityName.innerText =  event.target.value + ", "  + response.sys.country

        description.innerText = response.weather[0].description

        let date = new Date(response.dt*1000-(response.timezone*1000))
        date = date.toString()
        date = date.split(' ')
        console.log(date);

        dateTime.innerText = date[2] + " " + date[1] + " " + date[3] + ", " + date[0]

    })
}

input.addEventListener('change',handleChange)       

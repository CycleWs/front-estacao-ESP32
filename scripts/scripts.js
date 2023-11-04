const dias = ["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sábado"]

const temperatureHTML = document.getElementById('temperatura')
const windHTML = document.getElementById('velVento')
const humityHTML = document.getElementById('percUmidade')
const rainHTML = document.getElementById('chanceChuva')
const temporalHTML = document.getElementById('temporal')
const imagemHTML = document.getElementById("imagemHorario")


async function getTemporal() {
    const response = await fetch("https://serveruniruy.onrender.com/weather");
    const data = await response.json(); 
    const { description } = data;
    temporalHTML.innerHTML = `${description}`;
}

getTemporal()
setInterval(getTemporal, 5000)

async function atualizarImagemComBaseNoHorario() {
    const response = await fetch("https://serveruniruy.onrender.com/weather");
    const data = await response.json(); 
    const { condition_slug } = data;
    console.log(condition_slug)
    switch(condition_slug){
        case 'storm':
            imagemHTML.classList.add("storm")
            break
        case 'snow':
            imagemHTML.classList.add("snow")
            break
        case 'rain':
            imagemHTML.classList.add("rain")
            break
        case 'clear_day':
            imagemHTML.classList.add("clear_day")
            break
        case 'clear_night':
            imagemHTML.classList.add("clear_night")
            break
        case 'cloud':
            imagemHTML.classList.add("cloud")
            break
        case 'cloudly_day':
            imagemHTML.classList.add("cloudly_day")
            break
        case 'cloudly_night':
            imagemHTML.classList.add("cloudly_night")
            break
    }
}
atualizarImagemComBaseNoHorario()
setInterval(atualizarImagemComBaseNoHorario, 1000)

window.addEventListener("load", atualizarImagemComBaseNoHorario);

async function updateData(){
    const response = await fetch("https://estacao-esp32.onrender.com")
    if (response.ok) {
        const data = await response.json();
        const {humity, temperature, windspeed, rainperc} = data
        temperatureHTML.innerHTML = `${temperature.toFixed(0)} ºC`
        windHTML.innerHTML = `<i class="fa-solid fa-wind fa-xs"></i>${windspeed.toFixed(2)} km/h`
        humityHTML.innerHTML = `<i class="fa-solid fa-droplet fa-xs"></i>${humity} %`
        rainHTML.innerHTML = `<i class="fa-solid fa-cloud-rain fa-xs"></i>${rainperc.toFixed(2)} %`
        console.log(data)
      } else {
        console.error("Erro na requisição:", response.status)
      }
}
updateData()
setInterval(updateData, 5000)

const dia = new Date()
let diaSemana = dias[dia.getDay()]

function updateTime(){
    let CurrentTime = new Date();
    let minuto = CurrentTime.getMinutes();
    let hora = CurrentTime.getHours();
    let horaFormatada = hora < 10 ? "0" + hora : hora;
    let minutoFormatado = minuto < 10 ? "0" + minuto : minuto;
    let a = document.getElementById('dia').innerHTML = `${diaSemana}, ${horaFormatada}:${minutoFormatado}`;
    
}
updateTime()
setInterval(updateTime, 1000);






const dias = ["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sábado"]

const temperatureHTML = document.getElementById('temperatura')
const windHTML = document.getElementById('velVento')
const humityHTML = document.getElementById('percUmidade')
const rainHTML = document.getElementById('chanceChuva')
const temporalHTML = document.getElementById('temporal')


async function getTemporal() {
    const response = await fetch("https://api.hgbrasil.com/weather?key=50f43aa2&woeid=455826&array_limit=2&fields=only_results,description&locale=pt")
    const data = await response.json();
    const { description } = data;
    console.log(data);
    
    temporalHTML.innerHTML = `${description}`;
}

getTemporal()

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


function atualizarImagemComBaseNoHorario() {
    const agora = new Date()
    let hora = agora.getHours()
    
    const imagem = document.getElementById("imagemHorario")
    
    if (hora >= 6 && hora < 18) {
        imagem.classList.add("fa-sun")
        imagem.classList.remove("fa-moon")
    } else {
        imagem.classList.add("fa-moon")
        imagem.classList.remove("fa-sun")
    }
}
atualizarImagemComBaseNoHorario()
setInterval(atualizarImagemComBaseNoHorario, 1000)

window.addEventListener("load", atualizarImagemComBaseNoHorario);



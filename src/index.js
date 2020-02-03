const Continents = require("./destinations");
const keys = require("../config/keys");
const axios = require("axios");

const colors = [
  "#46B1C9",
  "#84C0C6",
  "#9FB7B9",
  "#BCC1BA",
  "#A57982",
  "#B98EA7",
  "#FCECC9",
  "#FCB0B3",
  "#F93943",
  "#7EB2DD",
  "#445E93"
];

let options;
let startAngle = 0;
let spinTimeout = null;

let spinArcStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("spin").addEventListener("click", spin);
  document
    .getElementById("filter")
    .addEventListener("change", drawRouletteWheel);

  drawRouletteWheel();
  //   document.addEventListener("DOMContentLoaded", () => {
  // drawRouletteWheel();
  //   });

  function drawRouletteWheel() {
    let canvas = document.getElementById("canvas");
    let optionIndex = document.getElementById("filter").selectedIndex;
    let option = document.getElementById("filter").options[optionIndex];
    let ctx;
    if (canvas.getContext) {
      let outsideRadius = 310;
      let textRadius = 260;
      let insideRadius = 215;

      ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 500, 500);

      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;

      ctx.font = "bold 12px Helvetica, Arial";

      switch (option.value) {
        case "all":
          options = [
            ...Continents.northAmerica,
            ...Continents.southAmerica,
            ...Continents.europe,
            ...Continents.asia,
            ...Continents.africa,
            ...Continents.australia
          ];
          break;
        case "northAmerica":
          options = [...Continents.northAmerica];
          break;
        case "southAmerica":
          options = [...Continents.southAmerica];
          break;
        case "europe":
          options = [...Continents.europe];
          break;
        case "asia":
          options = [...Continents.asia];
          break;
        case "africa":
          options = [...Continents.africa];
          break;
        case "australia":
          options = [...Continents.australia];
          break;
        default:
          options = [
            ...Continents.northAmerica,
            ...Continents.southAmerica,
            ...Continents.europe,
            ...Continents.asia,
            ...Continents.africa,
            ...Continents.australia
          ];
          break;
      }

      for (let i = 0; i < options.length; i++) {
        const arc = Math.PI / (options.length / 2);
        let angle = startAngle + i * arc;
        ctx.fillStyle = colors[i % colors.length];

        ctx.beginPath();
        ctx.arc(350, 350, outsideRadius, angle, angle + arc, false); //this is for the wheel center
        ctx.arc(350, 350, insideRadius, angle + arc, angle, true);
        ctx.stroke();
        ctx.fill();

        ctx.save();
        ctx.shadowOffsetX = -1;
        ctx.shadowOffsetY = -1;
        ctx.shadowBlur = 0;
        ctx.shadowColor = "rgb(220,220,220)";
        ctx.fillStyle = "black";
        ctx.translate(
          350 + Math.cos(angle + arc / 2) * textRadius, //make sure this matches the wheel center
          350 + Math.sin(angle + arc / 2) * textRadius
        );
        ctx.rotate(angle + arc / 0.5 + Math.PI / 0.25 - 0.1); //rotate text
        let text = options[i].name;
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }

      //start covering
      for (let i = 0; i < options.length; i++) {
        const arc = Math.PI / (options.length / 2);
        let angle = startAngle + i * arc;
        ctx.fillStyle = "black";

        ctx.beginPath();
        ctx.arc(350, 350, outsideRadius, angle, angle + arc, false); //this is for the wheel center
        // ctx.arc(350, 350, insideRadius, angle + arc, angle, true);
        ctx.stroke();
        ctx.fill();

        ctx.save();
      }
      //end covering

      ctx.fillStyle = "black";
      ctx.beginPath();
      canvas_arrow(ctx, 680, 345, 635, 345);
      ctx.lineWidth = 10;
      ctx.stroke();

      function canvas_arrow(context, fromx, fromy, tox, toy) {
        let headlen = 9; // length of head in pixels
        let dx = tox - fromx;
        let dy = toy - fromy;
        let angle = Math.atan2(dy, dx);
        context.moveTo(fromx, fromy);
        context.lineTo(tox, toy);
        context.lineTo(
          tox - headlen * Math.cos(angle - Math.PI / 7),
          toy - headlen * Math.sin(angle - Math.PI / 7)
        );
        context.moveTo(tox, toy);
        context.lineTo(
          tox - headlen * Math.cos(angle + Math.PI / 7),
          toy - headlen * Math.sin(angle + Math.PI / 7)
        );
      }
    }
  }

  function spin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
  }

  function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    let spinAngle =
      spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI) / 180;
    drawRouletteWheel();
    spinTimeout = setTimeout(rotateWheel(), 30);
  }

  function stopRotateWheel() {
    let ctx = canvas.getContext("2d");
    const arc = Math.PI / (options.length / 2);
    clearTimeout(spinTimeout);
    let degrees = (startAngle * 180) / Math.PI + 90 - 90;
    let arcd = (arc * 180) / Math.PI;
    let index = Math.floor((360 - (degrees % 360)) / arcd);
    ctx.save();
    ctx.font = "bold 30px Helvetica, Arial";
    let text = options[index].name;
    let id = options[index].id;
    let airport = options[index].airport;
    ctx.fillText(text, 350 - ctx.measureText(text).width / 2, 350 + 10);
    ctx.restore();
    displayWeather(id);
    // displayFlights(airport);
  }

  function easeOut(t, b, c, d) {
    let ts = (t /= d) * t;
    let tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }


  function displayWeather(id) {
    const app = document.getElementById("root");
    const container = document.createElement("div");
    container.setAttribute("class", "container");
    if (app.lastChild) app.removeChild(app.lastChild);
    app.appendChild(container);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${id}&APPID=${keys.weather}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        const currentTemp = Math.round(
          ((data.main.temp - 273.15) * 9) / 5 + 32
        ); //current temp in F
        const feelsLike = Math.round(
          ((data.main.feels_like - 273.15) * 9) / 5 + 32
        ); //feels like in F
        const currentLow = Math.round(
          ((data.main.temp_min - 273.15) * 9) / 5 + 32
        ); //current low in F
        const currentHigh = Math.round(
          ((data.main.temp_max - 273.15) * 9) / 5 + 32
        ); //current high in F

        const weather = document.createElement("div");
        weather.setAttribute("class", "weather");
        const h1 = document.createElement("h1");
        h1.textContent = data.weather[0].main; //description
        const icon = document.createElement("img");
        icon.setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        );
        const p = document.createElement("p");
        p.textContent = `Current temp: ${currentTemp}
        Feels Like: ${feelsLike}
        High: ${currentHigh}
        Low: ${currentLow}`;

        container.appendChild(weather);
        weather.appendChild(h1);
        weather.appendChild(icon);
        weather.appendChild(p);
      })
      .catch(err => {
        console.log(err);
      });
  }
  
});

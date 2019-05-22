window.addEventListener("visibilitychange", () => {
  switch (document.hidden) {
    case "prerender":
      console.log("Tab is pre-rendering");
    case "hidden":
      console.log("Tab is hidden");
    case "visible":
      console.log("Tab is foucsed");
  }
});

window.addEventListener("offline", networkStatus);
window.addEventListener("online", networkStatus);
function networkStatus(e) {
  console.log(e.type);
}

window.addEventListener("deviceorientation", e => {
  console.log("Gamma: ", e.gamma);
  console.log("Beta: ", e.beta);
  console.log("Alpha: ", e.alpha);
});

let logo = document.querySelector("img");
window.addEventListener("deviceorientation", e => {
  let tiltLR = e.gamma;
  let tiltFB = e.beta;
  logo.style.transform = `rotate(${tiltLR}deg) rotate3d(1,0,0,${tiltFB *
    -1}deg)`;
});

// clipboard
// 1. user interaction is required
let button = document.querySelector("button");
button.addEventListener("click", () => {
  select();
  copy();
});

// 2.programmatically select an element

function select() {
  let input = document.querySelector("input");
  input.focus();
  input.setSelectionRange(0, input.value.length);
}

// 3. copy select element text
function copy() {
  try {
    document.execCommand("copy");
  } catch (err) {
    console.log(err);
  }
}

document.addEventListener("copy", e => {
  console.log(e.target.value);
});
document.addEventListener("cut", e => {
  console.log(e.target.value);
});
document.addEventListener("paste", e => {
  console.log(e.clipboardData.getData("text/plain"));
});

// ambient light

window.addEventListener("devicelight", e => {
  console.log(`${e.value} lux`);
});

// 亮度传感器
let sensor = new AmbientLightSensor();

sensor.start();
sensor.onchange = e => {
  console.log(e.reading.illuminance);
};
sensor.stop();

// battery status

navigator.getBattery().then(battery => {
  console.log(`${battery.level * 100}%`);
  battery.addEventListener("levelchange", () => {
    console.log(`${this.level * 100}%`);
  });
});

// gamepad
window.addEventListener("gamepadconnected", () => {
  let gp = navigator.getGamepads()[0];
  console.log("ID: ", gp.id);
  console.log("Axes: ", gp.axes.length);
  console.log("Buttons: ", gp.buttons.length);
});

// Game Loop

window.addEventListener("gamepadconnected", gameLoop);
function gameLoop() {
  let gp = navigator.getGamepads()[0];
  if (gp.buttons[0].pressed) {
    console.log("X");
  }
  requestAnimationFrame(gameLoop);
}

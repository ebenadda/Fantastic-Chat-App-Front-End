import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

let optionButtons = document.querySelectorAll(".option-button");
let advancedOptionButtons = document.querySelectorAll(".adv-option-button");
let textInput = document.getElementById("input");
// let formatButtons = document.querySelectorAll(".format");

var socket = io("http://localhost:3000/");
var messages = document.getElementById("messages");
//var form = document.getElementById("form");

//neten's codes
var newBtn = document.getElementById("listen");
var inputValue = document.getElementById("user_input");
var input = document.getElementById("input");
var sendBtn = document.getElementById("btn");

//This is to change the color when the button is pressed for bold, underline, etc
//Not Working
const highlighter = (formatButtons) => {
  formatButtons.foreach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
    });
  });
};

optionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.execCommand(button.id, false, null);
  });
});

advancedOptionButtons.forEach((button) => {
  button.addEventListener("change", () => {
    document.execCommand(button.id, false, button.value);
  });
});

sendBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (input.innerHTML) {
    socket.emit("chat message", input.innerHTML);
    input.innerHTML = "";
  }
});

socket.on("chat message", function (msg) {
  var item = document.createElement("li");
  item.innerHTML = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
newBtn.addEventListener("submit", getGif);
function getGif(evt) {
  evt.preventDefault();
  const TENOR_KEY = "AIzaSyBfBf9u8QN24VSoz3g5CIkLb8a4FOCYP-o";
  const URL = `https://tenor.googleapis.com/v2/search?key=${TENOR_KEY}&q=${inputValue.value}`;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => createGifCards(data.results));
}

function createGifCards(gifs) {
  removeAllChildren("#gifs_container");
  for (let index = 0; index < 4; index++) {
    const gif = gifs[index];
    const gifUrl = gif.media_formats.tinygif.url;
    const newImage = document.createElement("img");

    newImage.setAttribute("src", gifUrl);
    newImage.setAttribute("onclick", (input.textContent = gifUrl));
    document.querySelector("#gifs_container").appendChild(newImage);
  }
}

function removeAllChildren(parentEltSelector) {
  const parent = document.querySelector(parentEltSelector);
  while (parent.lastChild !== null) {
    parent.lastChild.remove();
  }
}

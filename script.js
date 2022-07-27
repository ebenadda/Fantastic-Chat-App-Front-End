import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

let optionButtons = document.querySelectorAll(".option-button");
let advancedOptionButtons = document.querySelectorAll(".adv-option-button");
let textInput = document.getElementById("input");
// let formatButtons = document.querySelectorAll(".format");

var socket = io("http://localhost:3000/");
var messages = document.getElementById("messages");
//var form = document.getElementById("form");
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

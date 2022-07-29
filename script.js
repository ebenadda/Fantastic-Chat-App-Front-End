import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socket = io("http://localhost:3000/");
const messages_container = document.getElementById("messages-container");
const form = document.getElementById("form");
const handle = document.getElementById("handle");
const message = document.getElementById("message");

socket.on("message", (message) => {
  outputMessage(message);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (handle.value && message.value) {
    const msg = e.target.elements.handle.value;
    const sender = e.target.elements.message.value;

    socket.emit("fromUser", {
      text: msg,
      sender: sender,
    });
    e.target.elements.handle.value = " ";
    e.target.elements.handle.focus();
  }
});

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("newMessage");
  div.innerHTML = `<p class="meta">${message.username} at <span>${message.time}</span></p>
  <p class="text">${message.text}</p>`;
  messages_container.appendChild(div);
}

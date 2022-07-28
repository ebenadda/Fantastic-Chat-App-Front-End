import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
const socket = io("http://localhost:3000/");
const messages_container = document.getElementById("messages-container");
const form = document.getElementById("form");
const handle = document.getElementById("handle");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (handle.value && message.value) {
    socket.emit("chat message", {
      text: message.value,
      sender: handle.value,
    });
    // handle.value = "";
  }
});

socket.on("chat message", function (msgObj) {
  const item = document.createElement("li");
  //Sender: text
  const text = msgObj.text;
  const sender = msgObj.sender;
  item.textContent = `${text}: ${sender}`;
  messages_container.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

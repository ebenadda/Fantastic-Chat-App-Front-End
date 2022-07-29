import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socket = io("http://localhost:3000/");
const messages_container = document.getElementById("messages-container");
const form = document.getElementById("form");
const onlineUsers = document.getElementById("online-user-container");

const { username } = Qs.parse(location.search, { ignoreQueryPrefix: true });

//Transmit as new user get connected
socket.emit("newUser", username);

//Getting online user list
socket.on("users", (users) => {
  onlineUsers.innerHTML = " ";
  users.forEach((user) => {
    onlineUsers.innerHTML += `<li>${user.username}</li>`;
  });
});

//Messages from server
socket.on("message", (message) => {
  outputMessage(message);
});

//Listen to message after clicking send
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const msg = e.target.elements.handle.value;
  //Message to server
  socket.emit("fromUser", msg);
  e.target.elements.handle.value = " ";
  //Leave cursor on message box
  e.target.elements.handle.focus();
});

//Function to append the message to display
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("newMessage");
  div.innerHTML = `<p class="meta">${message.username} at <span>${message.time}</span></p>
  <p class="text">${message.text}</p>`;
  messages_container.appendChild(div);
}

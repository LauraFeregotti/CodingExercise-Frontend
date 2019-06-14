// Getting my HTML elements and assigning them variables for JavaScript manipulation
let listofelements = document.getElementById("listofelements");
let messages = document.getElementById("messages");
let textbox = document.getElementById("textbox");
let button = document.getElementById("button");

// Setting APIs to a variable
let url = new URL("http://localhost:5000/api/v1.0");

/* Creating prompt messages, so the user can set the value of the token(chatroom) and the author(nick/name)
Im currently using the chatroom as a token as I never receive the token for my API */
let chatroom = prompt("Enter the name of the chatroom");
if (chatroom != null) {
  token = chatroom;
}
let nick = prompt("Enter your nick");
if (nick != null) {
  author = nick;
}
//Creating the POST request 
function sendData() {
  url.searchParams.delete("token", token);
  url.searchParams.delete("limit", 10);
  response = fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      author: author,
      message: textbox.value
    }),
    headers: {
      'Content-Type': 'application/json',
      'token': token
    }
  }).then(response => {
    if (response.ok) getMessages()
    textbox.value = "";
  });
}
//Every time the user clicks the button or uses the "enter" key, the function "sendData" fires and the POST request is made.
button.addEventListener('click', sendData);
textbox.addEventListener('keyup', function onEvent(e) {
  if (e.keyCode === 13) {
    sendData();
  }
});
//Creating the GET request 
function getMessages() {
  //Adding query params to get just 10 messages newer 
  url.searchParams.append("token", token);
  url.searchParams.append("limit", 10);
  endpoint = `${url}`;
  fetch(endpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      messages.innerHTML = "";
      creatingMessage(myJson);
    });
};
//This function takes the json response values and creates the message
function creatingMessage(myJson) {
  for (let index = 0; index < myJson.length; index++) {
//Creating HTML elements
    let messageContainer = document.createElement("div");
    messageContainer.className = 'secondcontainer row';

    let message = document.createElement("p");
    message.className = 'messagedisplay';

    let author = document.createElement("p");
    author.className = 'author';

    let dateAndTime = document.createElement("p");
    dateAndTime.className = 'time';
    //Parsing time using Moment
    let timeforparsing = myJson[index].time;
    let parsing = moment(timeforparsing).format("DD MMM YYYY hh:mm a");
//Assigning to every HTML element an specific jason value
    author.innerHTML = myJson[index].author;
    dateAndTime.innerHTML = parsing;
    message.innerHTML = myJson[index].message;
//Appending the HTML elements and containers
    messageContainer.appendChild(author);
    messageContainer.appendChild(message);
    messageContainer.appendChild(dateAndTime);
    messages.appendChild(messageContainer);

  }
}
//This method generates a polling. Every 5 seconds it will generate a GET request
setInterval(getMessages, 5000);


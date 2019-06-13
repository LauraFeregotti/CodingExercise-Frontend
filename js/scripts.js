/* Getting my HTML elements and assigning them variables for JavaScript manipulation*/
let listofelements = document.getElementById("listofelements");
let messages = document.getElementById("messages");
let textbox = document.getElementById("textbox");
let button = document.getElementById("button");

/* Setting APIs to a variable*/
let url = new URL("http://localhost:5000/api/v1.0");

/* Creating prompt messages, so the user can set the value of the token(chatroom) and the author(nick/name) */
let chatroom = prompt("Enter the name of the chatroom");
if (chatroom != null) {
  token = chatroom;
}
let nick = prompt("Enter your nick");
if (nick != null) {
  author = nick;
}

/*Creating the POST request */

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
    });
  }
  
  button.addEventListener('click', sendData);
  textbox.addEventListener('keyup', function onEvent(e) {
    if (e.keyCode === 13) {
        sendData();
    }
});

/*Creating the GET request */
function getMessages() {
    /*Adding query params to get just 10 messages newer */
  url.searchParams.append("token", token);
  url.searchParams.append("limit", 10);
    endpoint = `${url}`;
    fetch(endpoint)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        messages.innerHTML = "";
        for (let index = 0; index < myJson.length; index++) {
          let container = document.createElement("div");
        container.className = 'col-lg-12 col-sm-12 col-xs-12 container ';
        let secondcontainer = document.createElement("div");
        secondcontainer.className = 'secondcontainer row';
        let newMessage = document.createElement("p");
        newMessage.className = 'messagedisplay';
        let newMessageAuthor = document.createElement("p");
        newMessageAuthor.className = 'author';
        let newMessageTime = document.createElement("p");
        newMessageTime.className = 'time';
/*Parsing time using Moment*/
        let timeforparsing = myJson[index].time;
        let parsing = moment(timeforparsing).format("DD MMM YYYY hh:mm a");
        console.log(parsing);
        newMessageAuthor.innerHTML= myJson[index].author;
        newMessageTime.innerHTML= parsing
        newMessage.innerHTML = myJson[index].message; 
        secondcontainer.appendChild(newMessageAuthor);
        secondcontainer.appendChild(newMessage);
        secondcontainer.appendChild(newMessageTime);
        container.appendChild(secondcontainer);
        messages.appendChild(container);
          textbox.value = "";
  
        }
      });
};

setInterval(polling, 5000); 

function polling() {
  /*Adding query params to get just 10 messages newer */
  url.searchParams.append("token", token);
  url.searchParams.append("limit", 10);
  endpoint = `${url}`;
  fetch(endpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(myJson);
      messages.innerHTML = "";
      for (let index = 0; index < myJson.length; index++) {
        let container = document.createElement("div");
        container.className = 'col-lg-12 col-sm-12 col-xs-12 container ';
        let secondcontainer = document.createElement("div");
        secondcontainer.className = 'secondcontainer row';
        let newMessage = document.createElement("p");
        newMessage.className = 'messagedisplay';
        let newMessageAuthor = document.createElement("p");
        newMessageAuthor.className = 'author';
        let newMessageTime = document.createElement("p");
        newMessageTime.className = 'time';
      
        let timeforparsing = myJson[index].time;
        let parsing = moment(timeforparsing).format("DD MMM YYYY hh:mm a");
        console.log(parsing);
        newMessageAuthor.innerHTML= myJson[index].author;
        newMessageTime.innerHTML= parsing
        newMessage.innerHTML = myJson[index].message; 
        secondcontainer.appendChild(newMessageAuthor);
        secondcontainer.appendChild(newMessage);
        secondcontainer.appendChild(newMessageTime);
        container.appendChild(secondcontainer);
        messages.appendChild(container);
        

      }
    });
}; 
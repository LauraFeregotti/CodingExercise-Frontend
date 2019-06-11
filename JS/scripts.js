let listofelements = document.getElementById("listofelements");
let messages = document.getElementById("messages");
let textbox = document.getElementById("textbox");
let button = document.getElementById("button");

/* Setting APIs to a variable*/
let apiUrlForGet = 'http://localhost:5000/api/v1.0?token=';
let url = 'http://localhost:5000/api/v1.0';
let author = 'Tom';
let token = 'laura-test';

var chatroom = prompt("Enter the name of the chatroom");
if (chatroom != null) {
  token = chatroom;
}
var nick = prompt("Enter your nick");
if (nick != null) {
  author = nick;
}

function sendData() {

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

 
function getMessages() {
    endpoint = `${apiUrlForGet}${token}`;
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
          textbox.value = "";
  
        }
      });
};

  /*setInterval(getMessages, 5000); */
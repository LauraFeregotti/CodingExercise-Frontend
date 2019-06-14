//Defining my HTML elements in JS for manipulation
let listofelements = document.getElementById("listofelements");
let messages = document.getElementById("messages");
let textbox = document.getElementById("textbox");
let button = document.getElementById("button");

//Defining the url of my API
let url = new URL("http://localhost:5000/api/v1.0");

//This functions fires the chatroom prompt
addingChatRoomName();
//This functions fires the nick prompt
addingNickName();

/*Allows the user to set the value of the token using a prompt
I'm currently setting the value of the token because I didn't receive the token.
The prompt will keep executing until the user enters a value*/
function addingChatRoomName() {
    let chatroom;
    while (chatroom == null || chatroom == "") {
        chatroom = prompt("Enter the name of the chatroom");
    }
    if (chatroom != "" || chatroom != null) {
        token = chatroom;
    }
}

/*Allows the user to set the value of the author using a prompt.
The prompt will keep executing until the user enters a value*/
function addingNickName() {
    let nick;
    while (nick == null || nick == "") {
        nick = prompt("Enter your nick");
    }
    if (nick != "" || nick != null) {
        author = nick;
    }
}

//Making a POST request
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

//Every time the user clicks or presses "enter", the function sendData starts to run and makes a POST request
button.addEventListener('click', sendData);
textbox.addEventListener('keyup', function onEvent(e) {
    if (e.keyCode === 13) {
        sendData();
    }
});

//Making a GET request and getting only a maximum of 10 messages newer
function getMessages() {
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

//This function takes the json value response of the GET request and creates a message element
function creatingMessage(myJson) {
    for (let index = 0; index < myJson.length; index++) {
        //Creating HTML elements and setting its classes
        let messageContainer = document.createElement("div");
        messageContainer.className = 'secondcontainer row';

        let message = document.createElement("p");
        message.className = 'messagedisplay';

        let author = document.createElement("p");
        author.className = 'author';

        let dateAndTime = document.createElement("p");
        dateAndTime.className = 'time';
        //Parsing the time with Moment.js
        let timeforparsing = myJson[index].time;
        let parsing = moment(timeforparsing).format("DD MMM YYYY hh:mm a");
        console.log(parsing);
        //Adding specific json values to the HTML elements        
        author.innerHTML = myJson[index].author;
        dateAndTime.innerHTML = parsing
        message.innerHTML = myJson[index].message;
        //Appending the HTML elements      
        messageContainer.appendChild(author);
        messageContainer.appendChild(message);
        messageContainer.appendChild(dateAndTime);
        messages.appendChild(messageContainer);
    }
}
//This method makes a polling, by making a GET request with the function getMessages every 5 seconds
setInterval(getMessages, 5000);
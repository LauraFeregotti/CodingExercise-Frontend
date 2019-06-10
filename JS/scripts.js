let listofelements = document.getElementById("listofelements");
let messages = document.getElementById("messages");
let textbox = document.getElementById("textbox");
let button = document.getElementById("button");

let apiUrlForGet = 'http://localhost:5000/api/v1.0?token=';
let url = 'http://localhost:5000/api/v1.0';
let author = 'Tom';
let token = 'laura-test';

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

 


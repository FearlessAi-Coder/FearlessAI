console.log("FearlessAI loaded");


const input = document.querySelector(".message-input");
const send = document.querySelector(".send");
const messages = document.querySelector(".messages");



function addMessage(text, type){


    const message = document.createElement("div");


    message.className = "message " + type;


    message.innerHTML = `

        <div class="avatar ${type}">
            ${type === "user" ? "U" : "⚡"}
        </div>


        <div class="bubble">

            ${text}

        </div>

    `;


    messages.appendChild(message);


    messages.scrollTop = messages.scrollHeight;

}




function sendMessage(){


    let text = input.value.trim();


    if(text === "") return;



    const welcome = document.querySelector(".welcome");


    if(welcome){
        welcome.remove();
    }



    addMessage(text,"user");


    input.value = "";



    setTimeout(()=>{


        addMessage(
        "FearlessAI is working 🔥 Backend connection is next.",
        "ai"
        );


    },800);



}




send.addEventListener(
"click",
sendMessage
);



input.addEventListener(
"keydown",
function(e){

    if(e.key === "Enter"){

        sendMessage();

    }

});

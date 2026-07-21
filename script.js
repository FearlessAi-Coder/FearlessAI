// =================================
// FEARLESSAI V4
// WORKING FRONTEND SCRIPT
// =================================

console.log("FearlessAI is running");


const input = document.querySelector(".message-input");
const sendButton = document.querySelector(".send");
const messages = document.querySelector(".messages");
const newChat = document.querySelector(".new-chat");
const attachButton = document.querySelector(".icon-btn");


// Add messages

function addMessage(text, type){

    const message = document.createElement("div");

    message.className = "message " + type;


    message.innerHTML = `

        <div class="avatar ${type}">
            ${type === "user" ? "U" : "⚡"}
        </div>

        <div class="bubble">
            ${text}
            <div class="message-time">
                ${new Date().toLocaleTimeString()}
            </div>
        </div>

    `;


    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;

}



// Send message

function sendMessage(){

    const text = input.value.trim();


    if(text === "") return;


    document.querySelector(".welcome")?.remove();


    addMessage(text,"user");


    input.value = "";


    setTimeout(()=>{

        addMessage(
        "⚡ FearlessAI received your message!",
        "ai"
        );

    },700);

}



// Send button

if(sendButton){

    sendButton.onclick = sendMessage;

}


// Enter key

if(input){

    input.addEventListener("keydown",(e)=>{

        if(e.key === "Enter"){

            sendMessage();

        }

    });

}



// New chat button

if(newChat){

    newChat.onclick = ()=>{

        messages.innerHTML = `

        <div class="welcome">

        <h1>
        Welcome to <span>FearlessAI</span>
        </h1>

        <p>
        Ask anything, create, learn and build.
        </p>

        </div>

        `;

    };

}



// Attach button

if(attachButton){

    attachButton.onclick = ()=>{

        alert("File upload feature coming soon ⚡");

    };

}

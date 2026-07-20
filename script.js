// ===========================================
// FEARLESS AI V2
// Premium Script
// ===========================================

const input = document.getElementById("question");
const chatHistory = document.getElementById("chat-history");
const output = document.getElementById("output");

let isThinking = false;

// ===========================================
// Time
// ===========================================

function getTime(){

    return new Date().toLocaleTimeString([],{

        hour:"2-digit",

        minute:"2-digit"

    });

}

// ===========================================
// Auto Scroll
// ===========================================

function scrollBottom(){

    chatHistory.scrollTop = chatHistory.scrollHeight;

}

// ===========================================
// Save Chat
// ===========================================

function saveChat(){

    localStorage.setItem(

        "fearless_history",

        chatHistory.innerHTML

    );

}

// ===========================================
// Load Chat
// ===========================================

function loadChat(){

    const saved = localStorage.getItem(

        "fearless_history"

    );

    if(saved){

        chatHistory.innerHTML = saved;

    }

}

// ===========================================
// User Message
// ===========================================

function addUserMessage(message){

    chatHistory.innerHTML += `

    <div class="user-message">

        <strong>You</strong>

        <br><br>

        ${message}

        <br><br>

        <small>${getTime()}</small>

    </div>

    `;

    saveChat();

    scrollBottom();

}

// ===========================================
// AI Message
// ===========================================

function addAIMessage(message){

    chatHistory.innerHTML += `

    <div class="ai-message">

        <strong>⚡ FearlessAI</strong>

        <br><br>

        ${message}

        <br><br>

        <small>${getTime()}</small>

    </div>

    `;

    saveChat();

    scrollBottom();

}
// ===========================================
// Typing Animation
// ===========================================

function showThinking(){

    output.innerHTML = `

    <div class="typing">

        <span></span>
        <span></span>
        <span></span>

    </div>

    <p>FearlessAI is thinking...</p>

    `;

}

function hideThinking(){

    output.innerHTML = "";

}

// ===========================================
// Ask AI
// ===========================================

async function askAI(){

    if(isThinking){

        return;

    }

    const question = input.value.trim();

    if(question===""){

        input.focus();

        return;

    }

    isThinking = true;

    addUserMessage(question);

    input.value="";

    input.disabled=true;

    showThinking();

    try{

        const response = await fetch("/api/ask",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                question:question

            })

        });

        if(!response.ok){

            throw new Error("Server Error");

        }

        const data = await response.json();

        hideThinking();

        addAIMessage(data.answer);

    }

    catch(error){

        hideThinking();

        addAIMessage(

            "❌ Sorry, FearlessAI is unavailable right now. Please try again."

        );

    }

    finally{

        isThinking=false;

        input.disabled=false;

        input.focus();

    }

}

// ===========================================
// Enter Key
// ===========================================

input.addEventListener("keydown",function(event){

    if(event.key==="Enter"){

        event.preventDefault();

        askAI();

    }

});
// ===========================================
// Clear Chat
// ===========================================

function clearChat(){

    const confirmClear = confirm(
        "Are you sure you want to clear the conversation?"
    );

    if(!confirmClear){

        return;

    }

    chatHistory.innerHTML = `

    <div class="ai-message">

        <strong>⚡ FearlessAI</strong>

        <br><br>

        👋 Hello! I'm FearlessAI. How can I help you today?

        <br><br>

        <small>${getTime()}</small>

    </div>

    `;

    output.innerHTML = "";

    localStorage.removeItem("fearless_history");

    saveChat();

    scrollBottom();

}

// ===========================================
// Open Chat
// ===========================================

function openChat(){

    input.focus();

    input.scrollIntoView({

        behavior:"smooth",

        block:"center"

    });

}

// ===========================================
// Startup
// ===========================================

window.addEventListener("load",()=>{

    loadChat();

    if(chatHistory.innerHTML.trim()===""){

        chatHistory.innerHTML = `

        <div class="ai-message">

            <strong>⚡ FearlessAI</strong>

            <br><br>

            👋 Welcome! Ask me anything.

            <br><br>

            <small>${getTime()}</small>

        </div>

        `;

    }

    scrollBottom();

    input.focus();

});

// ===========================================
// Auto Save
// ===========================================

const observer = new MutationObserver(()=>{

    saveChat();

});

observer.observe(chatHistory,{

    childList:true,

    subtree:true

});

// ===========================================
// Small Welcome Effect
// ===========================================

setTimeout(()=>{

    document.body.style.opacity="1";

},100);
// ===========================================
// Copy AI Messages
// ===========================================

function copyText(text){

    navigator.clipboard.writeText(text)
    .then(()=>{

        console.log("Copied!");

    })
    .catch(()=>{

        console.log("Copy failed.");

    });

}

// ===========================================
// Create AI Bubble
// ===========================================

function createAIBubble(message){

    const bubble = document.createElement("div");

    bubble.className = "ai-message";

    bubble.innerHTML = `

        <strong>⚡ FearlessAI</strong>

        <button class="copy-btn">📋</button>

        <br><br>

        <span class="message-text">

            ${message}

        </span>

        <br><br>

        <small>${getTime()}</small>

    `;

    const copyButton = bubble.querySelector(".copy-btn");

    copyButton.onclick = ()=>{

        copyText(message);

        copyButton.innerHTML="✅";

        setTimeout(()=>{

            copyButton.innerHTML="📋";

        },1500);

    };

    chatHistory.appendChild(bubble);

    scrollBottom();

    saveChat();

}

// ===========================================
// Replace addAIMessage
// ===========================================

addAIMessage = function(message){

    createAIBubble(message);

};

// ===========================================
// Message Animation
// ===========================================

function animateMessages(){

    const messages = document.querySelectorAll(

        ".ai-message,.user-message"

    );

    messages.forEach(msg=>{

        msg.style.opacity="0";

        msg.style.transform="translateY(20px)";

        setTimeout(()=>{

            msg.style.transition=".4s";

            msg.style.opacity="1";

            msg.style.transform="translateY(0px)";

        },50);

    });

}

// ===========================================
// Observe New Messages
// ===========================================

const animationObserver = new MutationObserver(()=>{

    animateMessages();

});

animationObserver.observe(chatHistory,{

    childList:true

});

// ===========================================
// Welcome
// ===========================================

console.log("⚡ FearlessAI Premium Loaded");
// ===========================================
// FEARLESS AI V2
// FINAL UTILITIES
// ===========================================

// Theme Button
const themeButton = document.getElementById("themeButton");

if(themeButton){

    themeButton.addEventListener("click",()=>{

        document.body.classList.toggle("light-mode");

        if(document.body.classList.contains("light-mode")){

            themeButton.innerHTML="☀️";

            localStorage.setItem("theme","light");

        }else{

            themeButton.innerHTML="🌙";

            localStorage.setItem("theme","dark");

        }

    });

    if(localStorage.getItem("theme")==="light"){

        document.body.classList.add("light-mode");

        themeButton.innerHTML="☀️";

    }

}

// ===========================================
// Keyboard Shortcut
// ===========================================

document.addEventListener("keydown",(event)=>{

    if(event.ctrlKey && event.key==="l"){

        event.preventDefault();

        clearChat();

    }

});

// ===========================================
// Disable Right Click (Optional)
// ===========================================

// document.addEventListener("contextmenu",(e)=>{
//     e.preventDefault();
// });

// ===========================================
// Online / Offline Status
// ===========================================

window.addEventListener("offline",()=>{

    output.innerHTML="🔴 You are offline.";

});

window.addEventListener("online",()=>{

    output.innerHTML="🟢 Connected.";

    setTimeout(()=>{

        output.innerHTML="";

    },2000);

});

// ===========================================
// Welcome
// ===========================================

console.log("⚡ FearlessAI v2 Loaded Successfully");

scrollBottom();

// ========================================
// LOADER
// ========================================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");
    }, 1200);

});


// ========================================
// COPY OUTPUT
// ========================================

function copyOutput(){

    const output = document.getElementById("outputText");

    if(!output) return;

    navigator.clipboard.writeText(output.innerText);

    showToast();
}


// ========================================
// TOAST
// ========================================

function showToast(){

    const toast = document.getElementById("toast");

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


// ========================================
// TERMINAL ANIMATION
// ========================================

const terminalLines = [
    "> Initializing Cipher Engine...",
    "> Loading Cryptography Modules...",
    "> Frequency Analysis Ready...",
    "> Brute Force System Active...",
    "> Secure Encryption Enabled..."
];

let index = 0;

setInterval(() => {

    const terminal = document.querySelector(".terminal-content");

    if(terminal && index < terminalLines.length){

        const p = document.createElement("p");

        p.textContent = terminalLines[index];

        terminal.appendChild(p);

        index++;
    }

}, 1800);
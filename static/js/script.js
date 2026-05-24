const terminalLines = [
    "> Scanning encrypted message...",
    "> Running Caesar brute force...",
    "> Checking frequency distribution...",
    "> Attempting Vigenère decryption...",
    "> Cipher cracked successfully..."
];

let index = 0;

setInterval(() => {

    const terminal = document.querySelector(".terminal-content");

    if(index < terminalLines.length){

        const p = document.createElement("p");
        p.textContent = terminalLines[index];

        terminal.appendChild(p);

        index++;
    }

}, 2000);
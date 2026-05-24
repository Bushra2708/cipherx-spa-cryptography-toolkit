// ========================================
// LOADER
// ========================================

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        if (loader) loader.classList.add("hide");
    }, 1000);
});

// ========================================
// COPY OUTPUT
// ========================================

function copyOutput() {
    const output = document.getElementById("outputText");
    if (!output || !output.innerText) return;

    navigator.clipboard.writeText(output.innerText)
        .then(() => {
            showToast("Copied to clipboard successfully!");
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
            showToast("Failed to copy text.");
        });
}

// ========================================
// DOWNLOAD RESULT (CLIENT-SIDE)
// ========================================

function downloadResult() {
    const output = document.getElementById("outputText");
    if (!output || !output.innerText) return;

    const text = output.innerText;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cipher_output.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast("Downloaded result successfully!");
}

// ========================================
// TOAST
// ========================================

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    
    if (message) {
        toast.textContent = message;
    }
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// ========================================
// THEME TOGGLE
// ========================================

function toggleTheme() {
    document.body.classList.toggle("light-theme");
    const icon = document.getElementById("themeIcon");
    if (!icon) return;

    if (document.body.classList.contains("light-theme")) {
        icon.innerText = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        icon.innerText = "🌙";
        localStorage.setItem("theme", "dark");
    }
}

// ========================================
// LOAD SAVED THEME
// ========================================

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const icon = document.getElementById("themeIcon");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        if (icon) icon.innerText = "☀️";
    }
});

// ========================================
// COUNTER ANIMATION
// ========================================

function animateCounters() {
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        counter.innerText = "0";
        const updateCounter = () => {
            const target = +counter.getAttribute("data-target");
            const current = +counter.innerText;
            const increment = target / 50; // faster animation

            if (current < target) {
                counter.innerText = `${Math.ceil(current + increment)}`;
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
}

window.addEventListener("DOMContentLoaded", animateCounters);

// ========================================
// REAL-TIME CHARACTERS COUNTER
// ========================================

window.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("textInput");
    const processedCounter = document.querySelector(".counter[data-target='5000']");
    
    if (textInput && processedCounter) {
        textInput.addEventListener("input", () => {
            const charCount = textInput.value.length;
            processedCounter.setAttribute("data-target", charCount || 5000);
            processedCounter.innerText = charCount;
        });
    }
});

// ========================================
// AJAX FORM SUBMISSION & SPA LOGIC
// ========================================

window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cipherForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // 1. Get the action triggered by the specific button clicked
        const action = e.submitter ? e.submitter.value : "process";

        // 2. Hide previous results with smooth transitions
        const outputWrapper = document.getElementById("outputWrapper");
        const outputPlaceholder = document.getElementById("outputPlaceholder");
        const bruteForceSection = document.getElementById("bruteForceSection");
        const frequencySection = document.getElementById("frequencySection");

        bruteForceSection.style.display = "none";
        frequencySection.style.display = "none";

        // 3. Setup visual console loader state
        outputPlaceholder.style.display = "flex";
        outputPlaceholder.innerHTML = `<div class="loader-circle" style="width: 40px; height: 40px; margin-bottom: 15px;"></div><p>Processing payload...</p>`;
        outputWrapper.style.display = "none";

        // 4. Gather form data (handles file uploads seamlessly)
        const formData = new FormData(form);
        formData.append("action", action);

        try {
            const response = await fetch("/", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                throw new Error(data.error || "An error occurred during cryptographic processing.");
            }

            // 5. Success! Populate output based on operation type
            if (action === "process" || action === "vigenere") {
                // Cipher execution
                outputPlaceholder.style.display = "none";
                outputWrapper.style.display = "flex";
                
                const outputText = document.getElementById("outputText");
                outputText.innerText = data.output;
                
                // Trigger subtle text glowing animation
                outputText.style.animation = 'none';
                void outputText.offsetWidth; // trigger reflow
                outputText.style.animation = 'fadeIn 0.5s ease';
                
                // Update processed characters counter
                const processedCounter = document.querySelector(".counter[data-target='5000']");
                if (processedCounter) {
                    const textLen = document.getElementById("textInput").value.length;
                    processedCounter.innerText = textLen;
                }
            } 
            else if (action === "bruteforce") {
                // Brute Force analysis
                outputPlaceholder.innerHTML = `Brute force analysis completed successfully.<br><br>Scroll below to explore all 26 possible Caesar cipher shifts.`;
                
                const grid = document.getElementById("bruteForceGrid");
                grid.innerHTML = ""; // clear previous card items
                
                data.brute_force_results.forEach(res => {
                    const card = document.createElement("div");
                    card.className = "brute-card";
                    card.innerHTML = `
                        <div class="shift-badge">Shift ${res.shift}</div>
                        <p>${res.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                    `;
                    grid.appendChild(card);
                });
                
                bruteForceSection.style.display = "block";
                
                // Smooth scroll to results
                setTimeout(() => {
                    bruteForceSection.scrollIntoView({ behavior: "smooth" });
                }, 100);
            } 
            else if (action === "analyze") {
                // Frequency analysis
                outputPlaceholder.innerHTML = `Frequency analysis report compiled.<br><br>Scroll below to examine letter distribution analytics.`;
                
                const grid = document.getElementById("frequencyGrid");
                grid.innerHTML = "";
                
                if (data.frequency_data && data.frequency_data.length > 0) {
                    data.frequency_data.forEach(item => {
                        const card = document.createElement("div");
                        card.className = "analysis-card";
                        card.innerHTML = `
                            <div class="analysis-top">
                                <div class="letter">${item.letter}</div>
                                <div class="percentage">${item.percentage}%</div>
                            </div>
                            <div class="progress-container">
                                <div class="progress-bar" style="width: ${item.percentage}%;"></div>
                            </div>
                            <div class="count">Total Occurrences: ${item.count}</div>
                        `;
                        grid.appendChild(card);
                    });
                } else {
                    grid.innerHTML = `<div class="placeholder" style="grid-column: 1/-1;">No alphabetical characters detected to perform analysis.</div>`;
                }
                
                document.getElementById("suggestedShiftValue").innerText = data.suggested_shift !== null ? data.suggested_shift : "-";
                frequencySection.style.display = "block";
                
                // Smooth scroll to results
                setTimeout(() => {
                    frequencySection.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }

        } catch (error) {
            console.error(error);
            showToast(error.message);
            outputPlaceholder.innerHTML = `<span style="color: #ef4444; font-weight: 600;">⚠️ Error: ${error.message}</span>`;
        }
    });
});
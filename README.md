# CipherX — Cyber Cryptography Analysis Platform

CipherX is a modern Single Page Application (SPA) based cryptography toolkit built using Flask, JavaScript, HTML, CSS, and cyber-security inspired UI design. The platform allows users to encrypt, decrypt, brute-force, and analyze encrypted text using classical cryptographic algorithms with a premium interactive dashboard experience.

---

# Live Demo

Deployable on Render using Gunicorn.

Example:

https://cipherx.onrender.com

---

# Features

## Encryption & Decryption

- Caesar Cipher Encryption
- Caesar Cipher Decryption
- Vigenère Cipher Encryption
- Vigenère Cipher Decryption

---

## Cryptography Analysis

- Brute Force Caesar Cracking
- Frequency Analysis
- Suggested Shift Prediction
- Character Distribution Statistics

---

## File Processing

- TXT File Upload Support
- Automatic File Parsing
- Download Processed Results
- Safe File Decode Handling

---

## SPA Architecture

- No Page Refresh
- Async Fetch API Requests
- Persistent Form Inputs
- Dynamic Console Rendering
- Fast Client-Side Updates

---

## Premium UI/UX

- Dark & Light Theme Toggle
- Cyberpunk Glassmorphism Design
- Responsive Layout
- Animated Dashboard Counters
- Floating Particle Effects
- Copy-to-Clipboard
- Toast Notifications
- Loading Animations

---

# Technologies Used

## Backend

- Python
- Flask
- Gunicorn

---

## Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API

---

## Deployment

- Render
- GitHub

---

# Project Structure

```plaintext
Cipher-Cracker/
│
├── app.py
├── requirements.txt
├── Procfile
├── runtime.txt
├── README.md
│
├── templates/
│   └── index.html
│
├── static/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── script.js
```

---

# Installation

## Clone Repository

```bash
git clone YOUR_GITHUB_REPO_LINK
```

---

## Navigate Into Project

```bash
cd Cipher-Cracker
```

---

## Create Virtual Environment

### Windows

```bash
python -m venv venv
```

---

## Activate Virtual Environment

### PowerShell

```bash
venv\Scripts\Activate.ps1
```

### CMD

```bash
venv\Scripts\activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Run Locally

```bash
python app.py
```

Open browser:

```plaintext
http://127.0.0.1:5000
```

---

# Deployment on Render

## Build Command

```bash
pip install -r requirements.txt
```

---

## Start Command

```bash
gunicorn app:app
```

---

# API Functionality

The Flask backend operates as both:

- Static page renderer (GET)
- JSON API processor (POST)

The API supports:

- Caesar encryption/decryption
- Vigenère encryption/decryption
- Brute force analysis
- Frequency analysis
- File upload processing

---

# Validation & Security

The backend includes:

- Input validation
- Invalid shift protection
- Vigenère key validation
- Safe file decoding
- HTTP status error handling
- JSON-based API responses

---

# Testing Examples

## Caesar Encryption

Input:

```plaintext
HELLO WORLD
```

Shift:

```plaintext
3
```

Output:

```plaintext
KHOOR ZRUOG
```

---

## Vigenère Encryption

Input:

```plaintext
HELLO WORLD
```

Keyword:

```plaintext
KEY
```

Output:

```plaintext
RIJVS UYVJN
```

---

## Brute Force

Input:

```plaintext
KHOOR
```

Expected:

```plaintext
Shift 3 → HELLO
```

---

# Highlights

- Production-ready Flask architecture
- SPA-style frontend interaction
- Modern cyber-security dashboard UI
- Render deployment ready
- Responsive on desktop/mobile
- Real cryptography implementations
- Professional frontend animations
- Theme persistence support


# License

This project is intended for educational and portfolio purposes.

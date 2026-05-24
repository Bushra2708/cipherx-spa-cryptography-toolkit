from flask import Flask, render_template, request, send_file
from collections import Counter
import io

app = Flask(__name__)


# ---------------------------------------------------
# Caesar Cipher
# ---------------------------------------------------

def caesar_cipher(text, shift, mode):

    result = ""

    if mode == "decrypt":
        shift = -shift

    for char in text:

        if char.isalpha():

            ascii_offset = 65 if char.isupper() else 97

            shifted_char = chr(
                (ord(char) - ascii_offset + shift) % 26 + ascii_offset
            )

            result += shifted_char

        else:
            result += char

    return result


# ---------------------------------------------------
# Brute Force Caesar
# ---------------------------------------------------

def brute_force_caesar(text):

    possibilities = []

    for shift in range(26):

        decrypted = caesar_cipher(text, shift, "decrypt")

        possibilities.append({
            "shift": shift,
            "text": decrypted
        })

    return possibilities


# ---------------------------------------------------
# Frequency Analysis
# ---------------------------------------------------

def frequency_analysis(text):

    letters_only = [
        char.lower()
        for char in text
        if char.isalpha()
    ]

    total_letters = len(letters_only)

    counter = Counter(letters_only)

    frequency_data = []

    for letter, count in counter.most_common():

        percentage = round((count / total_letters) * 100, 2)

        frequency_data.append({
            "letter": letter.upper(),
            "count": count,
            "percentage": percentage
        })

    suggested_shift = None

    if frequency_data:

        most_common_letter = frequency_data[0]["letter"]

        suggested_shift = (
            ord(most_common_letter.lower()) - ord('e')
        ) % 26

    return frequency_data, suggested_shift


# ---------------------------------------------------
# Vigenere Cipher
# ---------------------------------------------------

def vigenere_cipher(text, key, mode):

    result = ""

    key = key.lower()

    key_index = 0

    for char in text:

        if char.isalpha():

            shift = ord(key[key_index % len(key)]) - ord('a')

            if mode == "decrypt":
                shift = -shift

            ascii_offset = 65 if char.isupper() else 97

            encrypted_char = chr(
                (ord(char) - ascii_offset + shift) % 26 + ascii_offset
            )

            result += encrypted_char

            key_index += 1

        else:
            result += char

    return result


# ---------------------------------------------------
# Main Route
# ---------------------------------------------------

@app.route("/", methods=["GET", "POST"])
def home():

    output = ""
    brute_force_results = []
    frequency_data = []
    suggested_shift = None

    if request.method == "POST":

        action = request.form.get("action")

        text = request.form.get("text")

        # File Upload
        uploaded_file = request.files.get("file")

        if uploaded_file and uploaded_file.filename != "":

            text = uploaded_file.read().decode("utf-8")

        # Caesar Cipher
        if action == "process":

            shift = int(request.form.get("shift"))

            mode = request.form.get("mode")

            output = caesar_cipher(text, shift, mode)

        # Brute Force
        elif action == "bruteforce":

            brute_force_results = brute_force_caesar(text)

        # Frequency Analysis
        elif action == "analyze":

            frequency_data, suggested_shift = frequency_analysis(text)

        # Vigenere Cipher
        elif action == "vigenere":

            key = request.form.get("vigenere_key")

            mode = request.form.get("mode")

            output = vigenere_cipher(text, key, mode)

    return render_template(
        "index.html",
        output=output,
        brute_force_results=brute_force_results,
        frequency_data=frequency_data,
        suggested_shift=suggested_shift
    )


# ---------------------------------------------------
# Download Route
# ---------------------------------------------------

@app.route("/download", methods=["POST"])
def download():

    output_text = request.form.get("output_text")

    buffer = io.BytesIO()

    buffer.write(output_text.encode("utf-8"))

    buffer.seek(0)

    return send_file(
        buffer,
        as_attachment=True,
        download_name="cipher_output.txt",
        mimetype="text/plain"
    )


if __name__ == "__main__":
    app.run(debug=True)
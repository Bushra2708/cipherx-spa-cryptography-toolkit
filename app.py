from flask import Flask, render_template, request

app = Flask(__name__)


# Caesar Cipher Function
def caesar_cipher(text, shift, mode):

    result = ""

    # Decrypt mode reverses shift
    if mode == "decrypt":
        shift = -shift

    for char in text:

        if char.isalpha():

            ascii_offset = 65 if char.isupper() else 97

            encrypted_char = chr(
                (ord(char) - ascii_offset + shift) % 26 + ascii_offset
            )

            result += encrypted_char

        else:
            result += char

    return result


@app.route("/", methods=["GET", "POST"])
def home():

    output = ""

    if request.method == "POST":

        text = request.form.get("text")
        shift = int(request.form.get("shift"))
        mode = request.form.get("mode")

        output = caesar_cipher(text, shift, mode)

    return render_template("index.html", output=output)


if __name__ == "__main__":
    app.run(debug=True)
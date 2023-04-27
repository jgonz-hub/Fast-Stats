from flask import Flask, render_template, request
import os

app = Flask(__name__, template_folder="templates")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/results')
def results():
    return render_template('/fireworks.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
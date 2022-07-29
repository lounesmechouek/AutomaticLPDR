import os
from flask import Flask
app = Flask(__name__)

print(os.path.join(os.path.dirname(app.instance_path), 'uploads'))

chemin = os.path.join(os.path.dirname(app.instance_path), 'uploads/')

with open(chemin+"hello.txt", "w+"):
    print("ok")
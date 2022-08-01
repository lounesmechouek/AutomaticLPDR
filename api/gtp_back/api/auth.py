import functools

from flask import (
    Flask, Blueprint, flash, g, redirect, render_template, request, session, url_for,jsonify
)
from werkzeug.security import check_password_hash, generate_password_hash

from flask_jwt_extended import ( 
    create_access_token, get_jwt_identity, jwt_required, JWTManager
)

from gtp_back.db import get_db

app = Flask(__name__)
bp = Blueprint('auth', __name__, url_prefix='/api/auth')

default_response = { 
        "error" : None,
        "message" : "Failed",
        "success" : False
    }

@bp.route('/register', methods=['POST'])
def register():
    db = get_db()
    response = default_response.copy()
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if not username:
            response.error = 'Username is required.'
        elif not password:
            response.error = 'Password is required.'

        if response['error'] is None:
            try:
                db.execute(
                    "INSERT INTO user (username, hsh_passwd) VALUES (?, ?)",
                    (username, generate_password_hash(password))
                )
                db.commit()
                response['message'] = "User registered successfully"
                response['success'] = True
            except db.IntegrityError:
                response['error'] = f"User {username} is already registered."

    return jsonify(response)

    
@bp.route('/login', methods=['POST'])
def login():
    db = get_db()
    response = default_response.copy()
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        response['user'] = db.execute(
            'SELECT * FROM user WHERE username = ?', (username,)
        ).fetchone()
        if response['user']  is None:
            response['error']  = 'Incorrect username.'
        elif not check_password_hash(response['user']['hsh_passwd'], password):
            response['user'] = None
            response['error'] = 'Incorrect password.'

        if response['error'] is None:
            #this for conveting th type sqlite3.row to jsonify
            response['user'] = dict(zip(response['user'].keys(), response['user'])) 
            session.clear()
            response['success'] = True
            response['message'] = "Logged in"
            response['token'] = create_access_token(identity=response['user'])
            session['token'] = response['token']

    return jsonify(response)

@bp.route('/logout', methods = ['POST'])
@jwt_required()
def logout():
    response = default_response.copy()
    session.clear()
    response.success = True
    response.message = "Logged out"
    return jsonify(response)

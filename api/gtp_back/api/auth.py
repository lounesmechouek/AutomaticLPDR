from gtp_back.models import User
from gtp_back import db
from flask import (
    Flask, Blueprint, flash, g, redirect, render_template, request, session, url_for,jsonify
)
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import ( 
    create_access_token, get_jwt_identity, jwt_required, JWTManager
)


from gtp_back.models import User
from gtp_back import db

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

default_response = { 
        "error" : None,
        "message" : "Failed",
        "success" : False
    }

@bp.route('/register', methods=['POST'])
def register():
    response = default_response.copy()
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if not username:
            response['error'] = 'Username is required.'
        elif not password:
            response['error'] = 'Password is required.'

        if response['error'] is None:
            try:
                db.session.add(User(username=username,hsh_password=generate_password_hash(password)))
                db.session.commit()
                response = {
                    'message' : "User registered successfully",
                    'success' : True
                }
            except :
                response['error'] = f"User {username} is already registered."

    return jsonify(response)

    
@bp.route('/login', methods=['POST'])
def login():
    response = default_response.copy()
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        response['user'] = User.query.filter_by(username=username).first()
        if response['user'] is None:
            response['error']  = 'Incorrect username.'
        elif not check_password_hash(response['user'].hsh_password, password):
            response = {
                'user' : None,
                'error' : 'Incorrect password.'
            }

        if response['error'] is None:
            #this for conveting th type sqlite3.row to jsonify
            response = {
                # 'user' : dict(zip(response['user'].keys(), response['user'])), 
                'success' : True,
                'message' : "Logged in",
                'token' : create_access_token(identity=response['user'].id)
            }

    return jsonify(response)

@bp.route('/logout', methods = ['POST'])
@jwt_required()
def logout():
    response = default_response.copy()
    session.clear()
    response = {
        'success' : True ,
        'message'  : "Logged out"
    }
    return jsonify(response)

@bp.route('/all', methods=['GET'])
def all():
    response = default_response.copy()
    if request.method == 'GET':
        response = {
            'users' : [e.serialize() for e in User.query.order_by(User.username).all()] , 
            'success' : True,
            'message' : "List of users"
        }
    return jsonify(response)
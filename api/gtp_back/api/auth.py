from gtp_back.models import User
from gtp_back import db
from flask import (
    Flask, Blueprint, flash, g, redirect, render_template, request, session, url_for,jsonify
)
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import ( 
    create_access_token, get_jwt_identity, jwt_required, JWTManager
)

from gtp_back.functions import make_response
from gtp_back.models import User
from gtp_back import db

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@bp.route('/register', methods=['POST'])
def register():
    try :
        data = request.json
        if not data['username']:
            return make_response(False,error = 'Username is required.')
        elif not data['password']:
            return make_response(False,error = 'Password is required.')
        try:
            db.session.add(User(username=data['username'],hsh_password=generate_password_hash(data['password'])))
            db.session.commit()
            return make_response(True,data,"User registered successfully")
        except :
            return make_response(False,error = f"User {data['username']} already exists.")
    except :
        return make_response(False,error = "Invalid request" )


    
@bp.route('/login', methods=['POST'])
def login():
    try :
        data = request.json
        user = User.query.filter_by(username=data['username']).first()
        if user is None:
            return make_response(False,error = 'Incorrect username.')
        elif not check_password_hash(user.hsh_password, data['password']):
           return make_response(False,error = 'Incorrect password.')
        return make_response(
            True,
            {
                'user' : user.serialize(),
                'token' : create_access_token(identity=user.serialize())
            }, 
            "Logged in"
        )
    except :
        return make_response(False,error = "Invalid request" )

@bp.route('/all', methods=['GET'])
# @jwt_required()
def all():
    return make_response(
        True,
        [e.serialize() for e in User.query.order_by(User.username).all()] , 
        "List of users"
    )
from gtp_back.models import ( Format , Photo  )
from gtp_back import db
from flask import (
    Flask, Blueprint, flash, g, redirect, render_template, request, session, url_for,jsonify
)
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import ( 
    create_access_token, get_jwt_identity, jwt_required, JWTManager
)

from gtp_back import db

bp = Blueprint('others', __name__, url_prefix='/api/others')

default_response = { 
        "error" : None,
        "message" : "Failed",
        "success" : False
    }

@bp.route('/photo/add', methods=['POST'])
def addPhoto():
    response = default_response.copy()
    if request.method == 'POST' :
        file_name_link = request.form['file_name_link']
        if not file_name_link:
            response['error'] = 'file link is required.'

        if response['error'] is None:
            try:
                db.session.add(Photo(file_name_link=file_name_link))
                db.session.commit()
                response = {
                    'message' : "Photo added successfully",
                    'success' : True
                }
            except :
                response['error'] = f"Photo {file_name_link} is already exists."

    return jsonify(response)


@bp.route('/photos', methods=['GET'])
def allPhotos():
    response = default_response.copy()
    if request.method == 'GET':
        response = {
            'photos' : [e.serialize() for e in Photo.query.order_by(Photo.created_at).all()] , 
            'success' : True,
            'message' : "List of Photos"
        }
    return jsonify(response)

@bp.route('/format/add', methods=['POST'])
def addFormat():
    response = default_response.copy()
    if request.method == 'POST' :
        country = request.form['country']
        text_sample = request.form['text_sample']
        regex = request.form['regex']
        if not country or not regex:
            response['error'] = 'country | regex is required.'

        if response['error'] is None:
            try:
                db.session.add(Format(country=country,regex=regex,text_sample=text_sample))
                db.session.commit()
                response = {
                    'message' : "Format added successfully",
                    'success' : True
                }
            except :
                response['error'] = f"Format {regex} for {country} is already exists."

    return jsonify(response)


@bp.route('/formats', methods=['GET'])
def allFormats():
    response = default_response.copy()
    if request.method == 'GET':
        response = {
            'formats' : [e.serialize() for e in Format.query.order_by(Format.id).all()] , 
            'success' : True,
            'message' : "List of formats"
        }
    return jsonify(response)
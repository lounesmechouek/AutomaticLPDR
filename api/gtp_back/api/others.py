from gtp_back.models import ( Format , Photo , Plate )
from flask import (
    Flask, Blueprint, flash, g, redirect, render_template, request, session, url_for,jsonify
)
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import ( 
    create_access_token, get_jwt_identity, jwt_required, JWTManager
)

from gtp_back import db

# TODO : review the jwt access for certain endpoints

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
        file_name_link = request.json['file_name_link']
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
        country = request.json['country']
        text_sample = request.json['text_sample']
        regex = request.json['regex']
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


@bp.route('/format/<int:id>', methods=['GET'])
def getFormatbyId(id :int):
    response = default_response.copy()
    if request.method == 'GET':
        response = {
            'format' : Format.query.filter_by(id=id).first().serialize(), 
            'success' : True,
            'message' : "Format"
        }
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


@bp.route('/plate/add', methods=['POST'])
def addPlate():
    response = default_response.copy()
    if request.method == 'POST' :
        text_plate = request.json['text_plate']
        format_id = request.json['format_id']

        if not text_plate or not format_id:
            response['error'] = 'text_plate | format_id is required.'

        if not Format.query.filter_by(id=format_id).first() :
            response['error'] = 'format doesnt exist.'

        # TODO : Check if regex is respected

        if response['error'] is None:
            try:
                db.session.add(Plate(text_plate=text_plate,format_id=format_id))
                db.session.commit()
                response = {
                    'message' : "Plate added successfully",
                    'success' : True
                }
            except :
                response['error'] = f"Plate {text_plate} already exists."

    return jsonify(response)


@bp.route('/plates', methods=['GET'])
def allPlates():
    response = default_response.copy()
    if request.method == 'GET':
        response = {
            'plates' : [e.serialize() for e in Plate.query.order_by(Plate.id).all()] , 
            'success' : True,
            'message' : "List of Plates"
        }
    return jsonify(response)


@bp.route('/plate/<int:id>', methods=['GET'])
def getPlatebyId(id :int):
    response = default_response.copy()
    if request.method == 'GET':
        response = {
            'success' : True,
            'message' : "Plate",
            'plate' : Plate.query.filter_by(id=id).first().serialize()
        }
    return jsonify(response)


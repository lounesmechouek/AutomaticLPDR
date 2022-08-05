from gtp_back.models import ( Format , Photo , Plate )
from flask import (
    Flask, Blueprint, flash, g, redirect, render_template, request, session, url_for,jsonify
)
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import ( 
    create_access_token, get_jwt_identity, jwt_required, JWTManager
)
from gtp_back.functions import make_response
from gtp_back import db

# TODO : review the jwt access for certain endpoints

bp = Blueprint('others', __name__, url_prefix='/api/others')

@bp.route('/photo/add', methods=['POST'])
def addPhoto():
    try :
        data = request.json
        if not data['file_name_link']:
            return make_response(False,error = 'file link is required.')
        try:
            db.session.add(Photo(**data))
            db.session.commit()
            return make_response(True,data,"Photo added successfully")
        except :
            return make_response(False,error = f"Photo {data['file_name_link']} is already exists.")
    except :
        return make_response(False,error = "Invalid request" )



@bp.route('/photos', methods=['GET'])
def allPhotos():
    return make_response(
        True,
        [e.serialize() for e in Photo.query.order_by(Photo.created_at).all()] , 
        "List of Photos"
    )
        

@bp.route('/format/add', methods=['POST'])
def addFormat():
    data = request.json
    try:
        db.session.add(Format(**data))
        db.session.commit()
        return make_response(True,data,"Format added successfully")
    except :
        return make_response(False,error = f"Format {data['regex']} for {data['country']} is not allowed.")



@bp.route('/format/<int:id>', methods=['GET'])
def getFormatbyId(id :int):
    return make_response(
        True,
        Format.query.filter_by(id=id).first().serialize(),
        "Format"
    )


@bp.route('/formats', methods=['GET'])
def allFormats():
    return make_response(
        True,
        [e.serialize() for e in Format.query.order_by(Format.id).all()] ,
        "List of formats"
    )


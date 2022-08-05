from gtp_back.api.others import addPhoto
from gtp_back.functions import make_response
from gtp_back.models import ( Format , Photo , Plate , Scan )
from flask import (
    Flask, Blueprint, flash, g, redirect, render_template, request, session, url_for,jsonify
)
from flask_jwt_extended import ( 
    create_access_token, get_jwt_identity, jwt_required, JWTManager
)

from gtp_back import db

bp = Blueprint('plate', __name__, url_prefix='/api/plate')

@bp.route('/add', methods=['POST'])
def addPlate():
    data =request.json
    try :
        if not data['text_plate'] or not data['format_id']:
            return make_response(False,error = 'text_plate | format_id is required.')

        if not Format.query.filter_by(id=data['format_id']).first() :
            return make_response(False,error = 'format doesnt exist.')

        # TODO : Check if regex is respected

        try:
            db.session.add(Plate(**data))
            db.session.commit()
            return make_response(True,data,"Plate added successfully")
        except :        
            return make_response(False,error = f"Plate {data['text_plate']} already exists.")      
    except :
        return make_response(False,error = "Invalid request" )



@bp.route('/all', methods=['GET'])
def allPlates():
    return make_response(
        True,
        [e.serialize() for e in Plate.query.order_by(Plate.id).all()] ,
        "List of Plates"
    )


@bp.route('/<int:id>', methods=['GET'])
def getPlatebyId(id :int):
    return make_response(
        True,
        Plate.query.filter_by(id=id).first().serialize(),
        "Plate"
    )

@bp.route('/flag/<int:id>', methods=['PATCH'])
@jwt_required()
def flagPlateById(id :int):
    try :
        plate = Plate.query.filter_by(id=id).first()
        plate.flagged= True
        db.session.commit()
        return make_response(True,plate.serialize(),"Plate flagged Successfully")
    except : 
        return make_response(False,error= "Plate id doesn't exists")

@bp.route('/unflag/<int:id>', methods=['PATCH'])
@jwt_required()
def unflagPlateById(id :int):
    try :
        plate = Plate.query.filter_by(id=id).first()
        plate.flagged= False
        db.session.commit()
        return make_response(True,plate.serialize(),"Plate unflagged Successfully")
    except : 
        return make_response(False,error= "Plate id doesn't exists")

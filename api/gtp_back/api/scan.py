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

bp = Blueprint('scan', __name__, url_prefix='/api/scan')

@bp.route('/all', methods=['GET'])
def allPlates():
    return make_response(
        True,
        [e.serialize() for e in Scan.query.filter_by(is_deleted=False).order_by(Scan.id).all()],
            "List of Scans"
        )

@bp.route('/add', methods=['POST'])
def addScan():
    data = request.json
    try:
        db.session.add(Scan(**data))
        db.session.commit()
        return make_response(True,data,"Scan added successfully")
    except :
        return make_response(False,error = "Scan already exists.")


@bp.route('/delete/<int:id>', methods=['DELETE'])
def getFormatbyId(id :int):
    try :
        scan = Scan.query.filter_by(id=id).first()
        scan.is_deleted= True
        db.session.commit()
        return make_response(True,scan.serialize(),"Scan deleted Successfully")
    except : 
        return make_response(False)

@bp.route('/save', methods=['POST'])
@jwt_required()
def saveScan():
    data = request.json
    user = get_jwt_identity()
    try :
        format =  Format.query.filter_by(country=data['country']).first()
        if not format :
            return make_response(False,error = 'Country Format doesnt exist.')
        # save the picture
        try : 
            photo = Photo(
                file_name_link= data['file_name_link'],
                longitude = data['longitude'],
                latitude = data['latitude']
            )
            db.session.add(photo)
            
            #get the plate or create new one
            plate = Plate.query.filter_by(text_plate=data['text_plate']).first()  
            if plate is None :
                plate = Plate(text_plate = data['text_plate'],format_id=format.id)
                db.session.add(plate)   
            db.session.flush()
            # save the new scan 
            scan = Scan(
                    accuracy=data['accuracy'],
                    user_id = user['id'],
                    plate_id = plate.id,
                    photo_id = photo.id
                )
            db.session.add(scan)
            db.session.commit()
            return make_response(True,scan.serialize(),"Scan saved successfully !")
        except :   
            return make_response(False,error = "Photo already scanned" )
    except :
        return make_response(False,error = "Invalid request" )

@bp.route('/note/<int:id>', methods=['PATCH'])
@jwt_required()
def flagPlateById(id :int):
    try :
        scan = Scan.query.filter_by(id=id).first()
        scan.note= request.json['note']
        db.session.commit()
        return make_response(True,scan.serialize(),"Note Added Successfully")
    except : 
        return make_response(False)

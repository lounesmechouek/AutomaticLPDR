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

bp = Blueprint('user', __name__, url_prefix='/api/user')

@bp.route('/delete/scan/<int:id>', methods=['DELETE'])
@jwt_required()
def deleteScanById(id :int):
    try :
        user = get_jwt_identity()
        scan = Scan.query.filter_by(id=id).first()
        #verify identity
        if user['id'] != scan.user_id :
            return make_response(False,status=401)
        scan.is_deleted= True
        db.session.commit()
        return make_response(True,scan.serialize(),"Scan deleted Successfully")
    except : 
        return make_response(False)


# TODO : make it return only one scan of the distinct plate 
@bp.route('/scans', methods=['GET'])
@jwt_required()
def allUserScans():
    try :
        user = get_jwt_identity()
        return make_response(
            True,
            [e.serialize() for e in Scan.query
            .distinct(Scan.plate_id)
            .filter(Scan.user_id==user['id'])
            .filter(Scan.is_deleted==False)
            .order_by(Scan.created_at)
            ],
            "List of Scans"
            )
    except :
        return make_response(False)

@bp.route('/scan/<int:id>/photos', methods=['GET'])
@jwt_required()
def allScans(id : int):
    try :
        user = get_jwt_identity()
        return make_response(
            True,
            [e.serialize() for e in Photo.query.join(Scan)
            .filter(Scan.photo_id == Photo.id)
            .filter(Scan.is_deleted == False)
            .filter(Scan.user_id == user['id'])
            .order_by(Photo.created_at)
            .all()],
            "List of Photos"
            )
    except : 
        return make_response(False)
    
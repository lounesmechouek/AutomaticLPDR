from gtp_back.models import ( Format , Photo , Plate , Scan )
from flask import (
    Flask, Blueprint, flash, g, redirect, render_template, request, session, url_for,jsonify
)
from flask_jwt_extended import ( 
    create_access_token, get_jwt_identity, jwt_required, JWTManager
)

from gtp_back import db

bp = Blueprint('scan', __name__, url_prefix='/api/scan')

default_response = { 
        "error" : None,
        "message" : "Failed",
        "success" : False
    }

@bp.route('/all', methods=['GET'])
def allPlates():
    response = default_response.copy()
    if request.method == 'GET':
        response = {
            'Scans' : [e.serialize() for e in Scan.query.filter_by(is_deleted=False).order_by(Scan.id).all()] , 
            'success' : True,
            'message' : "List of Scans"
        }
    return jsonify(response)

@bp.route('/add', methods=['POST'])
def addScan():
    response = default_response.copy()
    if request.method == 'POST':
        data = request.json
        if response['error'] is None:
            try:
                db.session.add(Scan(**data))
                db.session.commit()
                response = {
                    'message' : "Scan added successfully",
                    'success' : True
                }
            except :
                response['error'] = f"Scan already exists."

    return jsonify(response)

@bp.route('/delete/<int:id>', methods=['DELETE'])
def getFormatbyId(id :int):
    response = default_response.copy()
    if request.method == 'DELETE':
        try :
            scan = Scan.query.filter_by(id=id).first()
            scan.is_deleted= True
            db.session.commit()
            response = {
            'scan' : scan.serialize(), 
            'success' : True,
            'message' : "Deleted Successfully"
        }
        except : 
            response['error'] = "something bad happened"

    return jsonify(response)

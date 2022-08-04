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

# Save new scan
# Retreive the format id from country Name
# Looking if the plate already exists or create a new row
# Adding the new photo

# @bp.route('/save', methods=['POST'])
# def saveScan():
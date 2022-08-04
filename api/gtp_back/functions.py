from flask import (jsonify ,make_response as fmk)

def make_response(success,data=None,message="",error=None,status=200):
    if success :
        response = {
            'success' : success,
            'message' : message,
            'data' : data,
        }
    elif error :
        response = {
            'success' : success,
            'error' : error
        }
    elif status==401:
        response = {
            'success' : success,
            'message' : "Unauthorized"
        }
    else :
        response = {
            'success' : success,
            'message' : "Undefined error happened"
        }

    return fmk(jsonify(response),status)
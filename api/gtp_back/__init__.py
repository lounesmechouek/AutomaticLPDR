import os

from flask import Flask
from flask import jsonify
from flask_jwt_extended import ( 
    create_access_token, get_jwt_identity, jwt_required, JWTManager
)

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )
    
    app.config["JWT_SECRET_KEY"] = "pfe-gtp"  
    jwt = JWTManager(app)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/')
    def home():
        object = {
            "message" : "home"
        }
        return jsonify(object)


    #init our db
    from . import db
    db.init_app(app)

    #add auth
    from .api import auth
    app.register_blueprint(auth.bp)

    return app
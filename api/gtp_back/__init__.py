import os

from flask import Flask
from flask import jsonify
from flask_jwt_extended import ( 
    create_access_token, get_jwt_identity, jwt_required, JWTManager
)
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gtp.db' 
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
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

    @app.before_first_request
    def create_tables():
        db.create_all()
    # a simple page that says hello
    @app.route('/')
    def home():
        object = {
            "message" : "home"
        }
        return jsonify(object)

    #init our db
    db.init_app(app)

    #add auth apis
    from .api import auth
    app.register_blueprint(auth.bp)

    #add others apis
    from .api import others
    app.register_blueprint(others.bp)

    return app
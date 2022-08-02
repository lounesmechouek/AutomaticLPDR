import datetime
from gtp_back import db

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    hsh_password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username
    def serialize(self):
        return {
            'id': self.id, 
            'username': self.username,
            'hsh_password': self.hsh_password,
        }

class Photo(db.Model):
    __tablename__ = 'photo'
    id = db.Column(db.Integer, primary_key=True)
    file_name_link = db.Column(db.String(80), unique=True, nullable=False)
    is_labeled = db.Column(db.Boolean,default=False, nullable=False)
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    created_at = db.Column(db.DateTime,default=datetime.datetime.utcnow)

    def __repr__(self):
        return '<Photo %r>' % self.file_name_link
    def serialize(self):
        return {
            'id': self.id, 
            'file_name_link': self.file_name_link,
            'isLabeled': self.is_labeled,
            'created_at' : self.created_at
        }





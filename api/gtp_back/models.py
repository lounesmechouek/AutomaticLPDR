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

class Format(db.Model):
    __tablename__ = 'format'
    id = db.Column(db.Integer, primary_key=True)
    text_sample = db.Column(db.String(80), nullable=False)
    country = db.Column(db.String(80) , nullable=False)
    regex = db.Column(db.String(80), unique=True , nullable=False)

    def __repr__(self):
        return '<Format %r>' % self.country
    def serialize(self):
        return {
            'id': self.id, 
            'country': self.country,
            'regex': self.regex,
            'text_sample': self.text_sample,
        }

class Plate(db.Model):
    __tablename__ = 'plate'
    id = db.Column(db.Integer, primary_key=True)
    text_plate = db.Column(db.String(80), unique= True , nullable=False)
    note = db.Column(db.String(255), default = "" ,nullable = True )
    flagged = db.Column(db.Boolean,default=False, nullable=False) 
    format_id = db.Column(db.Integer, db.ForeignKey('format.id'))

    def __repr__(self):
        return '<Plate %r>' % self.country
    def serialize(self):
        return {
            'id': self.id, 
            'text_plate': self.text_plate,
            'flagged': self.flagged,
            'note': self.note,
            'format_id': self.format_id
        }

class Scan(db.Model):
    __tablename__ = 'scan'
    id = db.Column(db.Integer, primary_key=True)
    accuracy = db.Column(db.Float, default=0 ,nullable=False) 
    is_deleted = db.Column(db.Boolean,default=False, nullable=False)
    created_at = db.Column(db.DateTime,default=datetime.datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    photo_id = db.Column(db.Integer, db.ForeignKey('photo.id'))
    plate_id = db.Column(db.Integer, db.ForeignKey('plate.id'),nullable=True)

    def __repr__(self):
        return '<Scan %r>' % self.country
    def serialize(self):
        return {
            'id': self.id, 
            'accuracy': self.accuracy,
            'deleted': self.is_deleted,
            'created_at': self.created_at,
            'user_id': self.user_id,
            'photo_id': self.photo_id,
            'plate_id': self.plate_id
        }

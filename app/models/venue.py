from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Venue(db.Model):
  __tablename__ = 'venues'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id          = db.Column(db.Integer, primary_key=True)
  name        = db.Column(db.String(255), nullable=False)
  address     = db.Column(db.String(255), nullable=False)
  city        = db.Column(db.String(50), nullable=False)
  state       = db.Column(db.String(50), nullable=False)
  created_at  = db.Column(db.DateTime(timezone = True), server_default = func.now())
  updated_at  = db.Column(db.DateTime(timezone = True), onupdate = func.now())

  def to_dict(self):
    return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'created_at': self.created_at,
            'updated_at': self.updated_at 
            }
from .db import db
from sqlalchemy.sql import func


class Event(db.Model):
  __tablename__ = 'events'

  id          = db.Column(db.Integer, primary_key=True)
  user_id     = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  venue_id    = db.Column(db.Integer, db.ForeignKey('venues.id'), nullable=False)
  category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
  name        = db.Column(db.String(255), nullable=False)
  date        = db.Column(db.DateTime(timezone = True))
  created_at  = db.Column(db.DateTime(timezone = True), server_default = func.now())
  updated_at  = db.Column(db.DateTime(timezone = True), onupdate = func.now())

  def to_dict(self):
    return {
            'id': self.id,
            'host_id': self.host_id,
            'venue_id': self.venue_id,
            'category_id': self.category_id,
            'name': self.name,
            'date': self.date,
            'created_at': self.created_at,
            'updated_at': self.updated_at
            }
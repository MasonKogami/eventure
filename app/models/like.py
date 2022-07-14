from .db import db
from sqlalchemy.sql import func


class Like(db.Model):
  __tablename__ = 'likes'

  id       = db.Column(db.Integer, primary_key=True)
  user_id  = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)

  user     = db.relationship('User', back_populates='likes')


  def to_dict(self):
    return {
            'id': self.id,
            'user_id': self.user_id,
            'event_id': self.event_id,
            }
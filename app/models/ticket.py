from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Ticket(db.Model):
  __tablename__ = 'tickets'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id               = db.Column(db.Integer, primary_key=True)
  event_id         = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('events.id')), nullable=False)
  event_name       = db.Column(db.String(255), nullable=False)
  user_id          = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  quantity         = db.Column(db.Integer, nullable=False)
  created_at       = db.Column(db.DateTime(timezone = True), server_default = func.now())
  updated_at       = db.Column(db.DateTime(timezone = True), onupdate = func.now())

  user             = db.relationship('User', back_populates='tickets')

  def to_dict(self):
    return {
            'id': self.id,
            'event_id': self.event_id,
            'event_name': self.event_name,
            'user_id': self.user_id,
            'quantity': self.quantity,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            }
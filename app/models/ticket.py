from .db import db
from sqlalchemy.sql import func


class Ticket(db.Model):
  __tablename__ = 'tickets'

  id               = db.Column(db.Integer, primary_key=True)
  event_id         = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
  user_id          = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  created_at       = db.Column(db.DateTime(timezone = True), server_default = func.now())
  updated_at       = db.Column(db.DateTime(timezone = True), onupdate = func.now())
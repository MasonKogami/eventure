from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Event(db.Model):
  __tablename__ = 'events'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id               = db.Column(db.Integer, primary_key=True)
  user_id          = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), nullable=False)
  # category_id      = db.Column(db.Integer, db.ForeignKey('categories.id'))
  location_name    = db.Column(db.String(255), nullable=False)
  address          = db.Column(db.String(255), nullable=False)
  name             = db.Column(db.String(255), nullable=False)
  date             = db.Column(db.DateTime)
  description      = db.Column(db.Text, nullable=False)
  image_url        = db.Column(db.String(5000), nullable=False)
  # capacity         = db.Column(db.Integer, nullable=False)
  created_at       = db.Column(db.DateTime(timezone = True), server_default = func.now())
  updated_at       = db.Column(db.DateTime(timezone = True), onupdate = func.now())

  user = db.relationship('User', back_populates='events')

  tickets = db.relationship('Ticket', cascade='all, delete')

  # tickets = db.relationship('Ticket', cascade='all, delete')

  def to_dict(self):
    return {
            'id': self.id,
            'user_id': self.user_id,
            'location_name': self.location_name,
            'address': self.address,
            'description': self.description,
            'image_url': self.image_url,
            'name': self.name,
            'date': self.date,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.to_dict(),
            # 'tickets': [ticket.to_dict() for ticket in tickets]
            }
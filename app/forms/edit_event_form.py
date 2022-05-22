from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


def event_name_length(form, field):
  name = field.data
  if len(name) < 2:
    raise ValidationError('Event names must be longer than 2 characters.')
  if len(name) > 30:
    raise ValidationError('Event names must be 30 characters or less.')


def location_name_length(form, field):
  location_name = field.data
  if len(location_name) < 2:
    raise ValidationError('Venue names must be longer than 2 characters.')
  if len(location_name) > 30:
    raise ValidationError('Venue names must be 30 characters or less.')


def address_length(form, field):
  address = field.data
  if len(address) < 20: 
    raise ValidationError('Address must be longer than 20 characters.')
  if len(address) > 50:
    raise ValidationError('Address must be 50 characters or less.')


def capacity_number(form, field):
  capacity = field.data
  if capacity < 10:
    raise ValidationError('An event must allow at least 10 people to attend an event.')
  if capacity > 100000:
    raise ValidationError('An event capacity cannot exceed 100,000.')


class EditEventForm(FlaskForm):
  # pass
  name             = StringField('name', validators=[DataRequired(), event_name_length])
  user_id          = IntegerField('host', validators=[DataRequired()])
  category_id      = IntegerField('category')
  location_name    = StringField('location name', validators=[DataRequired(), location_name_length])
  address          = StringField('address', validators=[DataRequired(), address_length])
  date             = StringField('date', validators=[DataRequired()])
  capacity         = IntegerField('capacity', validators=[DataRequired(), capacity_number])
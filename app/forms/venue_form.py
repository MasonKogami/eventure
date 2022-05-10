from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, DateTimeField
from wtforms.validators import DataRequired


class VenueForm(FlaskForm):
  name    = StringField('venue', validators=[DataRequired()])
  address = StringField('address', validators=[DataRequired()])
  city    = StringField('city', validators=[DataRequired()])
  state   = StringField('state', validators=[DataRequired()])
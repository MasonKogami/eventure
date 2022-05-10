from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, DateTimeField
from wtforms.validators import DataRequired


class EventForm(FlaskForm):
  name             = StringField('name', validators=[DataRequired()])
  user_id          = IntegerField('host', validators=[DataRequired()])
  category_id      = IntegerField('category')
  location_name    = StringField('location name', validators=[DataRequired()])
  address          = StringField('address', validators=[DataRequired()])
  city             = StringField('city', validators=[DataRequired()])
  state            = StringField('state', validators=[DataRequired()])
  date             = DateTimeField('date', validators=[DataRequired()])
  capacity         = IntegerField('capacity', validators=[DataRequired()])
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, DateTimeField
from wtforms.validators import DataRequired
from sqlalchemy.sql import func


class EventForm(FlaskForm):
  name        = StringField('name', validators=[DataRequired()])
  host_id     = IntegerField('host', validators=[DataRequired()])
  venue_id    = IntegerField('venue', validators=[DataRequired()])
  category_id = IntegerField('category')
  date        = DateTimeField('date', validators=[DataRequired()])
  capacity    = IntegerField('capacity', validators=[DataRequired()])
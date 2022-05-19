from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired


class TicketForm(FlaskForm):
  event_name = StringField('event name', validators=[DataRequired()])
  event_id   = IntegerField('event', validators=[DataRequired()])
  user_id    = IntegerField('user', validators=[DataRequired()])
  quantity   = IntegerField('quantity', validators=[DataRequired()])
from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired
from app.models import Event


# def ticket_total(form, field):
#   quantity = field.data
#   event_id = field.data
#   print(event_id, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
#   event = Event.query.get(+event_id)
#   print(event, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
#   if quantity > event.capacity:
#     raise ValidationError("You cannot acquire more tickets than the event capacity currently allows.")

def required(form, field):
  quantity = field.data
  if quantity == 0:
    raise ValidationError("Ticket quantity cannot be zero.")

class TicketForm(FlaskForm):
  event_name = StringField('event name', validators=[DataRequired()])
  event_id   = IntegerField('event', validators=[DataRequired()])
  user_id    = IntegerField('user', validators=[DataRequired()])
  quantity   = IntegerField('quantity', validators=[DataRequired(), required])
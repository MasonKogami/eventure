from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Event
from app.forms import EventForm
from app.api.auth_routes import validation_errors_to_error_messages

event_routes = Blue('events', __name__)

# C R E A T E  E V E N T
@event_routes.route('/', methods=['POST'])
@login_required
def new_event():
  form = EventForm()

  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    event = Event(
      user_id=form.data['user_id'],
      location_name=form.data['location_name'],
      address=form.data['address'],
      city=form.data['city'],
      state=form.data['state'],
      name=form.data['name'],
      date=form.data['date'],
      capacity=form.data['capacity']
    )
    db.session.add(event)
    db.session.commit()
    return event.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# R E A D  A L L  E V E N T S
@event_routes.route('/', methods=['GET'])
@login_required
def event_listings():
  events = Event.query.all()

  return {'events': [event.to_dict() for event in events]}

# R E A D  O N E  E V E N T
@event_routes.route('/<int:id>', methods=['GET'])
@login_required
def single_event(id):
  event = Event.query.get(id)

  return event.to_dict()

# U P D A T E  E V E N T
@event_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_event(id):
  event = Event.query.get(id)

  event.location_name = request['location_name']
  event.address       = request['address']
  event.city          = request['city']
  event.state         = request['state']
  event.name          = request['name']
  event.date          = request['date']
  event.capacity      = request['capacity']

  db.session.commit()

  return event.to_dict()

# D E L E T E  E V E N T
@event_routes.route('<int:id>', methods['DELETE'])
@login_required
def delete_event(id):
  event = Event.query.get(id)

  db.session.delete(event)

  return event.to_dict()
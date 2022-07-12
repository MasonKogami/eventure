from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Event, Ticket
from app.forms.event_form import EventForm
from app.forms.ticket_form import TicketForm
from app.forms.edit_event_form import EditEventForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.aws_s3 import (upload_file_to_s3, allowed_file, get_unique_filename)

event_routes = Blueprint('events', __name__)

# C R E A T E  E V E N T
@event_routes.route('/create', methods=['POST'])
# @login_required
def new_event():
  form = EventForm()
  print('entering /create', '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
  if "image" not in request.files:
        return {"errors": ["image required"]}, 400

  image = request.files["image"]

  if not allowed_file(image.filename):
      return {"errors": ["File type not permitted. Files must be pdf, png, jpg, jpeg, or gif."]}, 400

  image.filename = get_unique_filename(image.filename)

  upload = upload_file_to_s3(image)

  if "url" not in upload:
      # if the dictionary doesn't have a url key
      # it means that there was an error when we tried to upload
      # so we send back that error message
      return upload, 400

  url = upload["url"]

  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    event = Event(
      user_id=form.data['user_id'],
      location_name=form.data['location_name'],
      address=form.data['address'],
      name=form.data['name'],
      date=form.data['date'],
      description=form.data['description'],
      image_url=url
    )
    print('exiting /create', '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
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
# @login_required
def update_event(id):
  event = Event.query.get(id)
  form  = EditEventForm()

  
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    
    event.location_name = form.data["location_name"]
    event.address       = form.data["address"]
    event.name          = form.data["name"]
    event.date          = form.data["date"]
    event.description   = form.data["description"]
    db.session.add(event)
    
    db.session.commit()
    return event.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# D E L E T E  E V E N T
@event_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_event(id):
  event = Event.query.get(id)

  db.session.delete(event)
  db.session.commit()
  
  return event.to_dict()

# C R E A T E  T I C K E T S
@event_routes.route('/<int:id>/tickets', methods=['POST'])
# @login_required
def add_ticket(id):
  form = TicketForm()

  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    ticket = Ticket(
      event_id=id,
      event_name=form.data['event_name'],
      user_id=form.data['user_id'],
      quantity=form.data['quantity']
    )
    db.session.add(ticket)
    db.session.commit()
    
    return ticket.to_dict()
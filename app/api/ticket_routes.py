from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Event, Ticket
from app.forms import EditTicketForm
from app.api.auth_routes import validation_errors_to_error_messages

ticket_routes = Blueprint('tickets', __name__)


# R E A D  O N E  T I C K E T
# @ticket_routes.route('/<int:id>', methods=['GET'])
# @login_required
# def single_ticket(id):
#   ticket = Ticket.query.get(id)

#   return ticket.to_dict()

# U P D A T E  T I C K E T S
@ticket_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def update_tickets(id):
  # db query to grab all tickets for the current user
  ticket = Ticket.query.get(id)
  form = EditTicketForm()
  
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    ticket.quantity = form.data['quantity']

    db.session.add(ticket)
    db.session.commit()
    return ticket.to_dict()
    
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
  
# D E L E T E  T I C K E T S
@ticket_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_tickets(id):
  ticket = Ticket.query.get(id)

  db.session.delete(ticket)
  db.session.commit()
  
  return ticket.to_dict()
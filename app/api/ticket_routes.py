from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Event, Ticket

ticket_routes = Blueprint('tickets', __name__)

# U P D A T E  T I C K E T S
@ticket_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_tickets(id):
  # db query to grab all tickets for the current user
  tickets = Ticket.query.get(id)

  tickets.quantity = request.json['quantity']

  db.session.commit()

  return tickets.to_dict()
  
# D E L E T E  T I C K E T S
@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_tickets(id):
  tickets = Ticket.query.get(id)

  db.session.delete(tickets)
  db.session.commit()
  
  return tickets.to_dict()
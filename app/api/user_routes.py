from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Ticket

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# R E A D  A L L  T I C K E T S
@user_routes.route('/<int:id>/tickets', methods=['GET'])
@login_required
def tickets(id):
  # db query to grab all tickets for the current user
  tickets = Ticket.query.filter(current_user.id == Ticket.user_id).all()

  return {'tickets': [ticket.to_dict() for ticket in tickets]}

# Not sure how to properly implement these, will look into it before further development

# U P D A T E  T I C K E T S
# @user_routes.route('/tickets/<int:id>', methods=['PUT'])
# @login_required
# def update_tickets(id):
#   # db query to grab all tickets for the current user
#   tickets = Ticket.query.filter(current_user.id == Ticket.user_id).all()

  
# D E L E T E  T I C K E T S
# @user_routes.route('/<int:id>/tickets/<int:id>', methods=['DELETE'])
# @login_required
# def delete_tickets(id):
#   tickets = Ticket.query.filter(current_user.id == Ticket.user_id).all()

#   db.session.delete(tickets)

#   return {'tickets': [ticket.to_dict() for ticket in tickets]}
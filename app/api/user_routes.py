from flask import Blueprint, jsonify
from flask_login import login_required
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
@ticket_routes.route('/', methods=['GET'])
@login_required
def tickets(id):
  tickets = Ticket.query.get(id)

  return {'tickets': [ticket.to_dict() for ticket in tickets]}
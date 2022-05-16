from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Event, Ticket

ticket_routes = Blueprint('tickets', __name__)

# # R E A D  A L L  T I C K E T S
# @ticket_routes.route('/', methods=['GET'])
# @login_required
# def tickets():
#   tickets = Event.query.filter()
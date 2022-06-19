from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo
from app.models import User
import email_validator


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def username_length(form, field):
    username = field.data
    if len(username) < 5:
        raise ValidationError("A username must be at least 5 characters.")
    if len(username) > 15:
        raise ValidationError("A username must be 15 characters or less.")


def password_length(form, field):
    password = field.data
    confirm = field.data
    if len(password) and len(confirm) < 5:
        raise ValidationError("Password length must be at least 5 characters.")
    if len(password) and len(confirm) > 20:
        raise ValidationError("Password length cannot exceed 20 characters.")


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message='Please input a username.'), username_exists, username_length])
    email = StringField('email', validators=[DataRequired(message='Please input an email.'), user_exists, Email(granular_message=True)])
    password = PasswordField('password', validators=[DataRequired(), EqualTo('confirm',  message='Passwords must match.'), password_length])
    confirm = PasswordField('confirm')
    # password = PasswordField('password', validators=[DataRequired(), EqualTo('confirm', message='Passwords must match.')])
    # confirm = PasswordField('confirm')

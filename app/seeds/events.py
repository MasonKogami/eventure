from app.models import db, User, Event

def seed_events():
  event1 = Event(user_id=1, name='FoodieLand Night Market', location_name= 'Golden Gate Fields', address= '', city= '', state= '', date= '', capacity=10000)
  event2 = Event(user_id=2, name='BottleRock 2022', location_name= 'Napa Valley Expo', address= '', city= '', state= '', date= '', capacity=5000)
  event3 = Event(user_id=3, name='Day N Vegas', location_name= 'Las Vegas Festival Grounds', address= '', city= '', state= '', date= '', capacity=50000)
  event4 = Event(user_id=1, name='Grad Nite', location_name= 'Disneyland', address= '', city= '', state= '', date= '', capacity=500)
  event5 = Event(user_id=2, name='Wine N Dine', location_name= 'Napa Valley Expo', address= '', city= '', state= '', date= '', capacity=100)
  event6 = Event(user_id=3, name='Skydiving', location_name= '', address= '', city= '', state= '', date= '', capacity=20)

def undo_events():
    db.session.execute('TRUNCATE boards RESTART IDENTITY CASCADE;')
    db.session.commit()
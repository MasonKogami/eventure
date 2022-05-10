from app.models import db, User, Event

def seed_events():
  event1 = Event(user_id=1, name='FoodieLand Night Market', location_name= 'Golden Gate Fields', address= '1100 Eastshore Hwy,', city= 'Berkeley', state= 'CA', date= '', capacity=10000)
  event2 = Event(user_id=2, name='BottleRock 2022', location_name= 'Napa Valley Expo', address= '575 3rd St', city= 'Napa', state= 'CA', date= '', capacity=5000)
  event3 = Event(user_id=3, name='Day N Vegas', location_name= 'Las Vegas Festival Grounds', address= '311 W Sahara Ave', city= 'Las Vegas', state= 'NV', date= '', capacity=50000)
  event4 = Event(user_id=1, name='Grad Nite', location_name= 'Disneyland', address= '1313 Disneyland Dr,', city= 'Anaheim', state= 'CA', date= '', capacity=500)
  event5 = Event(user_id=2, name='Wine N Dine', location_name= 'Napa Valley Expo', address= '575 3rd St', city= 'Napa', state= 'CA', date= '', capacity=100)
  event6 = Event(user_id=3, name='Skydiving', location_name= 'Skydive Golden Gate', address= '351 Airport Rd', city= 'Novato', state= 'CA', date= '', capacity=20)

  db.session.add.all([event1, event2, event3, event4, event5, event6])
  db.session.commit()

def undo_events():
    db.session.execute('TRUNCATE boards RESTART IDENTITY CASCADE;')
    db.session.commit()
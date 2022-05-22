from app.models import db, User, Event

def seed_events():
  event1 = Event(user_id=1, name='FoodieLand Night Market', location_name= 'Golden Gate Fields', address= '1100 Eastshore Hwy, Berkeley, CA', date= '2022-06-21', description="FoodieLand is a foodie-inspired three-day event where family and friends gather together for food and drink, shopping, and entertainment.")
  event2 = Event(user_id=2, name='BottleRock 2022', location_name= 'Napa Valley Expo', address= '575 3rd St, Napa, CA', date= '2022-06-21', description="BottleRock 2022 - The first taste of summer.")
  event3 = Event(user_id=3, name='Day N Vegas', location_name= 'Las Vegas Festival Grounds', address= '311 W Sahara Ave, Las Vegas, NV', date= '2022-11-12', description="Day N Vegas is a three day festival taking place on Friday, November 12th 2022. The event will take place at the Las Vegas Festival Grounds in Las Vegas, NV.")
  event4 = Event(user_id=1, name='Grad Nite', location_name= 'Disneyland', address= '1313 Disneyland Dr, Anaheim, CA', date= '2022-06-21', description="Seniors! Your hard work has paid off, now it's time to enjoy the moment!")
  event5 = Event(user_id=2, name='Wine N Dine', location_name= 'Napa Valley Expo', address= '575 3rd St, Napa, CA', date= '2022-06-21', description="Discover wine like never before! Wine n Dine like you will never again!")
  event6 = Event(user_id=3, name='Skydiving', location_name= 'Skydive Golden Gate', address= '351 Airport Rd, Novato, CA', date= '2022-06-21', description="Not for the faint of heart, but for the thrill of life.")
  event7 = Event(user_id=4, name='The Best Event', location_name='The Best Venue', address='123 Best Lane, Best, BE', date='2022-05-25 21:00:00', description="The Best Event - the biggest thing until the second coming of Jesus Christ himself.")
  event8 = Event(user_id=4, name='Yoga in the Park', location_name='Central Park', address='Central Park, New York, NY', date='2022-06-25 09:00:00', description="Everyone is invited to share the powers of yoga, meditation, and full body euphoria at Yoga in the Park!")

  db.session.add_all([event1, event2, event3, event4, event5, event6, event7, event8])
  db.session.commit()

def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
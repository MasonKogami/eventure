import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import User from './components/User';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import EventListings from './components/Events/events';
import OneEvent from './components/Events/OneEvent';
import HomePage from './components/Homepage/HomePage';
import AboutMe from './components/AboutMe/AboutMe';
import LandingPage from './components/LandingPage/LandingPage';
import { authenticate } from './store/session';
import NewEvent from './components/Events/NewEvent';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import SingleTicket from './components/Tickets/SingleTicket';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <ScrollToTop>
        {sessionUser && (<NavBar />)}
        <Switch>
          {/* <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route> */}
          {/* <ProtectedRoute path='/users' exact={true} >
            <UsersList/>
          </ProtectedRoute> */}
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
          <ProtectedRoute path='/' exact={true} >
            {sessionUser ? <Redirect to='/home' /> : <Redirect to='/landingpage' />}
          </ProtectedRoute>
          <ProtectedRoute path='/home' exact={true} >
            <HomePage />
            <EventListings />
            {/* <AboutMe /> */}
          </ProtectedRoute>
          <ProtectedRoute path='/events/create' exact={true}>
            <NewEvent />
          </ProtectedRoute>
          <ProtectedRoute path={`/events/:eventId`} exact={true}>
            <OneEvent />
          </ProtectedRoute>
          <ProtectedRoute path={`/tickets/:ticketId`} exact={true}>
            <SingleTicket />
          </ProtectedRoute>
          <Route path='/landingpage' exact={true}>
            <LandingPage />
          </Route>
        </Switch>
        <AboutMe />
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;

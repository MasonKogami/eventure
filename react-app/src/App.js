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
import Likes from './components/Likes/likes';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';


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
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
          <Route path='/' exact={true}>
            <LandingPage />
          </Route>
          <ProtectedRoute path='/' exact={true} >
            {sessionUser ? <Redirect to='/home' /> : <Redirect to='/' />}
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
          <ProtectedRoute path={`/likes`}>
            <Likes />
          </ProtectedRoute>
          {/* <Route path='/' exact={true}>
            <LandingPage />
          </Route> */}
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/signup' exact={true}>
            <SignUpForm />
          </Route>
        </Switch>
        <AboutMe />
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;

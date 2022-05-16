import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import EventListings from './components/Events/events';
import OneEvent from './components/Events/OneEvent';
import HomePage from './components/Homepage/HomePage';
import LandingPage from './components/LandingPage/LandingPage';
import { authenticate } from './store/session';
import NewEvent from './components/Events/NewEvent';


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
      {sessionUser && (<NavBar />)}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <ProtectedRoute path='/' exact={true} >
          {sessionUser ? <Redirect to='/home' /> : <Redirect to='/login' />}
        </ProtectedRoute>
        <ProtectedRoute path='/home' exact={true} >
          <HomePage />
          <EventListings />
        </ProtectedRoute>
        <Route path='/events/create' exact={true}>
          <NewEvent />
        </Route>
        <Route path={`/events/:eventId`} exact={true}>
          <OneEvent />
        </Route>
        <Route path='/landingpage' exact={true}>
          <LandingPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

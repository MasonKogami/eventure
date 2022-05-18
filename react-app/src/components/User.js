import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  console.log(user);

  if (user) {
    const tickets = user.tickets;
    console.log(tickets);
    
  }

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <ul>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Tickets</strong>
      </li>
    </ul>
  );
}
export default User;

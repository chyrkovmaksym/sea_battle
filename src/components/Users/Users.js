import './Users.css';
import React, { useState, useEffect } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Scroll from '../Scroll/Scroll';
import CardList from '../CardList/CardList';

function Users({ user, isLoggedIn }) {
  const [users, setUsers] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [gotAllUsers, setGotAllUsers] = useState(false);

  const [friends, setFriends] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [requestsToMe, setRequestsToMe] = useState([]);
  useEffect(() => {}, []);
  const fr = [];
  const rtm = [];
  const mr = [];
  useEffect(() => {
    if (isLoggedIn && user) {
      fetch('https://battleship-123.herokuapp.com/users', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: user.user_email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          fetch('https://battleship-123.herokuapp.com/my_friends', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              email: user.user_email,
            }),
          })
            .then((response) => response.json())
            .then((res) => {
              if (res.length) {
                res.map((friend) => {
                  if (friend.status === 'request') {
                    if (friend.from_email === user.user_email) {
                      mr.push(friend);
                    } else {
                      rtm.push(friend);
                    }
                  } else if (friend.status === 'friends') {
                    fr.push(friend);
                  }
                  return friend;
                });
              }
            })
            .then(() => {
              setMyRequests(mr);
              setRequestsToMe(rtm);
              setFriends(fr);

              setGotAllUsers(true);
            });
        });
    }
  }, []);

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const filteredUsers = users.length ? users.filter((user) => {
    return (
      user.user_name.toLowerCase().includes(searchField.toLowerCase()) ||
      user.user_email.toLowerCase().includes(searchField.toLowerCase())
    );
  }) : [];

  return !gotAllUsers ? (
    <h1>Loading...</h1>
  ) : (
    <div className='wrapper'>
      <h1 className='caption'>Users</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <CardList
          users={filteredUsers}
          myUser={user}
          friends={friends}
          requestsToMe={requestsToMe}
          myRequests={myRequests}
          showAllUsers={true}
        />
      </Scroll>
    </div>
  );
}

export default Users;

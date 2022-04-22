import './Friends.css';
import React, { useState, useEffect } from 'react';
import Scroll from '../Scroll/Scroll';
import CardList from '../CardList/CardList';

function Friends({ myUser, invite, join }) {
  const [users, setUsers] = useState([]);
  const [gotAllUsers, setGotAllUsers] = useState(false);

  const [myRequests, setMyRequests] = useState([]);
  const [requestsToMe, setRequestsToMe] = useState([]);
  const [friends, setFriends] = useState([]);
  const [invitationToMe, setInvitationToMe] = useState([]);

  const mr = [];
  const fr = [];
  const rtm = [];
  const inv = [];
  useEffect(() => {
    if (myUser) {
      fetch('https://battleship-123.herokuapp.com/users', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: myUser.user_email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          fetch('https://battleship-123.herokuapp.com/my_friends', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              email: myUser.user_email,
            }),
          })
            .then((response) => response.json())
            .then((res) => {
              if (res.length) {
                res.map((friend) => {
                  if (friend.status === 'request') {
                    if (friend.from_email === myUser.user_email) {
                      mr.push(friend);
                      if (friend.status.includes('invite')) {
                        fr.push(friend);
                        inv.push(friend);
                      }
                    } else {
                      rtm.push(friend);
                      if (friend.status.includes('invite')) {
                        fr.push(friend);
                        inv.push(friend);
                      }
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
              setInvitationToMe(inv);

              setGotAllUsers(true);
            });
        });
    }
  }, []);
  return !gotAllUsers ? (
    <h1>Loading...</h1>
  ) : (
    <div className='wrapper'>
      <h1 className='caption'>Friends</h1>
      <Scroll>
        <CardList
          users={users}
          myUser={myUser}
          friends={friends}
          requestsToMe={requestsToMe}
          myRequests={myRequests}
          showAllUsers={false}
          invite={invite}
          invitationToMe={invitationToMe}
          join={join}
        />
      </Scroll>
    </div>
  );
}

export default Friends;

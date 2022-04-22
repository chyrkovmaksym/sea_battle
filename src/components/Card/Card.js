import './Card.css';
import React, { useEffect, useState } from 'react';
import Icon from '../../assets/images/user-icon.png';

function Card({
  name,
  email,
  myUser,
  friends,
  requestsToMe,
  myRequests,
  showAllUsers,
  invite,
  join,
}) {
  const [isInFriends, setIsInFriends] = useState(false);
  const [isInRequestsToMe, setIsInRequestToMe] = useState(false);
  const [isInMyRequests, setIsInMyRequests] = useState(false);
  const [isInInvitationToMe, setIsInInvitationToMe] = useState(false);
  const [room, setRoom] = useState();

  const sendFriendRequest = () => {
    fetch('https://battleship-123.herokuapp.com/friend_request', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        from_email: myUser.user_email,
        to_email: email,
        status: 'request',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
      });
    setIsInMyRequests(true);
  };
  const updateStatus = (status) => {
    fetch('https://battleship-123.herokuapp.com/update_status', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        from_email: email,
        to_email: myUser.user_email,
        status: status,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
      });
    setIsInRequestToMe(false);
    setIsInFriends(true);
  };
  const sendInvitation = () => {
    const room = Math.floor(Math.random() * 100000).toString();
    fetch('https://battleship-123.herokuapp.com/invite_friend', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        sender: myUser.user_email,
        email,
        room,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          join(room);
        }
      });
  };
  const deleteInvitation = (room) => {
    fetch('https://battleship-123.herokuapp.com/delete_invitation', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        room,
      }),
    });
  };
  useEffect(() => {
    if (invite && friends.filter((f) => f.to_email === email || f.from_email === email).length) {
      fetch('https://battleship-123.herokuapp.com/get_invited', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: myUser.user_email,
          sender: email
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setIsInInvitationToMe(true);
            setRoom(data.room);
          }
        });
    }
    for (const user of friends) {
      if (user.from_email === email || user.to_email === email) {
        setIsInFriends(true);
        return;
      }
    }
    for (const user of requestsToMe) {
      if (user.from_email === email) {
        setIsInRequestToMe(true);
        return;
      }
    }
    for (const user of myRequests) {
      if (user.to_email === email) {
        setIsInMyRequests(true);
        return;
      }
    }
  }, []);
  return showAllUsers ||
    isInFriends ||
    ((isInMyRequests || isInRequestsToMe) && !invite) ? (
    <div className='card'>
      <img alt='user' src={Icon} width='200px' height='200px' />
      <div>
        <h2 style={{margin: '10px auto'}}>{name}</h2>
        <p style={{margin: '10px auto'}}>{email}</p>
      </div>
      {isInFriends ? (
        <div>
          <div className='friend' style={{backgroundColor: 'lightblue'}}>Friend</div>
          {invite && !isInInvitationToMe ? (
            <button
            style={{backgroundColor: 'lightgreen'}}
              onClick={() => {
                sendInvitation();
              }}
              className='add'
            >
              Invite friend
            </button>
          ) : invite && isInInvitationToMe ? (
            <button
              onClick={() => {
                if (room) {
                  deleteInvitation(room);
                  join(room);
                }
              }}
              className='add'
            >
              Accept invitation
            </button>
          ) : (
            <span></span>
          )}
        </div>
      ) : isInRequestsToMe ? (
        <button onClick={() => updateStatus('friends')} className='add'>
          Accept request
        </button>
      ) : isInMyRequests ? (
        <div className='friend'>You sent request</div>
      ) : (
        <button onClick={sendFriendRequest} className='add'>
          Add to friends
        </button>
      )}
    </div>
  ) : (
    <span></span>
  );
}

export default Card;

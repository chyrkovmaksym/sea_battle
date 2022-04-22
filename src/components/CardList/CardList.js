import './CardList.css';
import React from 'react';
import Card from '../Card/Card';

function CardList({ users, myUser, friends, requestsToMe, myRequests, showAllUsers, invite, invitationToMe, join }) {
  return (
    <div>
      {users.length ? users.map((user, i) => {
        return (
          <Card
            key={i}
            name={user.user_name}
            email={user.user_email}
            myUser={myUser}
            friends={friends}
            requestsToMe={requestsToMe}
            myRequests={myRequests}
            showAllUsers={showAllUsers}
            invite={invite}
            invitationToMe={invitationToMe}
            join={join}
          />
        );
      }) : <h3>No users...</h3>}
    </div>
  );
}

export default CardList;

import React from "react";
import Friend from "./Friend";

const FriendsList = ({ data, handleFavorite, handleDelete }) => {
  return (
    <div className="friendsList">
      {data.map((friend) => (
        <Friend
          key={friend.id}
          data={friend}
          handleFavorite={handleFavorite}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default FriendsList;

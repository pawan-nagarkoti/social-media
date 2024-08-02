import React from "react";

export default function FollowListCard() {
  // Dummy followers list
  const followers = [
    { id: 1, name: "Follower 1" },
    { id: 2, name: "Follower 2" },
    { id: 3, name: "Follower 3" },
    { id: 4, name: "Follower 4" },
    { id: 5, name: "Follower 5" },
    { id: 6, name: "Follower 6" },
    { id: 7, name: "Follower 7" },
    { id: 8, name: "Follower 8" },
    { id: 9, name: "Follower 9" },
    { id: 10, name: "Follower 10" },
    { id: 11, name: "Follower 11" },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Followers</h2>
        <ul className="list-group">
          {followers.map((follower) => (
            <li key={follower.id} className="list-group-item">
              {follower.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

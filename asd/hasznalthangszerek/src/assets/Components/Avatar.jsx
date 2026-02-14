import React from "react";

const Avatar = ({ src, onClick }) => {
  return (
    <div onClick={onClick}>
      <img className="userAvatar" src={src} />
    </div>
  );
};

export default Avatar;

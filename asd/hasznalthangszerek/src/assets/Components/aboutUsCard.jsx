import { useState } from "react";

export default function aboutUsCard({ img, name }) {
  return (
    <span>
      <div id="userCard-grid">
        <img src={img} id="user-icon" />
        <h2 id="userCard-name">{name}</h2>
        <h4 id="userCard-text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
          soluta sit minima nulla iusto culpa, magni consequuntur, est, maiores
          sapiente laboriosam consequatur autem atque odit quos voluptates error
          odio dolor.
        </h4>
      </div>
    </span>
  );
}

import React from "react";
import { Link } from 'react-router-dom';

function PictureCard({ picture }) {
  const {id, name, artist, description, imageUrl } = picture;


  return (
    <div className="picture-card bg-white shadow-md p-4 rounded-lg m-3">
        <img
          src={imageUrl}
          alt={name}
          className="w-64 h-64 object-cover object-center mx-auto rounded-lg"
        />

      <h3>{name}</h3>
      <p>Artist: {artist}</p>
      <p>Description: {description}</p>
    </div>
  );
}

export default PictureCard;

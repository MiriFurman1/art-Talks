import React, { useState, useEffect } from "react";
import PictureCard from "./PictureCard";
import axios from "axios"; // Import axios
import { Link } from "react-router-dom";

function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pictures, setPictures] = useState([]); // Store fetched pictures

  useEffect(() => {
    // Fetch pictures from the backend API
    axios
      .get("http://localhost:3001/api/pictures") // Replace with your backend URL
      .then((response) => {
        setPictures(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pictures:", error);
      });
  }, []); // Empty dependency array to fetch data only once

  const filteredPictures = pictures.filter((picture) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    return (
      picture.name.toLowerCase().includes(lowerCaseSearch) ||
      picture.artist.toLowerCase().includes(lowerCaseSearch)
    );
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-screen flex flex-wrap flex-col items-center justify-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-4/6 p-2 mb-4 rounded-lg shadow-sm"
      />
      <div className="gallery max-w-screen  m-0 flex flex-wrap items-center justify-center">
        {filteredPictures.map((picture) => (
          <Link key={picture.id} to={`/discussion/${picture.id}`}>
            <PictureCard picture={picture} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GalleryPage;

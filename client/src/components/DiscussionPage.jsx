import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ChatComponent from './ChatComponent';

function DiscussionPage() {
  const { pictureId } = useParams();
  const [selectedPicture, setSelectedPicture] = useState(null);
  const websocketUrl = 'ws://localhost:3001';

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/pictures/${pictureId}`)
      .then((response) => {
        setSelectedPicture(response.data);
      })
      .catch((error) => {
        console.error('Error fetching picture:', error);
      });
  }, [pictureId]);

  if (!selectedPicture) {
    return <div>Loading...</div>;
  }


  return (
    <div className="discussion-page w-screen  flex flex-wrap justify-center bg-gray-100">
      <div className="picture-details bg-white p-8 m-8 rounded-lg shadow-md max-w-lg w-full">
        <img
          src={selectedPicture.imageUrl}
          alt={selectedPicture.name}
          className="w-full h-auto rounded-lg mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-800">{selectedPicture.name}</h2>
        <p className="text-gray-600 mt-2">Artist: {selectedPicture.artist}</p>
        <p className="text-gray-700 mt-4">{selectedPicture.description}</p>
      </div>
      <ChatComponent websocketUrl={websocketUrl} />
    </div>
  );
}

export default DiscussionPage;

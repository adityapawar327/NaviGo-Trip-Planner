import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const apiKey = "36Uwobr-YikbhQOMHAexJDC-MRGuhDC_p1CxTVsEXbM"; // Replace with your Unsplash Access Key
      const location = trip?.userSelection?.location?.label;

      if (!location) {
        setError("No location available to fetch an image.");
        return;
      }

      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(location)}&client_id=${apiKey}&orientation=landscape`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setImageUrl(data.results[0].urls.regular); // Use the first result
        } else {
          setError("No images found for the given location.");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching the image.");
      }
    };

    fetchImage();
  }, [trip]);

  return (
    <Link to={'/view-trip/' + trip?.id} className="group">
      <div
        className=" ml-10 mr-10  mx-auto my-8 p-6 rounded-2xl shadow-lg transition-transform transform group-hover:scale-105 group-hover:z-10 group-hover:backdrop-blur-sm bg-pink-50"
        style={{
          border: '2px solid rgb(199, 54, 89)',
        }}
      >
        <div className="absolute inset-0 group-hover:bg-white/70 rounded-2xl transition-all"></div>
        <div className="relative flex items-center h-full">
          <img
            src={imageUrl || "https://via.placeholder.com/200"}
            alt={trip?.userSelection?.location?.label || "Location"}
            className="w-36 h-36 rounded-xl object-cover border-2 border-pink-300"
          />
          <div className="ml-6 p-4 rounded-lg bg-white/80 w-full">
            <h2 className="font-bold text-xl text-pink-700">
              {trip?.userSelection?.location?.label || "Unknown Location"}
            </h2>
            <p className="text-base text-gray-600 mt-2">
              {trip?.userSelection?.noOfDays || 0} Days Trip
            </p>
            <p className="text-base text-gray-600">
              Budget: ₹{trip?.userSelection?.budget || "0"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;

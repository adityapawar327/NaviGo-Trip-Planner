import React, { useState, useEffect } from 'react';

function Hotels({ trip }) {
  const [hotelImages, setHotelImages] = useState({});
  const apiKey = "AIzaSyAI-O5CEIw3Ytzh-K7ZJHVBXc-Q5vUkllE"; // Replace with your Google Places API key

  // Function to fetch image for a hotel using Unsplash API
  const fetchHotelImage = async (hotelName) => {
    const unsplashApiKey = "36Uwobr-YikbhQOMHAexJDC-MRGuhDC_p1CxTVsEXbM"; // Replace with your Unsplash API key
    const url = `https://api.unsplash.com/search/photos?query=${hotelName}&client_id=${unsplashApiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Check if we got images in the response
      if (data.results.length > 0) {
        const imageUrl = data.results[0].urls.small;
        setHotelImages((prev) => ({
          ...prev,
          [hotelName]: imageUrl,
        }));
      } else {
        setHotelImages((prev) => ({
          ...prev,
          [hotelName]: '/path/to/placeholder.jpg', // Placeholder image
        }));
      }
    } catch (error) {
      console.error("Error fetching hotel image:", error);
    }
  };

  useEffect(() => {
    // Fetch images for all hotels
    trip?.tripData?.hotels?.forEach((item) => {
      if (item.hotelName) {
        fetchHotelImage(item.hotelName);
      }
    });
  }, [trip]);

  return (
    <div>
      <h2 className="font-bold text-2xl mt-5 text-[#151515]">Hotel Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
        {/* Loop through the hotels data */}
        {trip?.tripData?.hotels?.map((item, index) => (
          <a
            key={index}
            href={`https://www.google.com/maps?q=${encodeURIComponent(item.hotelName + ", " + item.hotelAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block rounded-lg shadow-lg overflow-hidden bg-transparent border border-[#A91D3A] hover:bg-[#F9E2E6] hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out"
          >
            {/* Hotel Image */}
            <img
              src={hotelImages[item.hotelName] || item.hotelImageUrl || '/path/to/placeholder.jpg'}
              alt={item.hotelName}
              className="w-full h-48 object-cover rounded-t-lg transition duration-300 ease-in-out"
            />

            <div className="p-4">
              {/* Hotel Name */}
              <h3 className="font-semibold text-lg text-[#A91D3A]">{item.hotelName}</h3>

              {/* Rating */}
              <div className="flex items-center mt-2">
                <span className="text-yellow-500 text-sm">⭐ {item.rating}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-[#4A4A4A] mt-2">{item.description}</p>

              {/* Price */}
              <p className="mt-3 font-bold text-[#A91D3A] text-lg">{item.price}</p>

              {/* Address (Location) */}
              <p className="text-base text-[#4A4A4A] mt-2">{item.hotelAddress}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Hotels;



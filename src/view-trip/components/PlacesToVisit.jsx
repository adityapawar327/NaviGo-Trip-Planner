import React, { useState, useEffect } from "react";

function PlacesToVisit({ trip }) {
  const [placeImages, setPlaceImages] = useState({});
  const UNSPLASH_API_KEY = "36Uwobr-YikbhQOMHAexJDC-MRGuhDC_p1CxTVsEXbM"; // Replace with your Unsplash Access Key
  const itinerary = trip.tripData?.itinerary;

  // Fetch Unsplash images for all places in the itinerary
  useEffect(() => {
    const fetchAllImages = async () => {
      const places = Object.values(itinerary || {}).flat();

      const fetchPromises = places.map(async (place) => {
        if (!place.placeName || placeImages[place.placeName]) return; // Skip if already fetched
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          place.placeName
        )}&client_id=${UNSPLASH_API_KEY}&orientation=landscape`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const imageUrl =
              data.results[0]?.urls?.regular || "https://placehold.co/600x400";
            setPlaceImages((prev) => ({ ...prev, [place.placeName]: imageUrl }));
          }
        } catch (error) {
          console.error("Error fetching image for:", place.placeName, error);
        }
      });

      await Promise.all(fetchPromises); // Wait for all fetches to complete
    };

    fetchAllImages();
  }, [itinerary]); // Depend on `itinerary` to avoid unnecessary re-renders

  // Open Google Maps with the place name
  const openGoogleMaps = (placeName) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(placeName)}`;
    window.open(googleMapsUrl, "_blank");
  };

  if (!itinerary) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      <h2 className="font-bold text-2xl mt-5 text-[#151515]">Places to Visit</h2>
      <div className="mt-6">
        {/* Loop through the itinerary days */}
        {Object.keys(itinerary).map((day, dayIndex) => (
          <div key={dayIndex} className="mb-12">
            {/* Day Title */}
            <h3 className="font-semibold text-xl text-[#A91D3A] mb-4">Day {dayIndex + 1}</h3>

            {/* Loop through the places for each day */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {itinerary[day].map((item, index) => (
                <div
                  key={index}
                  onClick={() => openGoogleMaps(item.placeName)} // Open Google Maps on card click
                  className="group relative block rounded-lg shadow-lg overflow-hidden bg-transparent border border-[#A91D3A] hover:bg-[#F9E2E6] hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer"
                >
                  {/* Place Image */}
                  <div className="relative">
                    <img
                      src={placeImages[item.placeName] || "https://placehold.co/600x400"}
                      alt={item.placeName}
                      className="w-full h-48 object-cover rounded-t-lg transition duration-300 ease-in-out"
                      style={{ objectFit: "cover", filter: "brightness(0.8)" }}
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
                      <h4 className="font-semibold text-lg">{item.placeName}</h4>
                    </div>
                  </div>
                  <div className="p-4">
                    {/* Rating */}
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500 text-sm">⭐ {item.rating}</span>
                    </div>

                    {/* Place Details */}
                    <p className="text-sm text-[#4A4A4A] mt-2">{item.placeDetails}</p>

                    {/* Ticket Pricing */}
                    <p className="mt-3 text-sm text-[#A91D3A]">{item.ticketPricing}</p>

                    {/* Time */}
                    <p className="text-base text-[#4A4A4A] mt-2">
                      <strong>Time:</strong> {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;


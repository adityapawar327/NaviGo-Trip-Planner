import { Button } from "@/components/ui/button";
import { FaRegShareSquare } from "react-icons/fa";
import React, { useState, useEffect } from "react";

function InfoSection({ trip }) {
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
    <div className="relative">
      {/* Image Section */}
      <div className="relative w-full mx-auto mt-10 rounded-xl shadow-lg overflow-hidden max-h-[75vh]">
        <div className="relative h-[75vh]">
          {/* Background Image */}
          <img
            src={imageUrl || "https://placehold.co/1920x1080"}
            alt="Trip location"
            className="w-full h-full object-cover rounded-xl opacity-80" // Full screen with rounded corners
          />

          {/* Overlay Text */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <h2 className="text-white text-4xl md:text-6xl font-bold text-center">
              {trip?.userSelection?.location?.label || "Unknown Location"}
            </h2>
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div className="flex justify-center">
        <div className="my-5 flex flex-col gap-2">
          <div className="flex gap-5 justify-center mt-3">
            <h2 className="p-2 px-4 bg-[#A91D3A] bg-opacity-50 rounded-full text-white text-base md:text-lg">
              {trip.userSelection?.noOfDays || "N/A"} Days
            </h2>
            <h2 className="p-2 px-4 bg-[#A91D3A] bg-opacity-50 rounded-full text-white text-base md:text-lg">
              {trip.userSelection?.budget || "N/A"} Budget
            </h2>
            <h2 className="p-2 px-4 bg-[#A91D3A] bg-opacity-50 rounded-full text-white text-base md:text-lg">
              {trip.userSelection?.traveler || "N/A"}
            </h2>
          </div>
          </div>
        </div>
      </div>
  );
}

export default InfoSection;



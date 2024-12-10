import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
  const navigate = useNavigate(); // Fixed useNavigation to useNavigate
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/'); // Corrected navigation to navigate
      return;
    }

    const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email));
    const querySnapshot = await getDocs(q);

    const trips = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      trips.push(doc.data()); // Collect trips in an array
    });
    setUserTrips(trips); // Update state once with the collected data
  };

  return (
    <div className="bg-pink-50 min-h-screen p-6">
      {/* Heading with custom styles */}
      <h2 className="mt-20 mb-10 md:px-20 lg:px-36 xl:px-56 text-center font-bold text-4xl py-4 px-6 rounded-xl border-4 border-pink-200 bg-pink-100 text-pink-700">
        My Trips
      </h2>

      {/* Display trips */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 col">
        {userTrips.map((trip, index) => (
          <UserTripCardItem key={index} trip={trip} /> // Added key prop
        ))}
      </div>
    </div>
  );
}

export default MyTrips;


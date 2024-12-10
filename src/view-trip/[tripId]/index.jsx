import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Weather from "../components/Weather";
import Footer from "../components/Footer";


function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);
  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSection trip={trip}/>
      {/* Recomended Hotels */}
      <Hotels trip={trip}/>
      {/* Daily Plan */}
      <PlacesToVisit trip={trip}/>
      {/* weather */}
      <Weather trip={trip}/>
      {/* clothes to wear */}
      <Footer/>
      
      

    </div>
  );
}

export default Viewtrip;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelLists,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate} from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTraveler, setSelectedTraveler] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle changes in form inputs
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Google Login configuration
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.error("Login Error:", error),
  });

  const GetUserProfile = async (tokenInfo) => {
    const accessToken = tokenInfo?.access_token;
    if (!accessToken) {
      console.error("Access token is missing or undefined.");
      return;
    }

    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
      console.log("User Profile:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setOpenDialog(false); // Close dialog after successful login
      OnGenerateTrip(); // Proceed to generate trip
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Generate trip logic
  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true); // Show login dialog if user is not logged in
      return;
    }

    if (!formData?.noOfDays || isNaN(formData?.noOfDays)) {
      alert("Please enter a valid number of days.");
      return;
    }

    if (formData?.noOfDays <= 5) {
      setLoading(true); // Show loading text
      const FINAL_PROMPT = AI_PROMPT.replace(
        "{location}",
        place?.label || "No location selected"
      )
        .replace("{totalDays}", formData?.noOfDays)
        .replace("{traveler}", formData?.traveler || "Not specified")
        .replace("{budget}", formData?.budget || "Not specified");

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("--", result?.response?.text());
      setLoading(false); // Hide loading text
      SaveAiTrip(result?.response?.text()); // Save AI generated trip to Firestore
    } else {
      alert("Trip cannot be generated for more than 5 days.");
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/"+docId); // Redirect to trip details page

  };

  return (
    <div className="flex justify-center items-center min-h-screen backdrop-blur-md">
      <div className="w-full bg-white/90 p-8 sm:px-10 md:px-32 lg:px-56 xl:px-10 max-w-7xl mx-auto mt-10 rounded-lg shadow-lg">
        <h2 className="font-bold text-3xl mt-15 pt-9 text-center text-[#151515]">
          Customize Your Dream Trip
        </h2>
        <p className="mt-3 text-gray-500 text-center">
          Let us know your preferences and we'll help you plan the perfect
          getaway. Choose your destination, budget, and travel style to get
          started!
        </p>

        <div className="mt-20 flex flex-col gap-10">
          {/* Location input */}
          <div className="p-5 rounded-md shadow-md">
            <h2 className="text-xl font-medium text-center">
              Where would you like to go?
            </h2>
            <GooglePlacesAutocomplete
              apiKey="AIzaSyAI-O5CEIw3Ytzh-K7ZJHVBXc-Q5vUkllE"
              selectProps={{
                value: place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
              }}
            />
          </div>

          {/* Days input */}
          <div className="p-5 rounded-md shadow-md">
            <h2 className="text-xl font-medium text-center">
              How many days will you be traveling?
            </h2>
            <Input
              placeholder={"3 Days"}
              type="number"
              className="mt-3 bg-[#EEEEEE] text-[#151515] border-[#C73659] focus:ring-2 focus:ring-[#C73659]"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>
        </div>

        {/* Budget selection */}
        <div className="p-5 rounded-md shadow-md mt-10">
          <h2 className="text-xl font-medium text-center">
            What’s your budget range?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((items, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg cursor-pointer transition duration-300 ${
                  selectedBudget === items.title
                    ? "bg-[#C73659] text-[#EEEEEE] shadow-lg"
                    : "bg-[#EEEEEE] text-[#151515] border-[#A91D3A] hover:bg-[#C73659] hover:text-[#EEEEEE]"
                }`}
                onClick={() => {
                  setSelectedBudget(items.title);
                  handleInputChange("budget", items.title);
                }}
              >
                <h2 className="text-4xl">{items.icon}</h2>
                <h2 className="font-bold text-lg">{items.title}</h2>
                <h2 className="text-sm text-gray-500">{items.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Traveler selection */}
        <div className="p-5 rounded-md shadow-md mt-10">
          <h2 className="text-xl font-medium text-center">
            How many people are traveling?
          </h2>
          <div className="grid grid-cols-4 gap-5 mt-5">
            {SelectTravelLists.map((items, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg cursor-pointer transition duration-300 ${
                  selectedTraveler === items.title
                    ? "bg-[#C73659] text-[#EEEEEE] shadow-lg"
                    : "bg-[#EEEEEE] text-[#151515] border-[#A91D3A] hover:bg-[#C73659] hover:text-[#EEEEEE]"
                }`}
                onClick={() => {
                  setSelectedTraveler(items.title);
                  handleInputChange("traveler", items.title);
                }}
              >
                <h2 className="text-4xl">{items.icon}</h2>
                <h2 className="font-bold text-lg">{items.title}</h2>
                <h2 className="text-sm text-gray-500">{items.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Generate trip button */}
        <div>
          <Button
            className="px-4 py-2 rounded-md text-[#EEEEEE] bg-[#151515] hover:bg-[#A91D3A] focus:ring-2 focus:ring-[#C73659] transition duration-300 mt-5 mb-10 shadow-md w-full"
            onClick={OnGenerateTrip}
            disabled={loading}
          >
            {loading ? "Loading..." : "Generate My Trip"}
          </Button>
        </div>

        {/* Login dialog */}
        <Dialog open={openDialog}>
          <DialogContent className="bg-gradient-to-r from-[#151515] via-[#A91D3A] to-[#C73659] text-white rounded-lg p-6 shadow-xl max-w-md mx-auto">
            <DialogHeader>
              <h3 className="text-2xl font-semibold text-center">
                Log in to proceed
              </h3>
              <DialogDescription className="text-center mt-4">
                Please sign in with your Google account to generate your trip.
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-center mt-6">
              <Button
                variant="outline"
                className="text-white bg-[#A91D3A] hover:bg-[#C73659] focus:ring-2 focus:ring-[#C73659]"
                onClick={() => login()}
              >
                <FaGoogle className="mr-2" />
                Sign in with Google
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
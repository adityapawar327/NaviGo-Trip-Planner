import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa"; // Import Google icon
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

function Header() {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log("User:", user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
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
      setUser(response.data); // Update user state
      setOpenDialog(false); // Close dialog after successful login
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div className="p-3 shadow-lg flex justify-between items-center px-5 fixed top-0 left-0 w-full bg-white/30 backdrop-blur-md z-50">
      {/* Logo and Brand Name */}
      <a href="/">
      <div className="flex items-center">
        <img src="/logo.svg" alt="Logo" className="h-8 mr-1" />
        <span className="text-lg font-bold text-[#151515]">aviGo</span>
      </div>
      </a>

      {/* User Info or Sign In Button */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
          <div>
            <a href="/create-trip">
            <Button className="px-4 py-2 rounded-md text-[#EEEEEE] bg-[#151515] hover:bg-[#A91D3A] focus:ring-2 focus:ring-[#C73659] transition duration-300">
              New Trip
            </Button>
            </a>
            </div>
          <div>
            <a href="/my-trips">
            <Button className="px-4 py-2 rounded-md text-[#EEEEEE] bg-[#151515] hover:bg-[#A91D3A] focus:ring-2 focus:ring-[#C73659] transition duration-300">
              My Trips
            </Button>
            </a>
            </div>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  alt="User Profile"
                  className="h-10 w-10 rounded-full border-2 border-[#151515] object-cover"
                />
              </PopoverTrigger>
              <PopoverContent className="bg-gradient-to-r from-[#151515] via-[#A91D3A] to-[#C73659] text-white rounded-lg shadow-lg p-4">
                <h2
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    setUser(null); // Clear user state
                    window.location.reload();
                  }}
                  className="cursor-pointer text-lg font-semibold text-white hover:underline transition duration-300"
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <>
            <Button
              onClick={() => setOpenDialog(true)}
              className="px-4 py-2 rounded-md text-[#EEEEEE] bg-[#151515] hover:bg-[#A91D3A] focus:ring-2 focus:ring-[#C73659] transition duration-300"
            >
              Sign In
            </Button>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent className="bg-gradient-to-r from-[#151515] via-[#A91D3A] to-[#C73659] text-white rounded-lg p-6 shadow-xl max-w-md mx-auto">
                <DialogHeader>
                  <h3 className="text-2xl font-semibold text-center">
                    Log in to proceed
                  </h3>
                  <DialogDescription className="text-center mt-4">
                    Please sign in with your Google account to generate your
                    trip.
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
          </>
        )}
      </div>
    </div>
  );
}

export default Header;

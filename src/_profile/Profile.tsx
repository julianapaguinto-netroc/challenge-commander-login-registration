import React from "react";
import { FaUser, FaEnvelope, FaPhone, FaHome, FaLock } from "react-icons/fa";
import { ChevronLeft } from "lucide-react"; // For the back arrow
import profilePicture from "@/assets/profile.jpg";
import headerImage from "@/assets/header-bg.png";

const ProfileCard = () => {
  const handleBack = () => {
    // Replace this with your navigation logic
    window.history.back();
  };

  return (
    <div className="max-w-xs mx-auto font-poppins">
      {/* Header with background image */}
      <div
        className="relative h-60 flex justify-center"
        style={{
          backgroundImage: `url(${headerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Navigation Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 bg-black/40 p-2 rounded-full text-white hover:bg-black/60 transition"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Profile Picture */}
        <div className="absolute top-10 flex flex-col items-center">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />
          <h2 className="mt-2 text-white font-semibold text-lg">
            Enid Sinclair
          </h2>
          <p className="text-white text-sm">Participant</p>
        </div>
      </div>

      {/* Stats Card Overlay */}
      <div className="relative z-10 -mt-10 mx-4 bg-white shadow-lg rounded-xl flex justify-around py-3">
        <div className="text-center">
          <p className="text-lg font-bold text-red-500">450</p>
          <p className="text-xs text-gray-500">Points</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-red-500">10</p>
          <p className="text-xs text-gray-500">Badges</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-red-500">60</p>
          <p className="text-xs text-gray-500">GEMs</p>
        </div>
      </div>

      {/* Personal Info */}
      <div className="p-4 bg-white rounded-xl mt-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-700">Personal info</h3>
          <button className="text-red-500 text-sm font-medium">Edit</button>
        </div>
        <div className="space-y-4 text-gray-700 text-sm">
          <div>
            <p className="text-xs text-gray-400">Full Name</p>
            <p className="flex items-center gap-3">
              <FaUser className="text-gray-500" />
              Enid Sinclair
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Email Address</p>
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-gray-500" />
              enid@gmail.com
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Phone Number</p>
            <p className="flex items-center gap-3">
              <FaPhone className="text-gray-500" />
              +1 201 555-0123
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Address</p>
            <p className="flex items-center gap-3">
              <FaHome className="text-gray-500" />
              70 Rainey Street, Apartment 146, Austin TX 78701
            </p>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white p-4 rounded-xl mt-4 shadow-sm">
        <h3 className="font-semibold text-gray-700 mb-3">Account Info</h3>
        <div className="space-y-4 text-gray-700 text-sm">
          <div>
            <p className="text-xs text-gray-400">Role</p>
            <p className="flex items-center gap-3">
              <FaUser className="text-gray-500" />
              Participant
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Password</p>
            <p className="flex items-center gap-3">
              <FaLock className="text-gray-500" />
              ••••••••
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <button className="w-full py-2 bg-gray-200 rounded-lg text-sm font-medium">
            Edit Role
          </button>
          <button className="w-full py-2 bg-gray-200 rounded-lg text-sm font-medium">
            Change Password
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4">
        <button className="w-full py-2 bg-primary text-white rounded-lg font-medium">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;

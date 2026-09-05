"use client";

import React, { useState } from "react";
import { User, Phone, HeartPulse, MapPin, Edit3, Check } from "lucide-react";

export default function TouristProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Morgan",
    emergencyContact: "+1 (555) 019-2834 (Family)",
    bloodGroup: "O Positive",
    medicalNotes: "No known allergies, carries inhaler",
    stayAddress: "Grand Central Hotel, Room 402",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-blue-400" />
          <h2 className="text-lg font-bold text-white">Tourist Profile & Safety Information</h2>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition"
        >
          {isEditing ? <Check className="h-3.5 w-3.5" /> : <Edit3 className="h-3.5 w-3.5" />}
          {isEditing ? "Save Details" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <label className="text-xs text-slate-400 font-medium">Full Name</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
            />
          ) : (
            <p className="font-semibold text-white">{profile.name}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <Phone className="h-3.5 w-3.5 text-emerald-400" /> Primary Emergency Contact
          </label>
          {isEditing ? (
            <input
              type="text"
              name="emergencyContact"
              value={profile.emergencyContact}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
            />
          ) : (
            <p className="font-semibold text-emerald-400">{profile.emergencyContact}</p>
          )}
        </div>

        {/* UPDATED: Blood Group & Health Notes Section */}
        <div className="space-y-1">
          <label className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <HeartPulse className="h-3.5 w-3.5 text-rose-400" /> Blood Group & Health Notes
          </label>
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="text"
                name="bloodGroup"
                value={profile.bloodGroup}
                onChange={handleChange}
                placeholder="Blood Grp"
                className="w-1/3 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                name="medicalNotes"
                value={profile.medicalNotes}
                onChange={handleChange}
                placeholder="Medical Notes"
                className="w-2/3 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          ) : (
            <p className="text-slate-300">
              <span className="text-rose-400 font-semibold">{profile.bloodGroup}</span> &bull; {profile.medicalNotes}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-amber-400" /> Stay / Hotel Address
          </label>
          {isEditing ? (
            <input
              type="text"
              name="stayAddress"
              value={profile.stayAddress}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
            />
          ) : (
            <p className="text-slate-300">{profile.stayAddress}</p>
          )}
        </div>
      </div>
    </div>
  );
}
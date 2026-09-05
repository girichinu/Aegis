"use client";

import React, { useState } from "react";
import { AlertOctagon, MapPin, Camera, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function IncidentForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoData, setPhotoData] = useState<string>("");
  const [category, setCategory] = useState("Suspicious Activity");
  const [details, setDetails] = useState("");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoData(reader.result as string);
        setHasPhoto(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from("incidents")
      .insert([
        {
          category: category,
          details: details,
          status: "Pending",
        },
      ]);

    if (error) {
      console.error("Error saving incident:", error.message);
      alert("Failed to submit incident");
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto mt-16 bg-slate-900 px-6 py-5 flex flex-col gap-3 rounded-xl border border-slate-800">
      <div className="flex items-center gap-3">
        <AlertOctagon className="h-6 w-6 text-amber-500" />
        <h2 className="text-xl font-bold text-white tracking-wide">Report Incident</h2>
      </div>

      {isSubmitted ? (
        <div className="text-center py-8 text-emerald-400 flex flex-col items-center gap-2">
          <CheckCircle className="h-12 w-12" />
          <p className="text-lg font-semibold">Incident Reported Successfully!</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm"
          >
            Report Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300">Incident Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            >
              <option>Suspicious Activity</option>
              <option>Theft / Pickpocketing</option>
              <option>Medical Emergency</option>
              <option>Harassment</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300">Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe what happened..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white h-28"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300">Attach Photo (Optional)</label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors">
                <Camera className="h-4 w-4 text-amber-500" />
                {hasPhoto ? "Photo Attached ✓" : "Upload Photo"}
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Send className="h-5 w-5" /> Submit Report
          </button>
        </form>
      )}
    </div>
  );
}
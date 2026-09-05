"use client";

import { useState } from "react";
import { AlertOctagon, MapPin, Camera, Send, CheckCircle2 } from "lucide-react";

export default function IncidentForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [category, setCategory] = useState("Suspicious Activity");
  const [details, setDetails] = useState("");

  // The Magic Trick: Convert the image file into a Base64 text string
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newIncident = {
      id: "INC-" + Math.floor(Math.random() * 10000),
      user: "Live Tourist (You)",
      location: "GPS: 13.0827, 77.5036",
      time: "Just now",
      type: category,
      status: "Pending",
      details: details,
      hasPhoto: hasPhoto,
      photoData: photoData // We pass the image text here!
    };

    const existingData = JSON.parse(localStorage.getItem("aegis_alerts") || "[]");
    localStorage.setItem("aegis_alerts", JSON.stringify([newIncident, ...existingData]));

    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="max-w-2xl w-full mx-auto mt-16 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative">
      <div className="bg-slate-900 px-6 py-5 flex items-center gap-3">
        <AlertOctagon className="h-6 w-6 text-amber-500" />
        <h2 className="text-xl font-bold text-white tracking-wide">Report an Incident</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Incident Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer">
              <option>Suspicious Activity</option>
              <option>Theft / Pickpocketing</option>
              <option>Medical Emergency</option>
              <option>Harassment</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              <input type="text" defaultValue="Current GPS Location" readOnly className="w-full bg-slate-50 border border-slate-200 text-slate-600 rounded-xl pl-10 pr-4 py-3 cursor-not-allowed" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Details</label>
          <textarea rows={3} value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Please describe what happened..." required className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"></textarea>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <label className={`text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer ${hasPhoto ? 'text-green-600' : 'text-slate-500 hover:text-blue-600'}`}>
            {hasPhoto ? <CheckCircle2 className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
            {hasPhoto ? "Photo Attached!" : "Attach Photo Evidence"}
            {/* Added the new onChange handler here */}
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          </label>
          
          <button type="submit" className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md ${isSubmitted ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"}`}>
            {isSubmitted ? "Report Sent!" : <><Send className="h-5 w-5" /> Submit to Authorities</>}
          </button>
        </div>
      </form>
    </div>
  );
}
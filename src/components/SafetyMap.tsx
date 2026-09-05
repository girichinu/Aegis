"use client";

import React, { useEffect } from "react";
import { MapPin, AlertTriangle } from "lucide-react";

export default function SafetyMap() {
  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-bold text-white">Live Safety Map & Surroundings</h2>
        </div>
        <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          GPS Active
        </span>
      </div>

      <div className="w-full h-[350px] rounded-lg overflow-hidden border border-slate-800 relative">
        <iframe
          title="Safety Map"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src="https://www.openstreetmap.org/export/embed.html?bbox=77.48%2C13.05%2C77.55%2C13.12&amp;layer=mapnik"
          className="w-full h-full filter invert hue-rotate-180 contrast-125"
        ></iframe>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span className="flex items-center gap-1">
          <AlertTriangle className="h-4 w-4 text-amber-400" /> Area Status: Moderate Safe Zone
        </span>
        <span>Radius: 2.5 km monitored</span>
      </div>
    </div>
  );
}
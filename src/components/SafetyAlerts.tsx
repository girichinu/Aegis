"use client";

import React from "react";
import { ShieldAlert } from "lucide-react";

export default function SafetyAlerts() {
  return (
    <div className="w-full bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3 text-amber-300">
      <ShieldAlert className="h-6 w-6 shrink-0 mt-0.5 text-amber-400 animate-pulse" />
      <div className="space-y-1">
        <h3 className="text-sm font-bold tracking-wide uppercase text-amber-400">Active Area Risk & Safety Alert</h3>
        <p className="text-xs text-slate-300">
          <strong className="text-white">Caution:</strong> Moderate crowd density reported near central tourist zone. Exercise standard precautions after dark and keep your digital tourist ID accessible.
        </p>
      </div>
    </div>
  );
}
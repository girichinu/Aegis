"use client";

import React from "react";
import { Phone, ShieldAlert, BookOpen, ExternalLink } from "lucide-react";

export default function SafetyResources() {
  const contacts = [
    { name: "Emergency Police", number: "112", description: "All-in-one emergency response" },
    { name: "Tourist Helpline", number: "1363", description: "Official 24/7 multilingual tourist support" },
    { name: "Ambulance", number: "102", description: "Medical emergency assistance" },
  ];

  const guidelines = [
    { title: "Avoid Unlit Areas at Night", desc: "Stick to well-populated streets and registered transport options." },
    { title: "Keep Digital Copies", desc: "Always have encrypted digital scans of your ID card and passport handy." },
  ];

  return (
    <div className="max-w-2xl w-full mx-auto mt-8 bg-slate-900 px-6 py-6 flex flex-col gap-6 rounded-xl border border-slate-800 text-white">
      <div className="flex items-center gap-3">
        <BookOpen className="h-6 w-6 text-amber-500" />
        <h2 className="text-xl font-bold tracking-wide">Safety Resources & Helplines</h2>
      </div>

      {/* Emergency Contacts */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Direct Helplines</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {contacts.map((c, index) => (
            <a 
              key={index} 
              href={`tel:${c.number}`}
              className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg border border-slate-700 flex flex-col justify-between transition-colors"
            >
              <div>
                <p className="text-xs text-slate-400">{c.name}</p>
                <p className="text-lg font-bold text-amber-400 mt-1 flex items-center gap-1">
                  <Phone className="h-4 w-4" /> {c.number}
                </p>
              </div>
              <p className="text-xs text-slate-500 mt-2">{c.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Safety Guidelines */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Quick Safety Guidelines</h3>
        <div className="space-y-2">
          {guidelines.map((g, index) => (
            <div key={index} className="bg-slate-800/50 p-3 rounded-lg border border-slate-800 flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">{g.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import SafetyMap from "@/components/SafetyMap";
import TouristIdCard from "@/components/TouristIdCard";
import SafetyResources from "@/components/SafetyResources";
import AiAdvisor from "@/components/AiAdvisor";
import IncidentForm from "@/components/IncidentForm";
import SafetyAlerts from "@/components/SafetyAlerts";
import TouristProfile from "@/components/TouristProfile";
import EmergencyTools from "@/components/EmergencyTools"; // <-- NEW IMPORT
import { Shield } from "lucide-react";

export default function Home() {
 const [activeTab, setActiveTab] = useState("home");

 return (
 <div className="min-h-screen bg-slate-950 text-white flex flex-col">
{/* Top Navigation Bar */}
 <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
 <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("home")}>
<Shield className="h-6 w-6 text-amber-500" />
<span className="text-xl font-bold tracking-wider">AEGIS</span>
</div>
 
 <nav className="flex flex-wrap items-center gap-2 md:gap-4 text-sm font-medium">
 <button 
 onClick={() => setActiveTab("home")} 
 className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === "home" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-300 hover:bg-slate-800"}`}
 >
 Home
 </button>
 <button 
 onClick={() => setActiveTab("profile")} 
 className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === "profile" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-300 hover:bg-slate-800"}`}
 >
 Profile
 </button>
 <button 
 onClick={() => setActiveTab("report")} 
 className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === "report" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-300 hover:bg-slate-800"}`}
 >
 Report Incident
 </button>
 <button 
 onClick={() => setActiveTab("ai")} 
 className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === "ai" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-300 hover:bg-slate-800"}`}
 >
 AI Advisor
 </button>
 <button 
 onClick={() => setActiveTab("resources")} 
 className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === "resources" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-300 hover:bg-slate-800"}`}
 >
 Safety Resources
 </button>
 <button 
 onClick={() => setActiveTab("id")} 
 className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === "id" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-300 hover:bg-slate-800"}`}
 >
 ID Verification
 </button>
 </nav>
 </header>

 {/* Main Content Area Controlled by Navigation */}
 <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8">
 
 {/* HOME TAB */}
 {activeTab === "home" && (
<div className="space-y-6">
 <SafetyMap />
 
 {/* NEW EMERGENCY TOOLS ADDED HERE */}
 <EmergencyTools />
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <TouristIdCard />
 <SafetyResources />
 </div>
 
 <AiAdvisor />
 <IncidentForm />
 <SafetyAlerts />
 </div>
 )}

 {/* OTHER TABS */}
 {activeTab === "profile" && <TouristProfile />}
 {activeTab === "report" && <IncidentForm />}
 {activeTab === "ai" && <AiAdvisor />}
 {activeTab === "resources" && <SafetyResources />}
 {activeTab === "id" && <TouristIdCard />}
 
 </main>
 </div>
 );
}
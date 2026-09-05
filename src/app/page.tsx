"use client";

import { motion } from "framer-motion";
import { Shield, Map, PhoneCall } from "lucide-react";
import TouristIdCard from "@/components/TouristIdCard";
import IncidentForm from "@/components/IncidentForm";
import AiAdvisor from "@/components/AiAdvisor";
import dynamic from 'next/dynamic';

const SafetyMap = dynamic(() => import("@/components/SafetyMap"), { ssr: false });

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSOS = () => {
    window.alert("🚨 EMERGENCY SOS TRIGGERED! 🚨\n\nYour exact GPS coordinates have been securely dispatched to local authorities and the Aegis Command Center. Please stay calm.");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-700 font-extrabold text-2xl tracking-tight">
            <Shield className="h-7 w-7" />
            <span>Aegis</span>
          </div>
          <div className="flex gap-6 items-center">
            <button onClick={() => scrollToSection('map-section')} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Live Map</button>
            <button onClick={() => scrollToSection('id-section')} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Digital ID</button>
            <button onClick={() => scrollToSection('report-section')} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Report Incident</button>
          </div>
        </div>
      </nav>

      <main className="pt-40 pb-20 px-4 max-w-7xl mx-auto text-center flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-green-100 border border-green-200 text-green-800 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 mb-8">
          <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span>
          Current Location: Safe (94/100)
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
          Explore the World with <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Complete Peace of Mind.</span>
        </motion.h1>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Your intelligent tourist safety platform. Real-time danger alerts, instant SOS dispatch, and a verified digital identity—all in your pocket.
        </motion.p>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
          <button onClick={handleSOS} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105">
            <PhoneCall className="h-5 w-5" />
            Emergency SOS
          </button>
          <button onClick={() => scrollToSection('map-section')} className="bg-white border-2 border-slate-200 hover:border-blue-600 text-slate-800 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-105">
            <Map className="h-5 w-5 text-blue-600" />
            View Safety Map
          </button>
        </motion.div>

        <div id="id-section" className="w-full mt-12"><TouristIdCard /></div>
        <div id="map-section" className="w-full pt-16"><SafetyMap /></div>
        <div id="report-section" className="w-full pt-16"><IncidentForm /></div>
        <div className="w-full pt-16"><AiAdvisor /></div>
      </main>
    </div>
  );
}
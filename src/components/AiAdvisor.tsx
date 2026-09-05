"use client";

import { useState } from "react";
import { Sparkles, MapPin, ShieldAlert, CheckCircle2, Loader2 } from "lucide-react";

export default function AiAdvisor() {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<null | any>(null);

  const handleScan = () => {
    setIsScanning(true);
    setResults(null);
    
    // Simulating an API call to a Large Language Model (like Gemini)
    setTimeout(() => {
      setResults({
        location: "Chikkabanavara, Bengaluru",
        safetyScore: 88,
        summary: "Generally safe during daylight. Well-connected area, but exercise standard caution in crowded transit zones.",
        tips: [
          "Keep valuables secured near the railway station.",
          "Local emergency number is 112.",
          "Auto-rickshaws should use meters; negotiate fares beforehand if not."
        ]
      });
      setIsScanning(false);
    }, 2500);
  };

  return (
    <div className="max-w-2xl w-full mx-auto mt-16 mb-20 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-indigo-500/30">
      
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500/20 p-2 rounded-lg">
            <Sparkles className="h-6 w-6 text-indigo-400" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">AI Safety Advisor</h2>
        </div>
        <span className="text-xs font-semibold text-indigo-300 bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800">
          Powered by Gemini
        </span>
      </div>

      {/* Body */}
      <div className="p-6 md:p-8 flex flex-col items-center justify-center min-h-[250px] text-center">
        
        {!isScanning && !results && (
          <div className="space-y-6 flex flex-col items-center">
            <p className="text-indigo-200 text-lg max-w-md">
              Tap below to let our AI analyze your surroundings for local risks, common scams, and safety tips.
            </p>
            <button 
              onClick={handleScan}
              className="bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:-translate-y-1"
            >
              <MapPin className="h-5 w-5" /> Analyze My Surroundings
            </button>
          </div>
        )}

        {isScanning && (
          <div className="flex flex-col items-center space-y-4 text-indigo-300">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-400" />
            <p className="animate-pulse font-medium text-lg">AI is scanning local incident reports and terrain...</p>
          </div>
        )}

        {results && (
          <div className="w-full text-left space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-start justify-between border-b border-indigo-500/30 pb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">{results.location}</h3>
                <p className="text-indigo-300 mt-1">{results.summary}</p>
              </div>
              <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-2 rounded-xl text-center">
                <span className="block text-2xl font-extrabold">{results.safetyScore}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider">Score</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" /> AI Tactical Advice
              </h4>
              <ul className="space-y-2">
                {results.tips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                    <CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" />
                    <span className="text-indigo-100 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              onClick={() => setResults(null)}
              className="text-indigo-400 text-sm font-semibold hover:text-indigo-300 transition-colors"
            >
              ← Scan a new area
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Phone, ShieldAlert, X, AlertTriangle, AlertOctagon } from "lucide-react";

export default function EmergencyTools() {
  // --- SOS PANIC BUTTON LOGIC ---
  const triggerSOS = () => {
    alert("🚨 SOS EMERGENCY TRIGGERED! Immediate distress signal and live location broadcasting to authority dispatch.");
  };

  // --- FAKE CALL LOGIC ---
  const [callState, setCallState] = useState<"idle" | "waiting" | "ringing">("idle");

  const triggerFakeCall = () => {
    setCallState("waiting");
    // Wait 5 seconds, then "ring"
    setTimeout(() => {
      setCallState("ringing");
      // Trigger device vibration if supported by browser
      if (typeof window !== "undefined" && navigator.vibrate) {
        navigator.vibrate([500, 500, 500, 500, 500]);
      }
    }, 5000);
  };

  // --- HOLD UNTIL SAFE LOGIC ---
  const [holdState, setHoldState] = useState<"idle" | "holding" | "countdown" | "dispatched">("idle");
  const [countdown, setCountdown] = useState(10);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = () => setHoldState("holding");
  
  const releaseHold = () => {
    if (holdState === "holding") {
      setHoldState("countdown");
      setCountdown(10);
    }
  };

  const cancelEmergency = () => {
    setHoldState("idle");
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (holdState === "countdown") {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setHoldState("dispatched");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [holdState]);

  return (
    <div className="space-y-6">
      
      {/* --- PROMINENT SOS EMERGENCY BUTTON --- */}
      <div className="bg-red-950/80 border-2 border-red-600 rounded-xl p-4 flex items-center justify-between shadow-2xl animate-pulse">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-3 rounded-full text-white">
            <AlertOctagon className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white tracking-wide">EMERGENCY SOS</h2>
            <p className="text-xs text-red-200">Tap instantly to alert local authorities & send your live location.</p>
          </div>
        </div>
        <button
          onClick={triggerSOS}
          className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3 rounded-lg shadow-lg tracking-wider text-sm transition-transform active:scale-95 cursor-pointer"
        >
          SOS ACTIVE
        </button>
      </div>

      {/* FULL SCREEN FAKE CALL MODAL */}
      {callState === "ringing" && (
        <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center animate-pulse">
          <div className="h-32 w-32 bg-slate-800 rounded-full flex items-center justify-center mb-8">
            <Phone className="h-16 w-16 text-white animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Hotel Security</h1>
          <p className="text-slate-400 text-lg mb-12">Incoming Call...</p>
          <div className="flex gap-12">
            <button 
              onClick={() => setCallState("idle")}
              className="h-20 w-20 bg-red-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.5)]"
            >
              <Phone className="h-8 w-8 text-white rotate-[135deg]" />
            </button>
            <button 
              onClick={() => setCallState("idle")}
              className="h-20 w-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
              <Phone className="h-8 w-8 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* DASHBOARD WIDGETS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Fake Call Widget */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col items-center text-center space-y-3">
          <div className="bg-blue-500/20 p-3 rounded-full">
            <Phone className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="font-bold text-white">Discreet Escape</h3>
          <p className="text-xs text-slate-400">Feeling uncomfortable? Trigger a fake incoming call to excuse yourself.</p>
          <button 
            onClick={triggerFakeCall}
            disabled={callState !== "idle"}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
          >
            {callState === "waiting" ? "Call arriving in 5s..." : "Trigger Fake Call"}
          </button>
        </div>

        {/* Hold Until Safe Widget */}
        <div className={`border rounded-xl p-5 flex flex-col items-center text-center space-y-3 transition-colors ${holdState === "countdown" ? "bg-red-950/50 border-red-500" : holdState === "dispatched" ? "bg-red-600 border-red-500" : "bg-slate-900 border-slate-800"}`}>
          
          {holdState === "idle" || holdState === "holding" ? (
            <>
              <div className="bg-rose-500/20 p-3 rounded-full">
                <ShieldAlert className="h-6 w-6 text-rose-400" />
              </div>
              <h3 className="font-bold text-white">Hold Until Safe</h3>
              <p className="text-xs text-slate-400">Hold this button in dark areas. Release to trigger a 10s emergency dispatch timer.</p>
              <button 
                onMouseDown={startHold}
                onMouseUp={releaseHold}
                onTouchStart={startHold}
                onTouchEnd={releaseHold}
                className={`w-full py-2 rounded-lg font-medium transition select-none ${holdState === "holding" ? "bg-rose-600 scale-95" : "bg-rose-500 hover:bg-rose-600"} text-white`}
              >
                {holdState === "holding" ? "Keep Holding..." : "Press & Hold"}
              </button>
            </>
          ) : holdState === "countdown" ? (
            <>
              <AlertTriangle className="h-10 w-10 text-red-500 animate-pulse" />
              <h3 className="font-bold text-white text-xl">Auto-Dispatching in {countdown}s</h3>
              <button onClick={cancelEmergency} className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg flex justify-center items-center gap-2">
                <X className="h-4 w-4" /> Cancel 
              </button>
            </>
          ) : (
            <>
              <ShieldAlert className="h-12 w-12 text-white" />
              <h3 className="font-bold text-white text-xl">AUTHORITIES DISPATCHED</h3>
              <p className="text-sm text-white/80">Help is routed to your live GPS location.</p>
              <button onClick={cancelEmergency} className="mt-2 bg-white text-red-600 px-4 py-1 rounded-lg text-sm font-bold">Reset Demo</button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
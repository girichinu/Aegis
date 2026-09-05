"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, Users, Radio, CheckCircle, AlertTriangle, Clock, Camera } from "lucide-react";

export default function AuthorityDashboard() {
  // Added <any[]> to prevent TypeScript from being overly strict about the new photoData property
  const [alerts, setAlerts] = useState<any[]>([
    { id: "SOS-092", user: "Alex Explorer", location: "Chikkabanavara Stn", time: "2 mins ago", type: "Emergency SOS", status: "Critical", details: "", hasPhoto: false, photoData: null },
    { id: "INC-405", user: "Sarah Jenkins", location: "100 ft Road", time: "14 mins ago", type: "Suspicious Activity", status: "Pending", details: "Saw someone checking car handles.", hasPhoto: false, photoData: null },
  ]);

  useEffect(() => {
    const savedAlerts = JSON.parse(localStorage.getItem("aegis_alerts") || "[]");
    if (savedAlerts.length > 0) {
      setAlerts((prevAlerts) => [...savedAlerts, ...prevAlerts]);
    }
  }, []);

  const handleStatClick = (statName: string) => window.alert(`📊 Loading records for ${statName}...`);
  const handleViewDetails = (user: string) => window.alert(`📂 Fetching Aegis Dossier and Photo Evidence for ${user}...`);
  
  const handleDispatch = (id: string) => {
    window.alert(`🚓 PRIORITY OVERRIDE: Local police unit dispatched to incident ${id}!`);
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: "Dispatched" } : a));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans p-6">
      <nav className="bg-white rounded-2xl shadow-sm border border-slate-200 px-6 py-4 flex items-center justify-between mb-8">
        <div className="flex items-center gap-3 text-blue-800 font-extrabold text-2xl tracking-tight">
          <ShieldAlert className="h-8 w-8 text-red-600" />
          <span>Aegis Command Center</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-sm font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
            System Active
          </span>
          <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600">HQ</div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Live Overview</h3>
            <div className="space-y-4">
              <div onClick={() => handleStatClick("Active Tourists")} className="cursor-pointer hover:scale-105 transition-transform flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
                <div className="flex items-center gap-3"><Users className="text-blue-600 h-5 w-5"/> <span className="font-semibold text-slate-700">Active Tourists</span></div>
                <span className="font-extrabold text-blue-700 text-lg">1,204</span>
              </div>
              <div onClick={() => handleStatClick("Active SOS Signals")} className="cursor-pointer hover:scale-105 transition-transform flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100 shadow-sm">
                <div className="flex items-center gap-3"><Radio className="text-red-600 h-5 w-5"/> <span className="font-semibold text-slate-700">Active SOS Signals</span></div>
                <span className="font-extrabold text-red-700 text-lg">1</span>
              </div>
              <div onClick={() => handleStatClick("Pending Incidents")} className="cursor-pointer hover:scale-105 transition-transform flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-100 shadow-sm">
                <div className="flex items-center gap-3"><AlertTriangle className="text-amber-600 h-5 w-5"/> <span className="font-semibold text-slate-700">Pending Incidents</span></div>
                <span className="font-extrabold text-amber-700 text-lg">4</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Real-Time Incident Queue</h3>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className={`p-5 rounded-xl border-l-4 shadow-sm flex flex-col transition-all hover:shadow-md 
                  ${alert.status === 'Critical' ? 'bg-red-50 border-red-600' : 
                    alert.status === 'Dispatched' ? 'bg-green-50 border-green-500' : 'bg-slate-50 border-amber-500'}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide 
                          ${alert.status === 'Critical' ? 'bg-red-200 text-red-800' : 
                            alert.status === 'Dispatched' ? 'bg-green-200 text-green-800' : 'bg-amber-200 text-amber-800'}`}
                        >
                          {alert.status === 'Dispatched' ? 'Resolved' : alert.type}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="h-3 w-3"/> {alert.time}</span>
                        {alert.hasPhoto && <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-md flex items-center gap-1"><Camera className="h-3 w-3"/> Photo Attached</span>}
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">{alert.user}</h4>
                      <p className="text-sm font-semibold text-slate-600 mt-1">Location: {alert.location}</p>
                    </div>
                    
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => handleViewDetails(alert.user)} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                        View Details
                      </button>
                      {alert.status !== 'Dispatched' ? (
                        <button onClick={() => handleDispatch(alert.id)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
                          <CheckCircle className="h-4 w-4"/> Dispatch
                        </button>
                      ) : (
                        <button disabled className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold flex items-center gap-2 opacity-50 cursor-not-allowed">
                          <CheckCircle className="h-4 w-4"/> Dispatched
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Shows your custom description */}
                  {alert.details && (
                    <div className="mt-4 p-3 bg-white/60 rounded-lg border border-slate-200/50">
                      <p className="text-sm text-slate-700 italic">"{alert.details}"</p>
                    </div>
                  )}

                  {/* Shows the actual uploaded photo */}
                  {alert.photoData && (
                    <div className="mt-3">
                      <img src={alert.photoData} alt="Incident Evidence" className="h-40 w-auto object-cover rounded-lg border-2 border-slate-200 shadow-sm" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
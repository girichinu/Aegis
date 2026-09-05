"use client";

import { QRCodeSVG } from 'qrcode.react';
import { Activity, Phone, ShieldCheck } from 'lucide-react';

export default function TouristIdCard() {
  // Mock data for the ID card (we will connect this to a database later)
  const touristData = {
    name: "Alex Explorer",
    id: "T-847592",
    bloodGroup: "O+",
    emergencyContact: "+1 234 567 8900",
  };

  // The URL authorities go to when they scan the QR code
  const verifyUrl = `https://aegis-travel.com/verify/${touristData.id}`;

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 mt-12 hover:shadow-2xl transition-shadow duration-300">
      {/* Card Header */}
      <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6" />
          <span className="font-bold text-lg tracking-wide">Verified Tourist ID</span>
        </div>
        <span className="text-blue-200 text-sm font-mono">{touristData.id}</span>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-1">{touristData.name}</h2>
            <p className="text-xs font-bold text-green-700 bg-green-100 uppercase tracking-wider inline-block px-2 py-1 rounded-md mb-4 border border-green-200">
              Status: Safe & Active
            </p>
            
            <div className="space-y-3 mt-2">
              <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-2 rounded-lg">
                <Activity className="h-5 w-5 text-red-500" />
                <span className="text-sm">Blood: <strong className="text-slate-900">{touristData.bloodGroup}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-2 rounded-lg">
                <Phone className="h-5 w-5 text-blue-500" />
                <span className="text-sm">Emergency: <strong className="text-slate-900">{touristData.emergencyContact}</strong></span>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="bg-slate-50 p-3 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center gap-2">
            <QRCodeSVG value={verifyUrl} size={90} fgColor="#0f172a" />
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Scan to Verify</span>
          </div>
        </div>
      </div>
    </div>
  );
}
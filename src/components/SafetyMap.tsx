"use client";

import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useMemo } from 'react';

export default function SafetyMap() {
  // Local coordinates configured for testing
  const userLocation: [number, number] = [13.0827, 77.5036]; 
  const safeZone: [number, number] = [13.0860, 77.5080];
  const dangerZone: [number, number] = [13.0750, 77.4950];

  // THE FIX: We wrap the map pin in a useMemo hook inside the component. 
  // Now it will strictly wait for the browser to exist before drawing!
  const customMarker = useMemo(() => {
    return L.divIcon({
      className: 'custom-icon',
      html: `<div style="background-color: #2563EB; width: 24px; height: 24px; border-radius: 50%; border: 4px solid white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-16 rounded-3xl overflow-hidden shadow-xl border-4 border-white h-[450px] relative z-0">
      <MapContainer 
        center={userLocation} 
        zoom={14} 
        scrollWheelZoom={false} 
        className="h-full w-full z-0"
      >
        {/* Reliable, free OpenStreetMap tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User Location Pin */}
        <Marker position={userLocation} icon={customMarker}>
          <Popup className="font-sans font-bold text-slate-800">
            You are here <br/> <span className="text-green-600 font-normal">Secure Network</span>
          </Popup>
        </Marker>

        {/* Green Safe Zone Indicator */}
        <Circle 
          center={safeZone} 
          pathOptions={{ color: '#059669', fillColor: '#10B981', fillOpacity: 0.2, weight: 2 }} 
          radius={500}
        >
          <Popup>Verified Safe Haven (Police presence active)</Popup>
        </Circle>

        {/* Red Danger Zone Indicator */}
        <Circle 
          center={dangerZone} 
          pathOptions={{ color: '#DC2626', fillColor: '#EF4444', fillOpacity: 0.2, weight: 2 }} 
          radius={600}
        >
          <Popup>Caution: High Incident Area (Avoid after dark)</Popup>
        </Circle>
      </MapContainer>
    </div>
  );
}
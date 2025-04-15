import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Pothole {
  timestamp: string;
  latitude: number;
  longitude: number;
}

interface PotholeMapProps {
  potholes: Pothole[];
  deviceLocation: { latitude: number; longitude: number } | null;
}

export function PotholeMap({ potholes, deviceLocation }: PotholeMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);
  const deviceMarkerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Initialize map centered on Islamabad
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [33.6844, 73.0479], // Islamabad coordinates
      zoom: 13,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update device location marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !deviceLocation) return;

    if (deviceMarkerRef.current) {
      deviceMarkerRef.current.remove();
    }

    // Custom device icon
    const deviceIcon = L.divIcon({
      className: 'device-marker',
      html: '<div class="device-dot"></div>',
      iconSize: [20, 20],
    });

    const marker = L.marker([deviceLocation.latitude, deviceLocation.longitude], {
      icon: deviceIcon,
    }).addTo(map);

    marker.bindPopup('Detection Device');
    deviceMarkerRef.current = marker;

    // Center map on device location
    map.setView([deviceLocation.latitude, deviceLocation.longitude], 15);
  }, [deviceLocation]);

  // Update pothole markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    potholes.forEach(pothole => {
      const marker = L.circleMarker([pothole.latitude, pothole.longitude], {
        radius: 8,
        fillColor: '#ff0000',
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map);

      marker.bindPopup(`
        Pothole detected<br>
        ${new Date(pothole.timestamp).toLocaleString()}
      `);

      markersRef.current.push(marker);
    });
  }, [potholes]);

  return (
    <div ref={mapContainerRef} style={{ height: '400px', width: '100%' }} className="rounded-lg overflow-hidden border" />
  );
}

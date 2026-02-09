import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon in React Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface RoutePoint {
  latitude: number;
  longitude: number;
  timestamp: Date;
}

interface TruckMapData {
  id: string;
  name: string;
  currentPosition: {
    latitude: number;
    longitude: number;
  };
  route: RoutePoint[];
  status: "normal" | "warning" | "danger";
}

interface TruckMapProps {
  trucks: TruckMapData[];
  selectedTruckId?: string;
}

// Component to recenter map when selected truck changes
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
}

export default function TruckMap({ trucks, selectedTruckId }: TruckMapProps) {
  // Custom truck icons based on status
  const getTruckIcon = (status: string, isSelected: boolean) => {
    let color = "#22c55e"; // green
    if (status === "warning") color = "#eab308"; // yellow
    if (status === "danger") color = "#ef4444"; // red

    const size = isSelected ? 40 : 30;

    return L.divIcon({
      html: `
        <div style="
          background-color: ${color};
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${size - 10}px;
          ${isSelected ? "animation: pulse 2s infinite;" : ""}
        ">
          🚚
        </div>
        <style>
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        </style>
      `,
      className: "truck-marker",
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  const getRouteColor = (status: string) => {
    if (status === "danger") return "#ef4444";
    if (status === "warning") return "#eab308";
    return "#3b82f6";
  };

  // Find selected truck or use first truck as default center
  const selectedTruck =
    trucks.find((t) => t.id === selectedTruckId) || trucks[0];
  const center: [number, number] = selectedTruck
    ? [
        selectedTruck.currentPosition.latitude,
        selectedTruck.currentPosition.longitude,
      ]
    : [-3.8333, 103.9333]; // Muara Enim, Sumatera Selatan

  if (trucks.length === 0) {
    return (
      <div className="w-full h-125 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Tidak ada data truk</p>
      </div>
    );
  }

  return (
    <div className="w-full h-125 rounded-lg overflow-hidden shadow-lg relative z-0">
      <MapContainer
        center={center}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <MapController center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {trucks.map((truck) => {
          const isSelected = truck.id === selectedTruckId;

          return (
            <div key={truck.id}>
              {/* Draw route polyline */}
              {truck.route.length > 0 && (
                <Polyline
                  positions={truck.route.map((point) => [
                    point.latitude,
                    point.longitude,
                  ])}
                  color={getRouteColor(truck.status)}
                  weight={isSelected ? 4 : 2}
                  opacity={isSelected ? 0.8 : 0.5}
                  dashArray={isSelected ? undefined : "10, 10"}
                />
              )}

              {/* Marker for current position */}
              <Marker
                position={[
                  truck.currentPosition.latitude,
                  truck.currentPosition.longitude,
                ]}
                icon={getTruckIcon(truck.status, isSelected)}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-bold text-gray-800">{truck.id}</p>
                    <p className="text-gray-600">{truck.name}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Lat: {truck.currentPosition.latitude.toFixed(6)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Lng: {truck.currentPosition.longitude.toFixed(6)}
                    </p>
                    <div className="mt-2">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          truck.status === "normal"
                            ? "bg-green-100 text-green-800"
                            : truck.status === "warning"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {truck.status === "normal"
                          ? "Normal"
                          : truck.status === "warning"
                            ? "Peringatan"
                            : "Bahaya"}
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </div>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg z-1000">
        <p className="text-xs font-bold text-gray-700 mb-2">Keterangan:</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Normal</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-600">Peringatan</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">Bahaya</span>
          </div>
          <div className="flex items-center gap-2 text-xs mt-2 pt-2 border-t">
            <div className="w-8 h-0.5 bg-blue-500"></div>
            <span className="text-gray-600">Rute hari ini</span>
          </div>
        </div>
      </div>
    </div>
  );
}

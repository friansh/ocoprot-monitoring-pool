import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TruckMap from "../../components/TruckMap";
import { generateRouteHistory } from "../../utils/routeGenerator";
import {
  TruckIcon,
  MapPinIcon,
  BellAlertIcon,
  ClockIcon,
  SignalIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

interface RoutePoint {
  latitude: number;
  longitude: number;
  timestamp: Date;
}

interface TruckData {
  id: string;
  name: string;
  driver: string;
  route: RoutePoint[]; // rute yang telah dilalui hari ini
  gps: {
    latitude: number;
    longitude: number;
    speed: number; // km/h
    heading: number; // degrees
  };
  tilt: {
    pitch: number; // degrees (depan-belakang)
    roll: number; // degrees (kiri-kanan)
  };
  sos: {
    active: boolean;
    timestamp?: Date;
  };
  fuel: {
    level: number; // percentage 0-100
    capacity: number; // liters
    consumption: number; // liters per hour
  };
  tirePressure: {
    frontLeft: number; // PSI
    frontRight: number; // PSI
    rearLeft: number; // PSI
    rearRight: number; // PSI
    optimal: number; // PSI (optimal pressure)
  };
  drowsinessDetection: {
    status: "alert" | "drowsy" | "critical"; // driver status
    eyeClosureRate: number; // percentage 0-100
    yawnCount: number; // yawns detected in last 5 minutes
    lastAlert?: Date;
  };
  alarms: {
    speed: boolean; // overspeed alert
    workTime: boolean; // overtime alert
    tilt: boolean; // dangerous tilt
    fuel: boolean; // low fuel alert
    tirePressure: boolean; // tire pressure alert
    drowsiness: boolean; // drowsiness alert
  };
  workTime: {
    startTime: Date;
    duration: number; // minutes
    maxDuration: number; // minutes (8 hours = 480)
  };
  status: "normal" | "warning" | "danger";
  lastUpdate: Date;
}

export default function Truck() {
  const [trucks, setTrucks] = useState<TruckData[]>([
    {
      id: "TRK-001",
      name: "Dump Truck HD785-7",
      driver: "Budi Santoso",
      route: generateRouteHistory(-3.852, 103.918, -3.8289, 103.9349),
      gps: {
        latitude: -3.8289,
        longitude: 103.9349,
        speed: 35,
        heading: 145,
      },
      tilt: {
        pitch: 8,
        roll: 3,
      },
      fuel: {
        level: 75,
        capacity: 450,
        consumption: 25,
      },
      tirePressure: {
        frontLeft: 105,
        frontRight: 108,
        rearLeft: 110,
        rearRight: 107,
        optimal: 110,
      },
      drowsinessDetection: {
        status: "alert",
        eyeClosureRate: 15,
        yawnCount: 0,
      },
      sos: {
        active: false,
      },
      alarms: {
        speed: false,
        workTime: false,
        tilt: false,
        fuel: false,
        tirePressure: false,
        drowsiness: false,
      },
      workTime: {
        startTime: new Date(Date.now() - 4.5 * 60 * 60 * 1000), // 4.5 hours ago
        duration: 270,
        maxDuration: 480,
      },
      status: "normal",
      lastUpdate: new Date(),
    },
    {
      id: "TRK-002",
      name: "Dump Truck CAT797F",
      driver: "Ahmad Hidayat",
      route: generateRouteHistory(-3.848, 103.94, -3.8312, 103.9278),
      gps: {
        latitude: -3.8312,
        longitude: 103.9278,
        speed: 52,
        heading: 230,
      },
      tilt: {
        pitch: 12,
        roll: 5,
      },
      fuel: {
        level: 28,
        capacity: 500,
        consumption: 30,
      },
      tirePressure: {
        frontLeft: 95,
        frontRight: 98,
        rearLeft: 92,
        rearRight: 90,
        optimal: 110,
      },
      drowsinessDetection: {
        status: "drowsy",
        eyeClosureRate: 45,
        yawnCount: 3,
        lastAlert: new Date(Date.now() - 3 * 60 * 1000),
      },
      sos: {
        active: false,
      },
      alarms: {
        speed: true, // overspeed
        workTime: false,
        tilt: false,
        fuel: true, // low fuel
        tirePressure: true, // low pressure
        drowsiness: true, // drowsy
      },
      workTime: {
        startTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
        duration: 360,
        maxDuration: 480,
      },
      status: "warning",
      lastUpdate: new Date(),
    },
    {
      id: "TRK-003",
      name: "Dump Truck Komatsu HD605",
      driver: "Joko Widodo",
      route: generateRouteHistory(-3.85, 103.928, -3.8334, 103.9401),
      gps: {
        latitude: -3.8334,
        longitude: 103.9401,
        speed: 28,
        heading: 90,
      },
      tilt: {
        pitch: 22,
        roll: 18,
      },
      fuel: {
        level: 15,
        capacity: 420,
        consumption: 28,
      },
      tirePressure: {
        frontLeft: 110,
        frontRight: 108,
        rearLeft: 65,
        rearRight: 112,
        optimal: 110,
      },
      drowsinessDetection: {
        status: "critical",
        eyeClosureRate: 75,
        yawnCount: 8,
        lastAlert: new Date(Date.now() - 30 * 1000),
      },
      sos: {
        active: true,
        timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      },
      alarms: {
        speed: false,
        workTime: false,
        tilt: true, // dangerous tilt
        fuel: true, // critical fuel
        tirePressure: true, // critical tire
        drowsiness: true, // critical drowsiness
      },
      workTime: {
        startTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
        duration: 180,
        maxDuration: 480,
      },
      status: "danger",
      lastUpdate: new Date(),
    },
    {
      id: "TRK-004",
      name: "Dump Truck Volvo A60H",
      driver: "Siti Nurhaliza",
      route: generateRouteHistory(-3.853, 103.924, -3.8298, 103.9365),
      gps: {
        latitude: -3.8298,
        longitude: 103.9365,
        speed: 42,
        heading: 315,
      },
      tilt: {
        pitch: 6,
        roll: 2,
      },
      fuel: {
        level: 45,
        capacity: 480,
        consumption: 27,
      },
      tirePressure: {
        frontLeft: 109,
        frontRight: 111,
        rearLeft: 108,
        rearRight: 110,
        optimal: 110,
      },
      drowsinessDetection: {
        status: "alert",
        eyeClosureRate: 20,
        yawnCount: 1,
      },
      sos: {
        active: false,
      },
      alarms: {
        speed: false,
        workTime: true, // overtime
        tilt: false,
        fuel: false,
        tirePressure: false,
        drowsiness: false,
      },
      workTime: {
        startTime: new Date(Date.now() - 8.5 * 60 * 60 * 1000),
        duration: 510, // over 8 hours
        maxDuration: 480,
      },
      status: "warning",
      lastUpdate: new Date(),
    },
  ]);

  const [selectedTruck, setSelectedTruck] = useState<TruckData | null>(
    trucks[0],
  );

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks((prevTrucks) =>
        prevTrucks.map((truck) => {
          // Simulate speed changes
          const speedChange = (Math.random() - 0.5) * 5;
          const newSpeed = Math.max(
            0,
            Math.min(60, truck.gps.speed + speedChange),
          );

          // Simulate GPS position changes (slight movement)
          const latChange = (Math.random() - 0.5) * 0.0005;
          const lngChange = (Math.random() - 0.5) * 0.0005;
          const newLat = truck.gps.latitude + latChange;
          const newLng = truck.gps.longitude + lngChange;

          // Add new point to route if position changed significantly
          const newRoute = [...truck.route];
          const lastPoint = newRoute[newRoute.length - 1];
          if (
            lastPoint &&
            (Math.abs(lastPoint.latitude - newLat) > 0.0003 ||
              Math.abs(lastPoint.longitude - newLng) > 0.0003)
          ) {
            newRoute.push({
              latitude: newLat,
              longitude: newLng,
              timestamp: new Date(),
            });
            // Keep only last 30 points
            if (newRoute.length > 30) {
              newRoute.shift();
            }
          }

          // Simulate tilt changes
          const pitchChange = (Math.random() - 0.5) * 2;
          const rollChange = (Math.random() - 0.5) * 2;
          const newPitch = Math.max(
            -30,
            Math.min(30, truck.tilt.pitch + pitchChange),
          );
          const newRoll = Math.max(
            -30,
            Math.min(30, truck.tilt.roll + rollChange),
          );

          // Update work time
          const workDuration =
            (Date.now() - truck.workTime.startTime.getTime()) / (1000 * 60);

          // Simulate fuel consumption (decreases slowly)
          const fuelDecrease = (truck.fuel.consumption / 3600) * 2; // consumption per 2 seconds
          const newFuelLevel = Math.max(0, truck.fuel.level - fuelDecrease);

          // Simulate tire pressure changes (random small variations)
          const tirePressure = {
            frontLeft: Math.max(
              60,
              Math.min(
                120,
                truck.tirePressure.frontLeft + (Math.random() - 0.5) * 2,
              ),
            ),
            frontRight: Math.max(
              60,
              Math.min(
                120,
                truck.tirePressure.frontRight + (Math.random() - 0.5) * 2,
              ),
            ),
            rearLeft: Math.max(
              60,
              Math.min(
                120,
                truck.tirePressure.rearLeft + (Math.random() - 0.5) * 2,
              ),
            ),
            rearRight: Math.max(
              60,
              Math.min(
                120,
                truck.tirePressure.rearRight + (Math.random() - 0.5) * 2,
              ),
            ),
            optimal: truck.tirePressure.optimal,
          };

          // Simulate drowsiness detection (changes based on work time)
          const eyeClosureRate = Math.max(
            10,
            Math.min(
              90,
              truck.drowsinessDetection.eyeClosureRate +
                (Math.random() - 0.4) * 5,
            ),
          );
          const yawnCount =
            eyeClosureRate > 60
              ? Math.min(
                  10,
                  truck.drowsinessDetection.yawnCount +
                    (Math.random() > 0.8 ? 1 : 0),
                )
              : Math.max(
                  0,
                  truck.drowsinessDetection.yawnCount -
                    (Math.random() > 0.9 ? 1 : 0),
                );

          let drowsinessStatus: "alert" | "drowsy" | "critical" = "alert";
          if (eyeClosureRate > 60 || yawnCount > 5) {
            drowsinessStatus = "critical";
          } else if (eyeClosureRate > 40 || yawnCount > 2) {
            drowsinessStatus = "drowsy";
          }

          // Check alarms
          const speedAlarm = newSpeed > 50; // Speed limit 50 km/h
          const tiltAlarm = Math.abs(newPitch) > 20 || Math.abs(newRoll) > 15;
          const workTimeAlarm = workDuration > truck.workTime.maxDuration;
          const fuelAlarm = newFuelLevel < 20; // low fuel below 20%
          const tirePressureAlarm =
            tirePressure.frontLeft < 90 ||
            tirePressure.frontRight < 90 ||
            tirePressure.rearLeft < 90 ||
            tirePressure.rearRight < 90;
          const drowsinessAlarm = drowsinessStatus !== "alert";

          // Determine status
          let status: "normal" | "warning" | "danger" = "normal";
          if (truck.sos.active) {
            status = "danger";
          } else if (
            tiltAlarm ||
            drowsinessStatus === "critical" ||
            newFuelLevel < 10
          ) {
            status = "danger";
          } else if (
            speedAlarm ||
            workTimeAlarm ||
            fuelAlarm ||
            tirePressureAlarm ||
            drowsinessAlarm
          ) {
            status = "warning";
          }

          return {
            ...truck,
            route: newRoute,
            gps: {
              ...truck.gps,
              latitude: newLat,
              longitude: newLng,
              speed: newSpeed,
            },
            tilt: {
              pitch: newPitch,
              roll: newRoll,
            },
            fuel: {
              ...truck.fuel,
              level: newFuelLevel,
            },
            tirePressure,
            drowsinessDetection: {
              status: drowsinessStatus,
              eyeClosureRate,
              yawnCount,
              lastAlert:
                drowsinessAlarm && drowsinessStatus === "critical"
                  ? new Date()
                  : truck.drowsinessDetection.lastAlert,
            },
            alarms: {
              speed: speedAlarm,
              workTime: workTimeAlarm,
              tilt: tiltAlarm,
              fuel: fuelAlarm,
              tirePressure: tirePressureAlarm,
              drowsiness: drowsinessAlarm,
            },
            workTime: {
              ...truck.workTime,
              duration: workDuration,
            },
            status,
            lastUpdate: new Date(),
          };
        }),
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Update selected truck when trucks data changes
  useEffect(() => {
    if (selectedTruck) {
      const updated = trucks.find((t) => t.id === selectedTruck.id);
      if (updated) {
        setSelectedTruck(updated);
      }
    }
  }, [trucks]);

  const getTiltColor = (angle: number) => {
    const abs = Math.abs(angle);
    if (abs > 20) return "text-red-600";
    if (abs > 15) return "text-orange-600";
    if (abs > 10) return "text-yellow-600";
    return "text-green-600";
  };

  const getSpeedColor = (speed: number) => {
    if (speed > 50) return "text-red-600";
    if (speed > 45) return "text-yellow-600";
    return "text-green-600";
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return `${hours}j ${mins}m`;
  };

  const getWorkTimePercentage = (duration: number, maxDuration: number) => {
    return Math.min(100, (duration / maxDuration) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        title="Monitoring Truk Jarak Jauh"
        subtitle="Real-time GPS, Safety & Performance Monitoring"
      />

      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Truk</p>
                <p className="text-2xl font-bold text-gray-800">
                  {trucks.length}
                </p>
              </div>
              <TruckIcon className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Status Normal</p>
                <p className="text-2xl font-bold text-gray-800">
                  {trucks.filter((t) => t.status === "normal").length}
                </p>
              </div>
              <CheckCircleIcon className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Peringatan</p>
                <p className="text-2xl font-bold text-gray-800">
                  {trucks.filter((t) => t.status === "warning").length}
                </p>
              </div>
              <ExclamationTriangleIcon className="w-10 h-10 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bahaya/SOS</p>
                <p className="text-2xl font-bold text-gray-800">
                  {
                    trucks.filter((t) => t.status === "danger" || t.sos.active)
                      .length
                  }
                </p>
              </div>
              <BellAlertIcon className="w-10 h-10 text-red-500" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Truck List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TruckIcon className="w-5 h-5" />
                Daftar Truk
              </h2>
              <div className="space-y-2">
                {trucks.map((truck) => (
                  <div
                    key={truck.id}
                    onClick={() => setSelectedTruck(truck)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedTruck?.id === truck.id
                        ? "bg-blue-50 border-2 border-blue-500"
                        : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-800">
                            {truck.id}
                          </p>
                          {truck.sos.active && (
                            <span className="animate-pulse">
                              <BellAlertIcon className="w-5 h-5 text-red-600" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{truck.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          👤 {truck.driver}
                        </p>
                      </div>
                      <div>
                        {truck.status === "danger" && (
                          <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                        )}
                        {truck.status === "warning" && (
                          <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></span>
                        )}
                        {truck.status === "normal" && (
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                        )}
                      </div>
                    </div>

                    {/* Mini indicators */}
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {truck.alarms.speed && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                          ⚡ Kecepatan
                        </span>
                      )}
                      {truck.alarms.workTime && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                          ⏰ Waktu
                        </span>
                      )}
                      {truck.alarms.tilt && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                          ⚠️ Kemiringan
                        </span>
                      )}
                      {truck.alarms.fuel && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                          ⛽ Bahan Bakar
                        </span>
                      )}
                      {truck.alarms.tirePressure && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                          🛞 Tekanan Ban
                        </span>
                      )}
                      {truck.alarms.drowsiness && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                          😴 Kantuk
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-2 space-y-4">
            {selectedTruck && (
              <>
                {/* SOS Alert */}
                {selectedTruck.sos.active && (
                  <div className="bg-red-600 text-white rounded-lg shadow-lg p-6 animate-pulse">
                    <div className="flex items-center gap-4">
                      <BellAlertIcon className="w-12 h-12" />
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold">
                          ⚠️ TOMBOL SOS AKTIF!
                        </h3>
                        <p className="text-red-100 mt-1">
                          {selectedTruck.id} - {selectedTruck.driver}{" "}
                          membutuhkan bantuan darurat!
                        </p>
                        <p className="text-sm text-red-200 mt-2">
                          Sejak:{" "}
                          {selectedTruck.sos.timestamp?.toLocaleTimeString(
                            "id-ID",
                          )}
                        </p>
                      </div>
                      <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-red-50 transition-colors">
                        TANGGAPI
                      </button>
                    </div>
                  </div>
                )}

                {/* Truck Info Header */}
                <div className="bg-linear-to-r from-slate-700 to-slate-600 text-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedTruck.id}</h2>
                      <p className="text-slate-200 mt-1">
                        {selectedTruck.name}
                      </p>
                      <p className="text-slate-300 text-sm mt-2">
                        👤 Driver: {selectedTruck.driver}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-300">Update Terakhir</p>
                      <p className="font-semibold">
                        {selectedTruck.lastUpdate.toLocaleTimeString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map with Routes */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-blue-600" />
                    Peta & Rute Perjalanan Hari Ini
                  </h3>
                  <TruckMap
                    trucks={trucks.map((truck) => ({
                      id: truck.id,
                      name: truck.name,
                      currentPosition: {
                        latitude: truck.gps.latitude,
                        longitude: truck.gps.longitude,
                      },
                      route: truck.route,
                      status: truck.status,
                    }))}
                    selectedTruckId={selectedTruck.id}
                  />
                  <div className="mt-4 bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      💡 <strong>Tips:</strong> Klik marker truk untuk melihat
                      detail lokasi. Garis berwarna menunjukkan rute yang telah
                      dilalui sejak shift dimulai pagi ini.
                    </p>
                  </div>
                </div>

                {/* GPS Location */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-blue-600" />
                    Lokasi GPS
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Latitude</p>
                      <p className="text-xl font-bold text-gray-800">
                        {selectedTruck.gps.latitude.toFixed(6)}°
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Longitude</p>
                      <p className="text-xl font-bold text-gray-800">
                        {selectedTruck.gps.longitude.toFixed(6)}°
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Arah (Heading)</p>
                      <p className="text-xl font-bold text-gray-800">
                        {selectedTruck.gps.heading}°
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedTruck.gps.heading < 45 ||
                        selectedTruck.gps.heading >= 315
                          ? "Utara"
                          : selectedTruck.gps.heading < 135
                            ? "Timur"
                            : selectedTruck.gps.heading < 225
                              ? "Selatan"
                              : "Barat"}
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Sinyal GPS</p>
                      <div className="flex items-center gap-2 mt-1">
                        <SignalIcon className="w-5 h-5 text-green-600" />
                        <p className="text-lg font-bold text-green-600">Kuat</p>
                      </div>
                    </div>
                  </div>

                  {/* Google Maps Link */}
                  <a
                    href={`https://www.google.com/maps?q=${selectedTruck.gps.latitude},${selectedTruck.gps.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    🗺️ Buka di Google Maps
                  </a>
                </div>

                {/* Speed & Tilt */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Kecepatan */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <ArrowTrendingUpIcon className="w-5 h-5 text-purple-600" />
                      Kecepatan
                    </h3>
                    <div className="text-center">
                      <p
                        className={`text-5xl font-bold ${getSpeedColor(
                          selectedTruck.gps.speed,
                        )}`}
                      >
                        {selectedTruck.gps.speed.toFixed(1)}
                      </p>
                      <p className="text-gray-600 mt-2">km/h</p>

                      {/* Speed Limit Indicator */}
                      <div className="mt-4 bg-gray-100 rounded-lg p-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Batas Kecepatan</span>
                          <span className="font-bold">50 km/h</span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              selectedTruck.gps.speed > 50
                                ? "bg-red-500"
                                : selectedTruck.gps.speed > 45
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                            style={{
                              width: `${Math.min(
                                100,
                                (selectedTruck.gps.speed / 60) * 100,
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Alarm Kecepatan */}
                      {selectedTruck.alarms.speed && (
                        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                          <p className="text-red-700 font-bold text-sm flex items-center justify-center gap-2">
                            <ExclamationTriangleIcon className="w-5 h-5" />
                            ALARM: Kecepatan Berlebih!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Kemiringan */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      Kemiringan Truk
                    </h3>
                    <div className="space-y-4">
                      {/* Pitch (Depan-Belakang) */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">
                            Pitch (Depan-Belakang)
                          </span>
                          <span
                            className={`text-2xl font-bold ${getTiltColor(
                              selectedTruck.tilt.pitch,
                            )}`}
                          >
                            {selectedTruck.tilt.pitch.toFixed(1)}°
                          </span>
                        </div>
                        <div className="relative w-full bg-gray-200 rounded-full h-3">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-px h-full bg-gray-400"></div>
                          </div>
                          <div
                            className={`absolute h-full w-2 rounded-full ${
                              Math.abs(selectedTruck.tilt.pitch) > 20
                                ? "bg-red-500"
                                : Math.abs(selectedTruck.tilt.pitch) > 15
                                  ? "bg-orange-500"
                                  : Math.abs(selectedTruck.tilt.pitch) > 10
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                            }`}
                            style={{
                              left: `${
                                50 + (selectedTruck.tilt.pitch / 30) * 50
                              }%`,
                              transform: "translateX(-50%)",
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>-30°</span>
                          <span>0°</span>
                          <span>+30°</span>
                        </div>
                      </div>

                      {/* Roll (Kiri-Kanan) */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">
                            Roll (Kiri-Kanan)
                          </span>
                          <span
                            className={`text-2xl font-bold ${getTiltColor(
                              selectedTruck.tilt.roll,
                            )}`}
                          >
                            {selectedTruck.tilt.roll.toFixed(1)}°
                          </span>
                        </div>
                        <div className="relative w-full bg-gray-200 rounded-full h-3">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-px h-full bg-gray-400"></div>
                          </div>
                          <div
                            className={`absolute h-full w-2 rounded-full ${
                              Math.abs(selectedTruck.tilt.roll) > 20
                                ? "bg-red-500"
                                : Math.abs(selectedTruck.tilt.roll) > 15
                                  ? "bg-orange-500"
                                  : Math.abs(selectedTruck.tilt.roll) > 10
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                            }`}
                            style={{
                              left: `${
                                50 + (selectedTruck.tilt.roll / 30) * 50
                              }%`,
                              transform: "translateX(-50%)",
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>-30°</span>
                          <span>0°</span>
                          <span>+30°</span>
                        </div>
                      </div>

                      {/* Alarm Kemiringan */}
                      {selectedTruck.alarms.tilt && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <p className="text-red-700 font-bold text-sm flex items-center justify-center gap-2">
                            <ExclamationTriangleIcon className="w-5 h-5" />
                            ALARM: Kemiringan Berbahaya!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Fuel & Tire Pressure */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Bahan Bakar */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="text-2xl">⛽</span>
                      Bahan Bakar
                    </h3>
                    <div className="text-center">
                      <p
                        className={`text-5xl font-bold ${
                          selectedTruck.fuel.level < 10
                            ? "text-red-600"
                            : selectedTruck.fuel.level < 20
                              ? "text-orange-600"
                              : selectedTruck.fuel.level < 40
                                ? "text-yellow-600"
                                : "text-green-600"
                        }`}
                      >
                        {selectedTruck.fuel.level.toFixed(1)}%
                      </p>
                      <p className="text-gray-600 mt-2">
                        {(
                          (selectedTruck.fuel.level / 100) *
                          selectedTruck.fuel.capacity
                        ).toFixed(1)}{" "}
                        / {selectedTruck.fuel.capacity} Liter
                      </p>

                      {/* Fuel Tank Visualization */}
                      <div className="mt-4 bg-gray-100 rounded-lg p-4">
                        <div className="relative w-full h-32 bg-gray-300 rounded-lg overflow-hidden border-2 border-gray-400">
                          <div
                            className={`absolute bottom-0 w-full transition-all ${
                              selectedTruck.fuel.level < 10
                                ? "bg-red-500"
                                : selectedTruck.fuel.level < 20
                                  ? "bg-orange-500"
                                  : selectedTruck.fuel.level < 40
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                            }`}
                            style={{
                              height: `${selectedTruck.fuel.level}%`,
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/30"></div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Konsumsi: {selectedTruck.fuel.consumption} L/jam
                        </p>
                      </div>

                      {/* Fuel Alarm */}
                      {selectedTruck.alarms.fuel && (
                        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                          <p className="text-red-700 font-bold text-sm flex items-center justify-center gap-2">
                            <ExclamationTriangleIcon className="w-5 h-5" />
                            {selectedTruck.fuel.level < 10
                              ? "CRITICAL: Bahan Bakar Kritis!"
                              : "PERINGATAN: Bahan Bakar Rendah!"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tekanan Ban */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="text-2xl">🛞</span>
                      Tekanan Ban
                    </h3>
                    <div className="space-y-3">
                      {/* Front Tires */}
                      <div className="grid grid-cols-2 gap-3">
                        <div
                          className={`p-3 rounded-lg border-2 ${
                            selectedTruck.tirePressure.frontLeft <
                            selectedTruck.tirePressure.optimal * 0.85
                              ? "bg-red-50 border-red-300"
                              : selectedTruck.tirePressure.frontLeft <
                                  selectedTruck.tirePressure.optimal * 0.95
                                ? "bg-yellow-50 border-yellow-300"
                                : "bg-green-50 border-green-300"
                          }`}
                        >
                          <p className="text-xs text-gray-600">Depan Kiri</p>
                          <p className="text-xl font-bold text-gray-800">
                            {selectedTruck.tirePressure.frontLeft.toFixed(0)}
                          </p>
                          <p className="text-xs text-gray-500">PSI</p>
                        </div>
                        <div
                          className={`p-3 rounded-lg border-2 ${
                            selectedTruck.tirePressure.frontRight <
                            selectedTruck.tirePressure.optimal * 0.85
                              ? "bg-red-50 border-red-300"
                              : selectedTruck.tirePressure.frontRight <
                                  selectedTruck.tirePressure.optimal * 0.95
                                ? "bg-yellow-50 border-yellow-300"
                                : "bg-green-50 border-green-300"
                          }`}
                        >
                          <p className="text-xs text-gray-600">Depan Kanan</p>
                          <p className="text-xl font-bold text-gray-800">
                            {selectedTruck.tirePressure.frontRight.toFixed(0)}
                          </p>
                          <p className="text-xs text-gray-500">PSI</p>
                        </div>
                      </div>

                      {/* Rear Tires */}
                      <div className="grid grid-cols-2 gap-3">
                        <div
                          className={`p-3 rounded-lg border-2 ${
                            selectedTruck.tirePressure.rearLeft <
                            selectedTruck.tirePressure.optimal * 0.85
                              ? "bg-red-50 border-red-300"
                              : selectedTruck.tirePressure.rearLeft <
                                  selectedTruck.tirePressure.optimal * 0.95
                                ? "bg-yellow-50 border-yellow-300"
                                : "bg-green-50 border-green-300"
                          }`}
                        >
                          <p className="text-xs text-gray-600">Belakang Kiri</p>
                          <p className="text-xl font-bold text-gray-800">
                            {selectedTruck.tirePressure.rearLeft.toFixed(0)}
                          </p>
                          <p className="text-xs text-gray-500">PSI</p>
                        </div>
                        <div
                          className={`p-3 rounded-lg border-2 ${
                            selectedTruck.tirePressure.rearRight <
                            selectedTruck.tirePressure.optimal * 0.85
                              ? "bg-red-50 border-red-300"
                              : selectedTruck.tirePressure.rearRight <
                                  selectedTruck.tirePressure.optimal * 0.95
                                ? "bg-yellow-50 border-yellow-300"
                                : "bg-green-50 border-green-300"
                          }`}
                        >
                          <p className="text-xs text-gray-600">
                            Belakang Kanan
                          </p>
                          <p className="text-xl font-bold text-gray-800">
                            {selectedTruck.tirePressure.rearRight.toFixed(0)}
                          </p>
                          <p className="text-xs text-gray-500">PSI</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-sm text-blue-800">
                          ℹ️ Tekanan Optimal:{" "}
                          {selectedTruck.tirePressure.optimal} PSI
                        </p>
                      </div>

                      {/* Tire Alarm */}
                      {selectedTruck.alarms.tirePressure && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                          <p className="text-orange-700 font-bold text-sm flex items-center justify-center gap-2">
                            <ExclamationTriangleIcon className="w-5 h-5" />
                            Tekanan Ban Tidak Normal!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Drowsiness Detection Dashboard Camera */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📹</span>
                    Dashboard Camera - Deteksi Kantuk Driver
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Camera Feed Simulation */}
                    <div>
                      <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                        {/* Simulated Camera Frame */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="relative inline-block">
                              {/* Face placeholder */}
                              <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center text-6xl">
                                {selectedTruck.drowsinessDetection.status ===
                                "critical"
                                  ? "😴"
                                  : selectedTruck.drowsinessDetection.status ===
                                      "drowsy"
                                    ? "😪"
                                    : "😊"}
                              </div>
                              {/* Detection box */}
                              <div
                                className={`absolute inset-0 border-4 rounded-full ${
                                  selectedTruck.drowsinessDetection.status ===
                                  "critical"
                                    ? "border-red-500 animate-pulse"
                                    : selectedTruck.drowsinessDetection
                                          .status === "drowsy"
                                      ? "border-yellow-500"
                                      : "border-green-500"
                                }`}
                              ></div>
                            </div>
                            <p className="text-white mt-3 text-sm">
                              Driver: {selectedTruck.driver}
                            </p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-3 left-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              selectedTruck.drowsinessDetection.status ===
                              "critical"
                                ? "bg-red-500 text-white animate-pulse"
                                : selectedTruck.drowsinessDetection.status ===
                                    "drowsy"
                                  ? "bg-yellow-500 text-gray-900"
                                  : "bg-green-500 text-white"
                            }`}
                          >
                            {selectedTruck.drowsinessDetection.status ===
                            "critical"
                              ? "⚠️ CRITICAL"
                              : selectedTruck.drowsinessDetection.status ===
                                  "drowsy"
                                ? "⚠️ DROWSY"
                                : "✓ ALERT"}
                          </span>
                        </div>

                        {/* Recording Indicator */}
                        <div className="absolute top-3 right-3 flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                          <span className="text-white text-xs font-bold">
                            REC
                          </span>
                        </div>

                        {/* Timestamp */}
                        <div className="absolute bottom-3 left-3 bg-black/50 px-2 py-1 rounded">
                          <span className="text-white text-xs font-mono">
                            {new Date().toLocaleTimeString("id-ID")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Detection Stats */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">
                            Tingkat Penutupan Mata
                          </span>
                          <span
                            className={`text-xl font-bold ${
                              selectedTruck.drowsinessDetection.eyeClosureRate >
                              60
                                ? "text-red-600"
                                : selectedTruck.drowsinessDetection
                                      .eyeClosureRate > 40
                                  ? "text-yellow-600"
                                  : "text-green-600"
                            }`}
                          >
                            {selectedTruck.drowsinessDetection.eyeClosureRate.toFixed(
                              0,
                            )}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              selectedTruck.drowsinessDetection.eyeClosureRate >
                              60
                                ? "bg-red-500"
                                : selectedTruck.drowsinessDetection
                                      .eyeClosureRate > 40
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                            style={{
                              width: `${selectedTruck.drowsinessDetection.eyeClosureRate}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">
                            Deteksi Menguap
                          </span>
                          <span className="text-2xl font-bold text-gray-800">
                            {selectedTruck.drowsinessDetection.yawnCount}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          dalam 5 menit terakhir
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Status Driver
                          </span>
                          <span
                            className={`text-lg font-bold ${
                              selectedTruck.drowsinessDetection.status ===
                              "critical"
                                ? "text-red-600"
                                : selectedTruck.drowsinessDetection.status ===
                                    "drowsy"
                                  ? "text-yellow-600"
                                  : "text-green-600"
                            }`}
                          >
                            {selectedTruck.drowsinessDetection.status ===
                            "critical"
                              ? "KANTUK KRITIS"
                              : selectedTruck.drowsinessDetection.status ===
                                  "drowsy"
                                ? "MENGANTUK"
                                : "TERJAGA"}
                          </span>
                        </div>
                      </div>

                      {selectedTruck.drowsinessDetection.lastAlert && (
                        <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                          <p className="text-xs text-orange-700">
                            ⏰ Alert terakhir:{" "}
                            {selectedTruck.drowsinessDetection.lastAlert.toLocaleTimeString(
                              "id-ID",
                            )}
                          </p>
                        </div>
                      )}

                      {/* Drowsiness Alarm */}
                      {selectedTruck.alarms.drowsiness && (
                        <div
                          className={`rounded-lg p-4 border-2 ${
                            selectedTruck.drowsinessDetection.status ===
                            "critical"
                              ? "bg-red-50 border-red-500"
                              : "bg-yellow-50 border-yellow-500"
                          }`}
                        >
                          <p
                            className={`font-bold flex items-center gap-2 ${
                              selectedTruck.drowsinessDetection.status ===
                              "critical"
                                ? "text-red-700"
                                : "text-yellow-700"
                            }`}
                          >
                            <BellAlertIcon className="w-6 h-6" />
                            {selectedTruck.drowsinessDetection.status ===
                            "critical"
                              ? "ALARM KRITIS: Driver Sangat Mengantuk!"
                              : "PERINGATAN: Driver Menunjukkan Tanda Kantuk"}
                          </p>
                          <p
                            className={`text-sm mt-2 ${
                              selectedTruck.drowsinessDetection.status ===
                              "critical"
                                ? "text-red-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {selectedTruck.drowsinessDetection.status ===
                            "critical"
                              ? "Segera hentikan kendaraan dan istirahatkan driver!"
                              : "Sarankan driver untuk segera istirahat."}
                          </p>
                          <button
                            className={`mt-3 w-full py-2 rounded-lg font-medium transition-colors ${
                              selectedTruck.drowsinessDetection.status ===
                              "critical"
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-yellow-600 hover:bg-yellow-700 text-white"
                            }`}
                          >
                            Kirim Notifikasi ke Driver
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Work Time & Alarms */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-orange-600" />
                    Waktu Kerja & Istirahat
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Mulai Bekerja</span>
                      <span className="font-bold text-gray-800">
                        {selectedTruck.workTime.startTime.toLocaleTimeString(
                          "id-ID",
                        )}
                      </span>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Durasi Kerja</span>
                        <span className="font-bold text-gray-800">
                          {formatDuration(selectedTruck.workTime.duration)} /{" "}
                          {formatDuration(selectedTruck.workTime.maxDuration)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            selectedTruck.workTime.duration >
                            selectedTruck.workTime.maxDuration
                              ? "bg-red-500"
                              : selectedTruck.workTime.duration >
                                  selectedTruck.workTime.maxDuration * 0.9
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                          style={{
                            width: `${getWorkTimePercentage(
                              selectedTruck.workTime.duration,
                              selectedTruck.workTime.maxDuration,
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Batas maksimal: 8 jam kerja
                      </p>
                    </div>

                    {/* Alarm Istirahat */}
                    {selectedTruck.alarms.workTime && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <p className="text-orange-700 font-bold flex items-center gap-2">
                          <BellAlertIcon className="w-5 h-5" />
                          ALARM: Waktu Kerja Melebihi Batas!
                        </p>
                        <p className="text-orange-600 text-sm mt-2">
                          Driver {selectedTruck.driver} perlu istirahat segera.
                          Durasi kerja sudah melebihi 8 jam.
                        </p>
                        <button className="mt-3 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium">
                          Kirim Notifikasi Istirahat
                        </button>
                      </div>
                    )}

                    {/* Info Istirahat */}
                    {!selectedTruck.alarms.workTime &&
                      selectedTruck.workTime.duration >
                        selectedTruck.workTime.maxDuration * 0.75 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <p className="text-yellow-700 text-sm">
                            ⚠️ Waktu kerja mencapai{" "}
                            {Math.round(
                              getWorkTimePercentage(
                                selectedTruck.workTime.duration,
                                selectedTruck.workTime.maxDuration,
                              ),
                            )}
                            %. Segera persiapkan waktu istirahat.
                          </p>
                        </div>
                      )}
                  </div>
                </div>

                {/* Status SOS Button */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <BellAlertIcon className="w-5 h-5 text-red-600" />
                    Status Tombol SOS
                  </h3>
                  <div
                    className={`p-6 rounded-lg text-center ${
                      selectedTruck.sos.active
                        ? "bg-red-600 text-white"
                        : "bg-green-50 border-2 border-green-500"
                    }`}
                  >
                    {selectedTruck.sos.active ? (
                      <>
                        <BellAlertIcon className="w-16 h-16 mx-auto mb-3 animate-bounce" />
                        <p className="text-2xl font-bold">SOS AKTIF!</p>
                        <p className="mt-2">Membutuhkan bantuan darurat</p>
                        {selectedTruck.sos.timestamp && (
                          <p className="text-sm mt-2 text-red-100">
                            Aktif sejak:{" "}
                            {selectedTruck.sos.timestamp.toLocaleString(
                              "id-ID",
                            )}
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="w-16 h-16 mx-auto mb-3 text-green-600" />
                        <p className="text-2xl font-bold text-green-800">
                          SOS Tidak Aktif
                        </p>
                        <p className="text-green-600 mt-2">
                          Kondisi normal, tidak ada darurat
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
  FireIcon,
  BeakerIcon,
  SunIcon,
  CloudIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface RoomData {
  id: string;
  name: string;
  temperature: number;
  humidity: number;
  lightIntensity: number;
  dustPM25: number;
  co2: number;
  status: "normal" | "warning" | "danger";
}

// Standar Kesehatan Kantor Pertambangan (contoh)
const STANDARDS = {
  temperature: { min: 20, max: 28, unit: "°C", ideal: "20-28°C" },
  humidity: { min: 40, max: 70, unit: "%", ideal: "40-70%" },
  lightIntensity: { min: 300, max: 1000, unit: "lux", ideal: "300-1000 lux" },
  dustPM25: { min: 0, max: 35, unit: "µg/m³", ideal: "< 35 µg/m³" },
  co2: { min: 0, max: 1000, unit: "ppm", ideal: "< 1000 ppm" },
};

export default function OfficePage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [rooms, setRooms] = useState<RoomData[]>([
    {
      id: "1",
      name: "Ruang Kontrol Utama",
      temperature: 24.5,
      humidity: 55,
      lightIntensity: 450,
      dustPM25: 18,
      co2: 650,
      status: "normal",
    },
    {
      id: "2",
      name: "Ruang Meeting",
      temperature: 26.2,
      humidity: 62,
      lightIntensity: 520,
      dustPM25: 22,
      co2: 780,
      status: "normal",
    },
    {
      id: "3",
      name: "Area Kerja Administrasi",
      temperature: 25.8,
      humidity: 58,
      lightIntensity: 480,
      dustPM25: 28,
      co2: 720,
      status: "normal",
    },
    {
      id: "4",
      name: "Ruang Server",
      temperature: 22.1,
      humidity: 48,
      lightIntensity: 350,
      dustPM25: 15,
      co2: 580,
      status: "normal",
    },
  ]);

  const [tempHistory, setTempHistory] = useState({
    labels: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"],
    datasets: [
      {
        label: "Suhu Rata-rata",
        data: [23.5, 24.2, 24.8, 25.1, 25.5, 24.9],
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  });

  const [humidityHistory, setHumidityHistory] = useState({
    labels: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"],
    datasets: [
      {
        label: "Kelembapan Rata-rata",
        data: [52, 54, 56, 58, 60, 58],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  });

  // Check if value is within acceptable range
  const checkStatus = (
    value: number,
    min: number,
    max: number,
  ): "normal" | "warning" | "danger" => {
    const margin = (max - min) * 0.1; // 10% margin for warning
    if (value < min - margin || value > max + margin) return "danger";
    if (value < min || value > max) return "warning";
    return "normal";
  };

  // Update room status based on parameters
  const updateRoomStatus = (room: RoomData): RoomData => {
    const statuses = [
      checkStatus(
        room.temperature,
        STANDARDS.temperature.min,
        STANDARDS.temperature.max,
      ),
      checkStatus(
        room.humidity,
        STANDARDS.humidity.min,
        STANDARDS.humidity.max,
      ),
      checkStatus(
        room.lightIntensity,
        STANDARDS.lightIntensity.min,
        STANDARDS.lightIntensity.max,
      ),
      checkStatus(
        room.dustPM25,
        STANDARDS.dustPM25.min,
        STANDARDS.dustPM25.max,
      ),
      checkStatus(room.co2, STANDARDS.co2.min, STANDARDS.co2.max),
    ];

    const overallStatus = statuses.includes("danger")
      ? "danger"
      : statuses.includes("warning")
        ? "warning"
        : "normal";
    return { ...room, status: overallStatus };
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());

      // Update rooms with slight variations
      setRooms((prevRooms) =>
        prevRooms.map((room) => {
          const updated = {
            ...room,
            temperature: Math.max(
              18,
              Math.min(32, room.temperature + (Math.random() - 0.5) * 0.5),
            ),
            humidity: Math.max(
              30,
              Math.min(80, room.humidity + (Math.random() - 0.5) * 2),
            ),
            lightIntensity: Math.max(
              200,
              Math.min(1200, room.lightIntensity + (Math.random() - 0.5) * 20),
            ),
            dustPM25: Math.max(
              0,
              Math.min(50, room.dustPM25 + (Math.random() - 0.5) * 3),
            ),
            co2: Math.max(
              400,
              Math.min(1500, room.co2 + (Math.random() - 0.5) * 30),
            ),
          };
          return updateRoomStatus(updated);
        }),
      );

      // Update temperature history
      setTempHistory((prev) => {
        const now = new Date();
        const timeLabel = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        const newLabels = [...prev.labels, timeLabel];
        const avgTemp =
          rooms.reduce((sum, room) => sum + room.temperature, 0) / rooms.length;
        const newData = [...prev.datasets[0].data, Number(avgTemp.toFixed(1))];

        if (newLabels.length > 10) {
          newLabels.shift();
          newData.shift();
        }

        return {
          ...prev,
          labels: newLabels,
          datasets: [{ ...prev.datasets[0], data: newData }],
        };
      });

      // Update humidity history
      setHumidityHistory((prev) => {
        const now = new Date();
        const timeLabel = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        const newLabels = [...prev.labels, timeLabel];
        const avgHumidity =
          rooms.reduce((sum, room) => sum + room.humidity, 0) / rooms.length;
        const newData = [
          ...prev.datasets[0].data,
          Number(avgHumidity.toFixed(1)),
        ];

        if (newLabels.length > 10) {
          newLabels.shift();
          newData.shift();
        }

        return {
          ...prev,
          labels: newLabels,
          datasets: [{ ...prev.datasets[0], data: newData }],
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [rooms]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  // Calculate overall statistics
  const avgTemp =
    rooms.reduce((sum, room) => sum + room.temperature, 0) / rooms.length;
  const avgHumidity =
    rooms.reduce((sum, room) => sum + room.humidity, 0) / rooms.length;
  const avgLight =
    rooms.reduce((sum, room) => sum + room.lightIntensity, 0) / rooms.length;
  const avgDust =
    rooms.reduce((sum, room) => sum + room.dustPM25, 0) / rooms.length;
  const avgCO2 = rooms.reduce((sum, room) => sum + room.co2, 0) / rooms.length;

  const alertCount = rooms.filter(
    (room) => room.status === "warning" || room.status === "danger",
  ).length;
  const normalCount = rooms.filter((room) => room.status === "normal").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        title="Monitoring Iklim Kantor Pertambangan"
        subtitle="Sistem Pemantauan Kesehatan & Keselamatan Lingkungan Kerja"
      />

      <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-6">
        {/* Status Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 font-semibold text-sm">
                  Status Normal
                </p>
                <p className="text-3xl font-bold text-green-800 mt-1">
                  {normalCount}
                </p>
                <p className="text-xs text-green-600 mt-1">Ruangan</p>
              </div>
              <CheckCircleIcon className="h-12 w-12 text-green-500" />
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-700 font-semibold text-sm">
                  Peringatan Aktif
                </p>
                <p className="text-3xl font-bold text-yellow-800 mt-1">
                  {alertCount}
                </p>
                <p className="text-xs text-yellow-600 mt-1">Alert</p>
              </div>
              <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500" />
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 font-semibold text-sm">
                  Total Ruangan
                </p>
                <p className="text-3xl font-bold text-blue-800 mt-1">
                  {rooms.length}
                </p>
                <p className="text-xs text-blue-600 mt-1">Dipantau</p>
              </div>
              <BuildingOfficeIcon className="h-12 w-12 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Average Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Temperature */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-2">
              <FireIcon className="h-8 w-8 text-red-500" />
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  checkStatus(
                    avgTemp,
                    STANDARDS.temperature.min,
                    STANDARDS.temperature.max,
                  ) === "normal"
                    ? "bg-green-100 text-green-800"
                    : checkStatus(
                          avgTemp,
                          STANDARDS.temperature.min,
                          STANDARDS.temperature.max,
                        ) === "warning"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {checkStatus(
                  avgTemp,
                  STANDARDS.temperature.min,
                  STANDARDS.temperature.max,
                ) === "normal"
                  ? "Normal"
                  : checkStatus(
                        avgTemp,
                        STANDARDS.temperature.min,
                        STANDARDS.temperature.max,
                      ) === "warning"
                    ? "Warning"
                    : "Danger"}
              </span>
            </div>
            <p className="text-gray-600 text-sm font-medium">Suhu Rata-rata</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {avgTemp.toFixed(1)}°C
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Standar: {STANDARDS.temperature.ideal}
            </p>
          </div>

          {/* Humidity */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-2">
              <CloudIcon className="h-8 w-8 text-blue-500" />
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  checkStatus(
                    avgHumidity,
                    STANDARDS.humidity.min,
                    STANDARDS.humidity.max,
                  ) === "normal"
                    ? "bg-green-100 text-green-800"
                    : checkStatus(
                          avgHumidity,
                          STANDARDS.humidity.min,
                          STANDARDS.humidity.max,
                        ) === "warning"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {checkStatus(
                  avgHumidity,
                  STANDARDS.humidity.min,
                  STANDARDS.humidity.max,
                ) === "normal"
                  ? "Normal"
                  : checkStatus(
                        avgHumidity,
                        STANDARDS.humidity.min,
                        STANDARDS.humidity.max,
                      ) === "warning"
                    ? "Warning"
                    : "Danger"}
              </span>
            </div>
            <p className="text-gray-600 text-sm font-medium">Kelembapan</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {avgHumidity.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Standar: {STANDARDS.humidity.ideal}
            </p>
          </div>

          {/* Light Intensity */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-2">
              <SunIcon className="h-8 w-8 text-yellow-500" />
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  checkStatus(
                    avgLight,
                    STANDARDS.lightIntensity.min,
                    STANDARDS.lightIntensity.max,
                  ) === "normal"
                    ? "bg-green-100 text-green-800"
                    : checkStatus(
                          avgLight,
                          STANDARDS.lightIntensity.min,
                          STANDARDS.lightIntensity.max,
                        ) === "warning"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {checkStatus(
                  avgLight,
                  STANDARDS.lightIntensity.min,
                  STANDARDS.lightIntensity.max,
                ) === "normal"
                  ? "Normal"
                  : checkStatus(
                        avgLight,
                        STANDARDS.lightIntensity.min,
                        STANDARDS.lightIntensity.max,
                      ) === "warning"
                    ? "Warning"
                    : "Danger"}
              </span>
            </div>
            <p className="text-gray-600 text-sm font-medium">
              Intensitas Cahaya
            </p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {avgLight.toFixed(0)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Standar: {STANDARDS.lightIntensity.ideal}
            </p>
          </div>

          {/* Dust PM2.5 */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-2">
              <BeakerIcon className="h-8 w-8 text-purple-500" />
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  checkStatus(
                    avgDust,
                    STANDARDS.dustPM25.min,
                    STANDARDS.dustPM25.max,
                  ) === "normal"
                    ? "bg-green-100 text-green-800"
                    : checkStatus(
                          avgDust,
                          STANDARDS.dustPM25.min,
                          STANDARDS.dustPM25.max,
                        ) === "warning"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {checkStatus(
                  avgDust,
                  STANDARDS.dustPM25.min,
                  STANDARDS.dustPM25.max,
                ) === "normal"
                  ? "Normal"
                  : checkStatus(
                        avgDust,
                        STANDARDS.dustPM25.min,
                        STANDARDS.dustPM25.max,
                      ) === "warning"
                    ? "Warning"
                    : "Danger"}
              </span>
            </div>
            <p className="text-gray-600 text-sm font-medium">Debu PM2.5</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {avgDust.toFixed(1)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Standar: {STANDARDS.dustPM25.ideal}
            </p>
          </div>

          {/* CO2 */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-2">
              <CloudIcon className="h-8 w-8 text-gray-500" />
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  checkStatus(avgCO2, STANDARDS.co2.min, STANDARDS.co2.max) ===
                  "normal"
                    ? "bg-green-100 text-green-800"
                    : checkStatus(
                          avgCO2,
                          STANDARDS.co2.min,
                          STANDARDS.co2.max,
                        ) === "warning"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {checkStatus(avgCO2, STANDARDS.co2.min, STANDARDS.co2.max) ===
                "normal"
                  ? "Normal"
                  : checkStatus(
                        avgCO2,
                        STANDARDS.co2.min,
                        STANDARDS.co2.max,
                      ) === "warning"
                    ? "Warning"
                    : "Danger"}
              </span>
            </div>
            <p className="text-gray-600 text-sm font-medium">CO₂</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {avgCO2.toFixed(0)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Standar: {STANDARDS.co2.ideal}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Tren Suhu
            </h3>
            <div className="h-64">
              <Line data={tempHistory} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Tren Kelembapan
            </h3>
            <div className="h-64">
              <Line data={humidityHistory} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Room Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-100 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              Detail Monitoring Per Ruangan
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Ruangan
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Suhu
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kelembapan
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cahaya
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Debu PM2.5
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CO₂
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rooms.map((room) => (
                  <tr
                    key={room.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {room.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`text-sm font-semibold ${
                          checkStatus(
                            room.temperature,
                            STANDARDS.temperature.min,
                            STANDARDS.temperature.max,
                          ) === "normal"
                            ? "text-green-600"
                            : checkStatus(
                                  room.temperature,
                                  STANDARDS.temperature.min,
                                  STANDARDS.temperature.max,
                                ) === "warning"
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {room.temperature.toFixed(1)}°C
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`text-sm font-semibold ${
                          checkStatus(
                            room.humidity,
                            STANDARDS.humidity.min,
                            STANDARDS.humidity.max,
                          ) === "normal"
                            ? "text-green-600"
                            : checkStatus(
                                  room.humidity,
                                  STANDARDS.humidity.min,
                                  STANDARDS.humidity.max,
                                ) === "warning"
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {room.humidity.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`text-sm font-semibold ${
                          checkStatus(
                            room.lightIntensity,
                            STANDARDS.lightIntensity.min,
                            STANDARDS.lightIntensity.max,
                          ) === "normal"
                            ? "text-green-600"
                            : checkStatus(
                                  room.lightIntensity,
                                  STANDARDS.lightIntensity.min,
                                  STANDARDS.lightIntensity.max,
                                ) === "warning"
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {room.lightIntensity.toFixed(0)} lux
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`text-sm font-semibold ${
                          checkStatus(
                            room.dustPM25,
                            STANDARDS.dustPM25.min,
                            STANDARDS.dustPM25.max,
                          ) === "normal"
                            ? "text-green-600"
                            : checkStatus(
                                  room.dustPM25,
                                  STANDARDS.dustPM25.min,
                                  STANDARDS.dustPM25.max,
                                ) === "warning"
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {room.dustPM25.toFixed(1)} µg/m³
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`text-sm font-semibold ${
                          checkStatus(
                            room.co2,
                            STANDARDS.co2.min,
                            STANDARDS.co2.max,
                          ) === "normal"
                            ? "text-green-600"
                            : checkStatus(
                                  room.co2,
                                  STANDARDS.co2.min,
                                  STANDARDS.co2.max,
                                ) === "warning"
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {room.co2.toFixed(0)} ppm
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          room.status === "normal"
                            ? "bg-green-100 text-green-800"
                            : room.status === "warning"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {room.status === "normal"
                          ? "Normal"
                          : room.status === "warning"
                            ? "Peringatan"
                            : "Bahaya"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Standards Reference */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
            Standar Kesehatan Kantor Pertambangan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
            <div className="bg-white rounded p-3">
              <p className="font-semibold text-gray-700">Suhu</p>
              <p className="text-blue-600 font-bold">
                {STANDARDS.temperature.ideal}
              </p>
            </div>
            <div className="bg-white rounded p-3">
              <p className="font-semibold text-gray-700">Kelembapan</p>
              <p className="text-blue-600 font-bold">
                {STANDARDS.humidity.ideal}
              </p>
            </div>
            <div className="bg-white rounded p-3">
              <p className="font-semibold text-gray-700">Intensitas Cahaya</p>
              <p className="text-blue-600 font-bold">
                {STANDARDS.lightIntensity.ideal}
              </p>
            </div>
            <div className="bg-white rounded p-3">
              <p className="font-semibold text-gray-700">Debu PM2.5</p>
              <p className="text-blue-600 font-bold">
                {STANDARDS.dustPM25.ideal}
              </p>
            </div>
            <div className="bg-white rounded p-3">
              <p className="font-semibold text-gray-700">CO₂</p>
              <p className="text-blue-600 font-bold">{STANDARDS.co2.ideal}</p>
            </div>
          </div>
          <p className="text-xs text-blue-700 mt-3">
            * Standar berdasarkan Peraturan Menteri ESDM dan Kepmenaker tentang
            Keselamatan dan Kesehatan Kerja Pertambangan
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

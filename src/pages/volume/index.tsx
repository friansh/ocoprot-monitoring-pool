import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  TruckIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import Header from "../../components/Header";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface EventLog {
  id: number;
  time: string;
  vehicleId: string;
  type: string;
  status: string;
}

export default function Volume() {
  const [totalFleet, setTotalFleet] = useState(42);
  const [trafficDensity, setTrafficDensity] = useState(68);
  const [safetyAlerts, setSafetyAlerts] = useState(3);
  const [systemUptime, setSystemUptime] = useState(99.8);
  const [isRecording, setIsRecording] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [chartData, setChartData] = useState({
    labels: ["10:00", "10:05", "10:10", "10:15", "10:20"],
    datasets: [
      {
        label: "Truck Flow",
        data: [12, 19, 15, 22, 18],
        borderColor: "rgb(251, 191, 36)",
        backgroundColor: "rgba(251, 191, 36, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  });

  const [eventLogs, setEventLogs] = useState<EventLog[]>([
    {
      id: 1,
      time: "10:23:45",
      vehicleId: "HD-785-001",
      type: "Entry",
      status: "Normal",
    },
    {
      id: 2,
      time: "10:22:12",
      vehicleId: "HD-785-012",
      type: "Exit",
      status: "Normal",
    },
    {
      id: 3,
      time: "10:21:33",
      vehicleId: "CAT-797-005",
      type: "Entry",
      status: "Passing Speed Limit",
    },
    {
      id: 4,
      time: "10:20:08",
      vehicleId: "HD-785-007",
      type: "Exit",
      status: "Normal",
    },
    {
      id: 5,
      time: "10:19:45",
      vehicleId: "CAT-797-003",
      type: "Entry",
      status: "Normal",
    },
  ]);

  // Simulate real-time updates every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Update current time
      setCurrentTime(new Date());

      // Update metrics with random variations
      setTotalFleet((prev) =>
        Math.max(35, Math.min(50, prev + Math.floor(Math.random() * 3) - 1)),
      );
      setTrafficDensity((prev) =>
        Math.max(50, Math.min(85, prev + Math.floor(Math.random() * 5) - 2)),
      );
      setSafetyAlerts((prev) =>
        Math.max(0, Math.min(10, prev + Math.floor(Math.random() * 3) - 1)),
      );
      setSystemUptime((prev) =>
        Math.max(98.0, Math.min(100.0, prev + Math.random() * 0.2 - 0.1)),
      );

      // Update chart data
      setChartData((prevData) => {
        const newLabels = [...prevData.labels];
        const newData = [...prevData.datasets[0].data];

        // Add new data point
        const now = new Date();
        const timeLabel = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
        newLabels.push(timeLabel);
        newData.push(Math.floor(Math.random() * 15) + 10);

        // Keep only last 8 points
        if (newLabels.length > 8) {
          newLabels.shift();
          newData.shift();
        }

        return {
          ...prevData,
          labels: newLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: newData,
            },
          ],
        };
      });

      // Update event logs
      setEventLogs((prev) => {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
        const vehicles = [
          "HD-785-001",
          "HD-785-012",
          "CAT-797-005",
          "CAT-797-003",
          "HD-785-007",
          "CAT-797-009",
        ];
        const types = ["Entry", "Exit"];
        const statuses = [
          "Normal",
          "Normal",
          "Normal",
          "Normal",
          "Passing Speed Limit",
        ];

        const newLog: EventLog = {
          id: Date.now(),
          time: timeStr,
          vehicleId: vehicles[Math.floor(Math.random() * vehicles.length)],
          type: types[Math.floor(Math.random() * types.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
        };

        return [newLog, ...prev.slice(0, 9)]; // Keep only last 10 logs
      });
    }, 3000);

    // Blink REC indicator
    const blinkInterval = setInterval(() => {
      setIsRecording((prev) => !prev);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(blinkInterval);
    };
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          color: "#fff",
        },
      },
      title: {
        display: true,
        text: "Truck Flow vs Time",
        color: "#fff",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#9ca3af",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "#9ca3af",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <Header
        title="Mining Traffic Monitoring System"
        subtitle="Real-time Fleet & Safety Monitoring"
      />

      <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-6">
        {/* Top Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Fleet */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Total Fleet</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {totalFleet}
                </p>
              </div>
              <TruckIcon className="h-12 w-12 text-blue-200" />
            </div>
          </div>

          {/* Traffic Density */}
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm font-medium">
                  Traffic Density
                </p>
                <p className="text-3xl font-bold text-white mt-2">
                  {trafficDensity}%
                </p>
              </div>
              <ChartBarIcon className="h-12 w-12 text-green-200" />
            </div>
          </div>

          {/* Safety Alerts */}
          <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-200 text-sm font-medium">
                  Safety Alerts
                </p>
                <p className="text-3xl font-bold text-white mt-2">
                  {safetyAlerts}
                </p>
              </div>
              <ExclamationTriangleIcon className="h-12 w-12 text-red-300" />
            </div>
          </div>

          {/* System Uptime */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">
                  System Uptime
                </p>
                <p className="text-3xl font-bold text-white mt-2">
                  {systemUptime.toFixed(1)}%
                </p>
              </div>
              <ClockIcon className="h-12 w-12 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Main Layout - CCTV & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CCTV Feed - 2/3 width */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg overflow-hidden shadow-xl">
            <div className="relative aspect-video bg-gray-950 flex items-center justify-center">
              {/* CCTV Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-gray-600 text-center">
                    <div className="text-6xl mb-4">📹</div>
                    <p className="text-xl font-mono">LIVE FEED</p>
                  </div>
                </div>
              </div>

              {/* REC Indicator */}
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${isRecording ? "bg-red-600" : "bg-red-900"} transition-colors duration-300`}
                ></div>
                <span className="text-red-500 font-bold text-sm font-mono">
                  REC
                </span>
              </div>

              {/* Timestamp */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-70 px-3 py-1 rounded">
                <span className="text-white font-mono text-sm">
                  {currentTime.toLocaleTimeString("en-US", { hour12: false })}
                </span>
              </div>

              {/* Location Label */}
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 px-4 py-2 rounded">
                <span className="text-amber-400 font-bold text-sm font-mono">
                  GATE 01 - HAULING ROAD
                </span>
              </div>

              {/* Grid Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="border border-green-500 border-opacity-20"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Chart - 1/3 width */}
          <div className="lg:col-span-1 bg-gray-800 rounded-lg p-4 shadow-xl">
            <div className="h-full min-h-[300px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Event Log Table */}
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-4 bg-gray-700 border-b border-gray-600">
            <h2 className="text-xl font-bold text-white">Event Log</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Vehicle ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {eventLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-gray-750 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-300">
                      {log.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-400">
                      {log.vehicleId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          log.type === "Entry"
                            ? "bg-green-900 text-green-200"
                            : "bg-blue-900 text-blue-200"
                        }`}
                      >
                        {log.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          log.status === "Normal"
                            ? "bg-green-900 text-green-200"
                            : "bg-red-900 text-red-200"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

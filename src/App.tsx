import { useState } from "react";
import MapImg from "./assets/map.png";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

function Chart({
  chartTitle,
  maxValue,
  minValue,
  yAxisLabel,
}: {
  chartTitle: string;
  maxValue: number;
  minValue: number;
  yAxisLabel: string;
}) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: chartTitle,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Waktu (Jam)",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
    },
  };

  const labels = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Titik 1",
        data: labels.map(() =>
          faker.number.int({ min: minValue, max: maxValue })
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Titik 2",
        data: labels.map(() =>
          faker.number.int({ min: minValue, max: maxValue })
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Titik 3",
        data: labels.map(() =>
          faker.number.int({ min: minValue, max: maxValue })
        ),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Titik 4",
        data: labels.map(() =>
          faker.number.int({ min: minValue, max: maxValue })
        ),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.5)",
      },
      {
        label: "Titik 5",
        data: labels.map(() =>
          faker.number.int({ min: minValue, max: maxValue })
        ),
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  };

  return (
    <div className="p-3 bg-white rounded-lg shadow-md m-2 border border-gray-200">
      <Line options={options} data={data} />
    </div>
  );
}

function App() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-linear-to-r from-slate-800 to-slate-700 shadow-lg py-4 px-5 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold mb-1">
                Sistem Monitoring Kualitas Air Kolam Pengendapan Lumpur
              </h1>
              <p className="text-slate-300 text-sm">PT Lorem Ipsum</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">Sistem Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white border-b border-gray-200 py-4 px-5">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-700 text-sm leading-relaxed">
            <span className="font-semibold">PT Lorem Ipsum</span> berkomitmen
            dalam pengelolaan lingkungan yang berkelanjutan. Sistem monitoring
            real-time ini dirancang untuk memantau kualitas air di kolam
            pengendapan lumpur tambang secara kontinyu, memastikan parameter
            kualitas air tetap dalam batas standar yang telah ditetapkan sesuai
            dengan regulasi lingkungan.
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-5 max-w-7xl mx-auto p-5">
        <div className="w-1/3">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-slate-700 rounded-full"></div>
            <div>
              <h2 className="font-bold text-xl text-slate-800">Denah Lokasi</h2>
              <p className="text-xs text-slate-500">Site Layout Map</p>
            </div>
          </div>
          <img src={MapImg} className="block rounded-xl shadow-lg" />
        </div>
        <div className="w-2/3 ">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-slate-700 rounded-full"></div>
            <div>
              <h2 className="font-bold text-xl text-slate-800">
                Nilai Saat Ini
              </h2>
              <p className="text-xs text-slate-500">
                Current Monitoring Values
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-linear-to-br from-slate-50 to-slate-100 p-2 rounded-lg shadow-md border border-slate-200">
              <Cek title="Titik 1" />
            </div>
            <div className="bg-linear-to-br from-slate-50 to-slate-100 p-2 rounded-lg shadow-md border border-slate-200">
              <Cek title="Titik 2" />
            </div>
            <div className="bg-linear-to-br from-slate-50 to-slate-100 p-2 rounded-lg shadow-md border border-slate-200">
              <Cek title="Titik 3" />
            </div>
            <div className="bg-linear-to-br from-slate-50 to-slate-100 p-2 rounded-lg shadow-md border border-slate-200">
              <Cek title="Titik 4" />
            </div>
            <div className="bg-linear-to-br from-slate-50 to-slate-100 p-2 rounded-lg shadow-md border border-slate-200">
              <Cek title="Titik 5" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 max-w-7xl mx-auto block p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-slate-700 rounded-full"></div>
            <div>
              <h2 className="font-bold text-xl text-slate-800">
                Grafik Riwayat
              </h2>
              <p className="text-xs text-slate-500">Historical Data Charts</p>
            </div>
          </div>
          <span className="text-sm text-slate-500 italic">
            💡 Klik legenda untuk toggle data
          </span>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <Chart
              chartTitle="Suhu Lingkungan"
              minValue={25}
              maxValue={40}
              yAxisLabel="Degree Celcius"
            />
          </div>
          <div>
            <Chart
              chartTitle="Kelembapan Lingkungan"
              minValue={50}
              maxValue={99}
              yAxisLabel="% RH"
            />
          </div>
          <div>
            <Chart
              chartTitle="Suhu Air"
              minValue={25}
              maxValue={59}
              yAxisLabel="Degree Celcius"
            />
          </div>
          <div>
            <Chart
              chartTitle="pH"
              minValue={4}
              maxValue={9}
              yAxisLabel="Satuan pH"
            />
          </div>
          <div>
            <Chart
              chartTitle="EC"
              minValue={500}
              maxValue={3000}
              yAxisLabel="µS/cm"
            />
          </div>
          <div>
            <Chart
              chartTitle="TDS"
              minValue={300}
              maxValue={2000}
              yAxisLabel="ppm"
            />
          </div>
          <div>
            <Chart
              chartTitle="TSS"
              minValue={100}
              maxValue={800}
              yAxisLabel="mg/L"
            />
          </div>
          <div>
            <Chart
              chartTitle="Dissolved Oxygen"
              minValue={2}
              maxValue={8}
              yAxisLabel="mg/L"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 px-5 mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-3">
                PT Lorem Ipsum
              </h3>
              <p className="text-sm leading-relaxed">
                Perusahaan tambang terkemuka yang berkomitmen pada praktik
                pertambangan berkelanjutan dan pengelolaan lingkungan yang
                bertanggung jawab.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-3">Kontak</h3>
              <p className="text-sm mb-2">
                📍 Jl. Industri No. 123, Sumatera Selatan
              </p>
              <p className="text-sm mb-2">📞 +62 21 1234 5678</p>
              <p className="text-sm">✉️ info@loremipsum.co.id</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-3">
                Informasi Sistem
              </h3>
              <p className="text-sm mb-2">🔹 5 Titik Monitoring Aktif</p>
              <p className="text-sm mb-2">🔹 8 Parameter Kualitas Air</p>
              <p className="text-sm">🔹 Pembaruan Real-time 24/7</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm">
            <p>
              &copy; 2026 PT Lorem Ipsum. All rights reserved. | Sistem
              Monitoring Lingkungan v1.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Cek({ title }: { title?: string }) {
  const [updateTime] = useState(
    new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  const getStatus = (
    param: string,
    value: number
  ): { status: string; color: string } => {
    // Simulasi status berdasarkan nilai
    if (param === "pH") {
      return value >= 6 && value <= 8
        ? {
            status: "Normal",
            color: "bg-emerald-50 text-emerald-700 border border-emerald-200",
          }
        : {
            status: "Perhatian",
            color: "bg-amber-50 text-amber-700 border border-amber-200",
          };
    }
    if (param === "TSS") {
      return value < 600
        ? {
            status: "Normal",
            color: "bg-emerald-50 text-emerald-700 border border-emerald-200",
          }
        : {
            status: "Perhatian",
            color: "bg-amber-50 text-amber-700 border border-amber-200",
          };
    }
    if (param === "DO") {
      return value >= 4
        ? {
            status: "Normal",
            color: "bg-emerald-50 text-emerald-700 border border-emerald-200",
          }
        : {
            status: "Perhatian",
            color: "bg-amber-50 text-amber-700 border border-amber-200",
          };
    }
    return {
      status: "Normal",
      color: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    };
  };

  const suhuLingkungan = faker.number.int({ min: 25, max: 40 });
  const kelembapan = faker.number.int({ min: 50, max: 95 });
  const suhuAir = faker.number.int({ min: 22, max: 35 });
  const pH = faker.number.float({ min: 4.0, max: 9.0, fractionDigits: 1 });
  const ec = faker.number.float({ min: 0.5, max: 3.0, fractionDigits: 2 });
  const tds = faker.number.int({ min: 300, max: 2000 });
  const tss = faker.number.int({ min: 100, max: 800 });
  const oksigen = faker.number.float({ min: 2.0, max: 8.0, fractionDigits: 1 });

  return (
    <>
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-200">
        <span className="font-bold text-xl text-slate-800">{title}</span>
        <span className="text-xs bg-emerald-500 text-white px-3 py-1.5 rounded-full shadow-sm font-medium">
          Online
        </span>
      </div>
      <table className="table-auto w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-slate-100">
          <tr>
            <th className="font-semibold text-slate-700 p-3 text-left text-sm">
              Parameter
            </th>
            <th className="font-semibold text-slate-700 p-3 text-center text-sm">
              Nilai
            </th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-slate-100">
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-3">
              <span className="font-medium text-slate-700">
                Suhu Lingkungan
              </span>
              <span className="block text-xs text-slate-500 mt-0.5">°C</span>
            </td>
            <td className="p-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-slate-800 text-base">
                  {suhuLingkungan}
                </span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                    getStatus("temp", suhuLingkungan).color
                  }`}
                >
                  {getStatus("temp", suhuLingkungan).status}
                </span>
              </div>
            </td>
          </tr>
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-3">
              <span className="font-medium text-slate-700">
                Kelembapan Lingkungan
              </span>
              <span className="block text-xs text-slate-500 mt-0.5">% RH</span>
            </td>
            <td className="p-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-slate-800 text-base">
                  {kelembapan}
                </span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                    getStatus("humidity", kelembapan).color
                  }`}
                >
                  {getStatus("humidity", kelembapan).status}
                </span>
              </div>
            </td>
          </tr>
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-3">
              <span className="font-medium text-slate-700">Suhu Air</span>
              <span className="block text-xs text-slate-500 mt-0.5">°C</span>
            </td>
            <td className="p-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-slate-800 text-base">
                  {suhuAir}
                </span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                    getStatus("watertemp", suhuAir).color
                  }`}
                >
                  {getStatus("watertemp", suhuAir).status}
                </span>
              </div>
            </td>
          </tr>
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-3">
              <span className="font-medium text-slate-700">pH</span>
            </td>
            <td className="p-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-slate-800 text-base">{pH}</span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                    getStatus("pH", pH).color
                  }`}
                >
                  {getStatus("pH", pH).status}
                </span>
              </div>
            </td>
          </tr>
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-3">
              <span className="font-medium text-slate-700">EC</span>
              <span className="block text-xs text-slate-500 mt-0.5">mS/cm</span>
            </td>
            <td className="p-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-slate-800 text-base">{ec}</span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                    getStatus("EC", ec).color
                  }`}
                >
                  {getStatus("EC", ec).status}
                </span>
              </div>
            </td>
          </tr>
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-3">
              <span className="font-medium text-slate-700">
                Total Dissolved Solids
              </span>
              <span className="block text-xs text-slate-500 mt-0.5">ppm</span>
            </td>
            <td className="p-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-slate-800 text-base">
                  {tds}
                </span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                    getStatus("TDS", tds).color
                  }`}
                >
                  {getStatus("TDS", tds).status}
                </span>
              </div>
            </td>
          </tr>
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-3">
              <span className="font-medium text-slate-700">
                Total Suspended Solids
              </span>
              <span className="block text-xs text-slate-500 mt-0.5">ppm</span>
            </td>
            <td className="p-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-slate-800 text-base">
                  {tss}
                </span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                    getStatus("TSS", tss).color
                  }`}
                >
                  {getStatus("TSS", tss).status}
                </span>
              </div>
            </td>
          </tr>
          <tr className="hover:bg-slate-50 transition-colors">
            <td className="p-3">
              <span className="font-medium text-slate-700">
                Oksigen Terlarut
              </span>
              <span className="block text-xs text-slate-500 mt-0.5">mg/L</span>
            </td>
            <td className="p-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-slate-800 text-base">
                  {oksigen}
                </span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                    getStatus("DO", oksigen).color
                  }`}
                >
                  {getStatus("DO", oksigen).status}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* Card Footer Info */}
      <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
        <span className="text-slate-500">
          Pembaruan Terakhir Pada:{" "}
          <span className="font-medium text-slate-700">{updateTime}</span>
        </span>
      </div>
    </>
  );
}

export default App;

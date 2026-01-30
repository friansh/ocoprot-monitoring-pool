import { useNavigate } from "react-router";
import {
  ShieldCheckIcon,
  ClockIcon,
  TruckIcon,
  MapIcon,
  BuildingOfficeIcon,
  ClipboardDocumentCheckIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";

function App() {
  let navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white py-16 px-5 shadow-lg">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Selamat Datang di Portal Manajemen Terintegrasi
          </h1>
          <h2 className="text-2xl font-semibold mb-6 text-slate-300">
            PT Lorem Ipsum
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Portal terpusat untuk monitoring dan manajemen operasional
            perusahaan secara real-time. Akses semua sistem monitoring, data
            analitik, dan informasi penting dalam satu platform yang
            terintegrasi.
          </p>
          <div className="mt-8 flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>Sistem Aktif</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-5 h-5" />
              <span>Aman & Terenkripsi</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5" />
              <span>24/7 Monitoring</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            Pilih Sistem
          </h3>
          <p className="text-slate-600">
            Klik pada modul di bawah untuk mengakses sistem yang diinginkan
          </p>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div
            className="border border-slate-300 rounded-xl p-4 shadow-md bg-linear-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
            onClick={() => {
              navigate("/truck");
            }}
          >
            <TruckIcon className="size-16 m-auto block text-emerald-700 group-hover:scale-110 transition-transform duration-300" />

            <span className="block text-center font-bold text-lg mt-3 text-slate-800 group-hover:text-emerald-800 transition-colors">
              Monitoring Status Truk
            </span>
            <span className="block text-center text-xs text-slate-600 mt-1">
              Klik untuk melihat detail
            </span>
          </div>
          <div
            className="border border-slate-300 rounded-xl p-4 shadow-md bg-linear-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
            onClick={() => {
              navigate("/pool");
            }}
          >
            <MapIcon className="size-16 m-auto block text-blue-700 group-hover:scale-110 transition-transform duration-300" />

            <span className="block text-center font-bold text-lg mt-3 text-slate-800 group-hover:text-blue-800 transition-colors">
              Monitoring Kolam Endapan
            </span>
            <span className="block text-center text-xs text-slate-600 mt-1">
              Klik untuk melihat detail
            </span>
          </div>
          <div
            className="border border-slate-300 rounded-xl p-4 shadow-md bg-linear-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
            onClick={() => {
              navigate("/office");
            }}
          >
            <BuildingOfficeIcon className="size-16 m-auto block text-amber-700 group-hover:scale-110 transition-transform duration-300" />

            <span className="block text-center font-bold text-lg mt-3 text-slate-800 group-hover:text-amber-800 transition-colors">
              Monitoring Klimat Kantor
            </span>
            <span className="block text-center text-xs text-slate-600 mt-1">
              Klik untuk melihat detail
            </span>
          </div>
          <div className="border border-slate-300 rounded-xl p-4 shadow-md bg-linear-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <ClipboardDocumentCheckIcon className="size-16 m-auto block text-purple-700 group-hover:scale-110 transition-transform duration-300" />

            <span className="block text-center font-bold text-lg mt-3 text-slate-800 group-hover:text-purple-800 transition-colors">
              Absensi
            </span>
            <span className="block text-center text-xs text-slate-600 mt-1">
              Klik untuk melihat detail
            </span>
          </div>
          <div className="border border-slate-300 rounded-xl p-4 shadow-md bg-linear-to-br from-rose-50 to-rose-100 hover:from-rose-100 hover:to-rose-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <CalculatorIcon className="size-16 m-auto block text-rose-700 group-hover:scale-110 transition-transform duration-300" />

            <span className="block text-center font-bold text-lg mt-3 text-slate-800 group-hover:text-rose-800 transition-colors">
              Monitoring Volume Kendaraan
            </span>
            <span className="block text-center text-xs text-slate-600 mt-1">
              Klik untuk melihat detail
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

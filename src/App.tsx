import { useNavigate } from "react-router";
import {
  TruckIcon,
  MapIcon,
  BuildingOfficeIcon,
  ClipboardDocumentCheckIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";
import { Footer } from "./components";

function App() {
  let navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-slate-700 text-white py-12 px-5 shadow-md">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Portal Monitoring PT Lorem Ipsum
          </h1>
          <p className="text-2xl mb-8">Sistem Monitoring Operasional Terpadu</p>
          <div className="inline-flex items-center gap-3 bg-white/20 rounded-lg px-6 py-3">
            <div className="w-3 h-3 bg-green-300 rounded-full"></div>
            <span className="text-lg font-semibold">
              Sistem Aktif - Monitoring 24/7
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">
            Pilih Menu Sistem
          </h2>
          <p className="text-xl text-slate-600">
            Klik pada menu di bawah untuk mengakses sistem
          </p>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <div
            className="bg-white border-3 border-emerald-300 rounded-lg p-8 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              navigate("/truck");
            }}
          >
            <TruckIcon className="w-20 h-20 mx-auto mb-4 text-emerald-500" />
            <h3 className="text-2xl font-bold text-center text-slate-800 mb-2">
              Monitoring Truk
            </h3>
            <p className="text-center text-lg text-slate-600">
              GPS & Status Kendaraan
            </p>
          </div>

          <div
            className="bg-white border-3 border-blue-300 rounded-lg p-8 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              navigate("/pool");
            }}
          >
            <MapIcon className="w-20 h-20 mx-auto mb-4 text-blue-500" />
            <h3 className="text-2xl font-bold text-center text-slate-800 mb-2">
              Monitoring Kolam
            </h3>
            <p className="text-center text-lg text-slate-600">
              Kualitas Air & pH
            </p>
          </div>

          <div
            className="bg-white border-3 border-amber-300 rounded-lg p-8 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              navigate("/office");
            }}
          >
            <BuildingOfficeIcon className="w-20 h-20 mx-auto mb-4 text-amber-500" />
            <h3 className="text-2xl font-bold text-center text-slate-800 mb-2">
              Monitoring Kantor
            </h3>
            <p className="text-center text-lg text-slate-600">
              Suhu & Kelembaban
            </p>
          </div>

          <div
            className="bg-white border-3 border-purple-300 rounded-lg p-8 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              navigate("/presence");
            }}
          >
            <ClipboardDocumentCheckIcon className="w-20 h-20 mx-auto mb-4 text-purple-500" />
            <h3 className="text-2xl font-bold text-center text-slate-800 mb-2">
              Absensi
            </h3>
            <p className="text-center text-lg text-slate-600">
              Presensi Karyawan
            </p>
          </div>

          <div
            className="bg-white border-3 border-rose-300 rounded-lg p-8 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              navigate("/volume");
            }}
          >
            <CalculatorIcon className="w-20 h-20 mx-auto mb-4 text-rose-500" />
            <h3 className="text-2xl font-bold text-center text-slate-800 mb-2">
              Monitoring Volume
            </h3>
            <p className="text-center text-lg text-slate-600">
              Volume Kendaraan
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;

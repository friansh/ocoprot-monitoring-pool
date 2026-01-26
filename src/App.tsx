import { useState } from "react";

import { useNavigate } from "react-router";

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
              <span>Aman & Terenkripsi</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
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
              navigate("/pool");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-16 m-auto block text-emerald-700 group-hover:scale-110 transition-transform duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-16 m-auto block text-blue-700 group-hover:scale-110 transition-transform duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
              />
            </svg>

            <span className="block text-center font-bold text-lg mt-3 text-slate-800 group-hover:text-blue-800 transition-colors">
              Monitoring Kolam Endapan
            </span>
            <span className="block text-center text-xs text-slate-600 mt-1">
              Klik untuk melihat detail
            </span>
          </div>
          <div className="border border-slate-300 rounded-xl p-4 shadow-md bg-linear-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-16 m-auto block text-amber-700 group-hover:scale-110 transition-transform duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
              />
            </svg>

            <span className="block text-center font-bold text-lg mt-3 text-slate-800 group-hover:text-amber-800 transition-colors">
              Monitoring Klimat Kantor
            </span>
            <span className="block text-center text-xs text-slate-600 mt-1">
              Klik untuk melihat detail
            </span>
          </div>
          <div className="border border-slate-300 rounded-xl p-4 shadow-md bg-linear-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-16 m-auto block text-purple-700 group-hover:scale-110 transition-transform duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
              />
            </svg>

            <span className="block text-center font-bold text-lg mt-3 text-slate-800 group-hover:text-purple-800 transition-colors">
              Absensi
            </span>
            <span className="block text-center text-xs text-slate-600 mt-1">
              Klik untuk melihat detail
            </span>
          </div>
          <div className="border border-slate-300 rounded-xl p-4 shadow-md bg-linear-to-br from-rose-50 to-rose-100 hover:from-rose-100 hover:to-rose-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-16 m-auto block text-rose-700 group-hover:scale-110 transition-transform duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
              />
            </svg>

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

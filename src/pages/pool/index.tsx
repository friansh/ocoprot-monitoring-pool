import MapImg from "../../assets/map.png";

import Chart from "./chart";
import Table from "./table";

export default function Pool() {
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
              <Table title="Titik 1" />
            </div>
            <div className="bg-linear-to-br from-slate-50 to-slate-100 p-2 rounded-lg shadow-md border border-slate-200">
              <Table title="Titik 2" />
            </div>
            <div className="bg-linear-to-br from-slate-50 to-slate-100 p-2 rounded-lg shadow-md border border-slate-200">
              <Table title="Titik 3" />
            </div>
            <div className="bg-linear-to-br from-slate-50 to-slate-100 p-2 rounded-lg shadow-md border border-slate-200">
              <Table title="Titik 4" />
            </div>
            <div className="bg-linear-to-br from-slate-50 to-slate-100 p-2 rounded-lg shadow-md border border-slate-200">
              <Table title="Titik 5" />
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

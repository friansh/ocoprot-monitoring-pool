import MapImg from "../../assets/map.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import Chart from "./chart";
import Table from "./table";

export default function Pool() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <Header
        title="Sistem Monitoring Kualitas Air Kolam Pengendapan Lumpur"
        subtitle="Monitoring Real-time Kualitas Air - PT Lorem Ipsum"
      />

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

      <Footer />
    </div>
  );
}

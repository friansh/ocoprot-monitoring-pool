import { useState } from "react";

function App() {
  return (
    <>
      <p className="text-3xl font-bold underline">Mantap</p>

      <div className="grid grid-cols-3 bg-amber-200 p-4 gap-4">
        <div className="bg-blue-200 p-2 rounded-lg shadow-md">
          <Cek title="Inlet" />
        </div>
        <div className="bg-blue-200 p-2 rounded-lg shadow-md">
          <Cek title="Kolam 1" />
        </div>
        <div className="bg-blue-200 p-2 rounded-lg shadow-md">
          <Cek title="Kolam 2" />
        </div>
        <div className="bg-blue-200 p-2 rounded-lg shadow-md">
          <Cek title="Kolam 3" />
        </div>
      </div>
    </>
  );
}

function Cek({ title }: { title?: string }) {
  return (
    <>
      <span className="text-center font-bold text-lg block">{title}</span>
      <table className="table-auto w-full mt-2 bg-white">
        <thead>
          <tr>
            <td className="font-semibold border p-1 text-center">Parameter</td>
            <td className="font-semibold border p-1 text-center">Nilai</td>
          </tr>
        </thead>
        <tbody className="text-sm">
          <tr>
            <td className="border p-1">
              <span>Suhu Lingkungan</span>
              <span className="block text-xs text-gray-500">
                Degree Celcius
              </span>
            </td>
            <td className="border p-1">12</td>
          </tr>
          <tr>
            <td className="border p-1">
              Kelembapan Lingkungan
              <span className="block text-xs text-gray-500">% RH</span>
            </td>
            <td className="border p-1">12</td>
          </tr>
          <tr>
            <td className="border p-1">
              Suhu Air
              <span className="block text-xs text-gray-500">
                Degree Celcius
              </span>
            </td>
            <td className="border p-1">12</td>
          </tr>
          <tr>
            <td className="border p-1">pH</td>
            <td className="border p-1">12</td>
          </tr>
          <tr>
            <td className="border p-1">
              EC
              <span className="block text-xs text-gray-500">
                milliSievert/cm
              </span>
            </td>
            <td className="border p-1">12</td>
          </tr>
          <tr>
            <td className="border p-1">
              TDS<span className="block text-xs text-gray-500">PPM</span>
            </td>
            <td className="border p-1">12</td>
          </tr>
          <tr>
            <td className="border p-1">TSS</td>
            <td className="border p-1">12</td>
          </tr>
          <tr>
            <td className="border p-1">Oksigen Terlarut</td>
            <td className="border p-1">12</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default App;

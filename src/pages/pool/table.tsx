import { useState } from "react";
import { faker } from "@faker-js/faker";

export default function Table({ title }: { title?: string }) {
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

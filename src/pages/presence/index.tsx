import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  CameraIcon,
  HeartIcon,
  ClipboardDocumentCheckIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

interface HealthData {
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  bodyTemperature: number;
}

interface ScreeningAnswer {
  question: string;
  answer: "yes" | "no";
}

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  role: "office" | "driver";
  timestamp: Date;
  type: "check-in" | "check-out";
  faceRecognitionStatus: "success" | "failed";
  faceMatchScore: number; // percentage
  health: HealthData;
  screening: ScreeningAnswer[];
  screeningPassed: boolean;
  location: string;
  photoUrl?: string;
}

const SCREENING_QUESTIONS = [
  "Apakah Anda mengalami demam atau merasa tidak enak badan?",
  "Apakah Anda mengalami batuk, pilek, atau sesak napas?",
  "Apakah Anda memiliki riwayat kontak dengan orang yang terinfeksi COVID-19 dalam 14 hari terakhir?",
  "Apakah Anda mengonsumsi alkohol atau obat-obatan dalam 24 jam terakhir?",
  "Apakah Anda merasa mengantuk atau kelelahan berlebihan?",
  "Apakah Anda memiliki kondisi kesehatan yang dapat mengganggu pekerjaan hari ini?",
];

export default function Presence() {
  const [attendances, setAttendances] = useState<AttendanceRecord[]>([
    {
      id: "ATT-001",
      employeeId: "EMP-001",
      employeeName: "Budi Santoso",
      role: "driver",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: "check-in",
      faceRecognitionStatus: "success",
      faceMatchScore: 98.5,
      health: {
        bloodPressureSystolic: 120,
        bloodPressureDiastolic: 80,
        bodyTemperature: 36.5,
      },
      screening: SCREENING_QUESTIONS.map((q) => ({
        question: q,
        answer: "no",
      })),
      screeningPassed: true,
      location: "Gate Office Muara Enim",
    },
    {
      id: "ATT-002",
      employeeId: "EMP-005",
      employeeName: "Ahmad Hidayat",
      role: "driver",
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      type: "check-in",
      faceRecognitionStatus: "success",
      faceMatchScore: 95.2,
      health: {
        bloodPressureSystolic: 138,
        bloodPressureDiastolic: 88,
        bodyTemperature: 37.2,
      },
      screening: [
        ...SCREENING_QUESTIONS.slice(0, 4).map((q) => ({
          question: q,
          answer: "no" as const,
        })),
        { question: SCREENING_QUESTIONS[4], answer: "yes" as const },
        { question: SCREENING_QUESTIONS[5], answer: "no" as const },
      ],
      screeningPassed: false,
      location: "Gate Office Muara Enim",
    },
    {
      id: "ATT-003",
      employeeId: "EMP-012",
      employeeName: "Siti Nurhaliza",
      role: "office",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      type: "check-in",
      faceRecognitionStatus: "success",
      faceMatchScore: 99.1,
      health: {
        bloodPressureSystolic: 115,
        bloodPressureDiastolic: 75,
        bodyTemperature: 36.3,
      },
      screening: SCREENING_QUESTIONS.map((q) => ({
        question: q,
        answer: "no",
      })),
      screeningPassed: true,
      location: "Main Office",
    },
    {
      id: "ATT-004",
      employeeId: "EMP-018",
      employeeName: "Joko Widodo",
      role: "driver",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      type: "check-in",
      faceRecognitionStatus: "success",
      faceMatchScore: 96.8,
      health: {
        bloodPressureSystolic: 125,
        bloodPressureDiastolic: 82,
        bodyTemperature: 36.7,
      },
      screening: SCREENING_QUESTIONS.map((q) => ({
        question: q,
        answer: "no",
      })),
      screeningPassed: true,
      location: "Gate Office Muara Enim",
    },
    {
      id: "ATT-005",
      employeeId: "EMP-022",
      employeeName: "Dewi Lestari",
      role: "office",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: "check-in",
      faceRecognitionStatus: "failed",
      faceMatchScore: 72.3,
      health: {
        bloodPressureSystolic: 110,
        bloodPressureDiastolic: 70,
        bodyTemperature: 36.4,
      },
      screening: SCREENING_QUESTIONS.map((q) => ({
        question: q,
        answer: "no",
      })),
      screeningPassed: true,
      location: "Main Office",
    },
  ]);

  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(
    null,
  );
  const [filterRole, setFilterRole] = useState<"all" | "office" | "driver">(
    "all",
  );
  const [filterStatus, setFilterStatus] = useState<"all" | "passed" | "failed">(
    "all",
  );

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new check-in every 30 seconds (commented out for demo)
      // Add logic here if needed
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const filteredAttendances = attendances.filter((att) => {
    const roleMatch = filterRole === "all" || att.role === filterRole;
    const statusMatch =
      filterStatus === "all" ||
      (filterStatus === "passed" && att.screeningPassed) ||
      (filterStatus === "failed" && !att.screeningPassed);
    return roleMatch && statusMatch;
  });

  const todayStats = {
    total: attendances.length,
    office: attendances.filter((a) => a.role === "office").length,
    driver: attendances.filter((a) => a.role === "driver").length,
    passed: attendances.filter((a) => a.screeningPassed).length,
    failed: attendances.filter((a) => !a.screeningPassed).length,
    faceSuccess: attendances.filter(
      (a) => a.faceRecognitionStatus === "success",
    ).length,
  };

  const getBloodPressureStatus = (systolic: number, diastolic: number) => {
    if (systolic > 140 || diastolic > 90) {
      return { label: "Tinggi", color: "text-red-600", bg: "bg-red-50" };
    } else if (systolic > 130 || diastolic > 85) {
      return {
        label: "Prehipertensi",
        color: "text-orange-600",
        bg: "bg-orange-50",
      };
    } else if (systolic < 90 || diastolic < 60) {
      return { label: "Rendah", color: "text-blue-600", bg: "bg-blue-50" };
    }
    return { label: "Normal", color: "text-green-600", bg: "bg-green-50" };
  };

  const getTemperatureStatus = (temp: number) => {
    if (temp >= 38) {
      return { label: "Demam Tinggi", color: "text-red-600", bg: "bg-red-50" };
    } else if (temp >= 37.5) {
      return { label: "Demam", color: "text-orange-600", bg: "bg-orange-50" };
    } else if (temp < 35) {
      return {
        label: "Hipotermia",
        color: "text-blue-600",
        bg: "bg-blue-50",
      };
    }
    return { label: "Normal", color: "text-green-600", bg: "bg-green-50" };
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        title="Sistem Absensi & Screening Kesehatan"
        subtitle="Face Recognition, Health Monitoring & Pre-work Screening"
      />

      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
            <p className="text-xs text-gray-600">Total Absensi</p>
            <p className="text-2xl font-bold text-gray-800">
              {todayStats.total}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
            <p className="text-xs text-gray-600">Pekerja Office</p>
            <p className="text-2xl font-bold text-gray-800">
              {todayStats.office}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-indigo-500">
            <p className="text-xs text-gray-600">Driver</p>
            <p className="text-2xl font-bold text-gray-800">
              {todayStats.driver}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
            <p className="text-xs text-gray-600">Screening Lolos</p>
            <p className="text-2xl font-bold text-gray-800">
              {todayStats.passed}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
            <p className="text-xs text-gray-600">Screening Gagal</p>
            <p className="text-2xl font-bold text-gray-800">
              {todayStats.failed}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-cyan-500">
            <p className="text-xs text-gray-600">Face Recognition</p>
            <p className="text-2xl font-bold text-gray-800">
              {todayStats.faceSuccess}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <FunnelIcon className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Filter:</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilterRole("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterRole === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilterRole("office")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterRole === "office"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Office
              </button>
              <button
                onClick={() => setFilterRole("driver")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterRole === "driver"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Driver
              </button>
            </div>

            <div className="w-px h-8 bg-gray-300"></div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Semua Status
              </button>
              <button
                onClick={() => setFilterStatus("passed")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === "passed"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Lolos
              </button>
              <button
                onClick={() => setFilterStatus("failed")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === "failed"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Gagal
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Attendance List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                Log Absensi Hari Ini ({filteredAttendances.length})
              </h2>

              <div className="space-y-3">
                {filteredAttendances.map((attendance) => {
                  const bpStatus = getBloodPressureStatus(
                    attendance.health.bloodPressureSystolic,
                    attendance.health.bloodPressureDiastolic,
                  );
                  const tempStatus = getTemperatureStatus(
                    attendance.health.bodyTemperature,
                  );

                  return (
                    <div
                      key={attendance.id}
                      onClick={() => setSelectedRecord(attendance)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedRecord?.id === attendance.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {/* Avatar with Face Recognition Status */}
                          <div className="relative">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                                attendance.role === "office"
                                  ? "bg-purple-500"
                                  : "bg-indigo-500"
                              }`}
                            >
                              {attendance.employeeName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            {attendance.faceRecognitionStatus === "success" ? (
                              <CheckCircleIcon className="absolute -bottom-1 -right-1 w-5 h-5 text-green-600 bg-white rounded-full" />
                            ) : (
                              <XCircleIcon className="absolute -bottom-1 -right-1 w-5 h-5 text-red-600 bg-white rounded-full" />
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-bold text-gray-800">
                                {attendance.employeeName}
                              </p>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                                  attendance.role === "office"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-indigo-100 text-indigo-700"
                                }`}
                              >
                                {attendance.role === "office"
                                  ? "Office"
                                  : "Driver"}
                              </span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                                  attendance.screeningPassed
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {attendance.screeningPassed
                                  ? "✓ Lolos"
                                  : "✗ Gagal"}
                              </span>
                            </div>

                            <p className="text-sm text-gray-600 mt-1">
                              ID: {attendance.employeeId} •{" "}
                              {attendance.timestamp.toLocaleString("id-ID")}
                            </p>

                            {/* Quick Health Info */}
                            <div className="flex gap-3 mt-2 flex-wrap">
                              <div className="flex items-center gap-1">
                                <HeartIcon className="w-4 h-4 text-red-500" />
                                <span className="text-xs text-gray-700">
                                  {attendance.health.bloodPressureSystolic}/
                                  {attendance.health.bloodPressureDiastolic}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-sm">🌡️</span>
                                <span className="text-xs text-gray-700">
                                  {attendance.health.bodyTemperature}°C
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CameraIcon className="w-4 h-4 text-blue-500" />
                                <span className="text-xs text-gray-700">
                                  {attendance.faceMatchScore.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Status Icon */}
                        <div>
                          {attendance.screeningPassed &&
                          attendance.faceRecognitionStatus === "success" ? (
                            <CheckCircleIcon className="w-8 h-8 text-green-500" />
                          ) : (
                            <XCircleIcon className="w-8 h-8 text-red-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {selectedRecord ? (
              <div className="bg-white rounded-lg shadow-md p-6 space-y-6 sticky top-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Detail Absensi
                  </h3>

                  {/* Employee Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                          selectedRecord.role === "office"
                            ? "bg-purple-500"
                            : "bg-indigo-500"
                        }`}
                      >
                        {selectedRecord.employeeName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">
                          {selectedRecord.employeeName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedRecord.employeeId}
                        </p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-semibold inline-block mt-1 ${
                            selectedRecord.role === "office"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-indigo-100 text-indigo-700"
                          }`}
                        >
                          {selectedRecord.role === "office"
                            ? "Office"
                            : "Driver"}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600">Waktu Absensi</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {selectedRecord.timestamp.toLocaleString("id-ID")}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600">Lokasi</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {selectedRecord.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Face Recognition */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <CameraIcon className="w-5 h-5" />
                    Face Recognition
                  </h4>
                  <div
                    className={`p-4 rounded-lg border-2 ${
                      selectedRecord.faceRecognitionStatus === "success"
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">
                        Status:
                      </span>
                      <span
                        className={`font-bold ${
                          selectedRecord.faceRecognitionStatus === "success"
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {selectedRecord.faceRecognitionStatus === "success"
                          ? "✓ Terverifikasi"
                          : "✗ Gagal"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">
                        Match Score:
                      </span>
                      <span className="text-lg font-bold text-gray-800">
                        {selectedRecord.faceMatchScore.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`h-full rounded-full ${
                          selectedRecord.faceMatchScore >= 90
                            ? "bg-green-500"
                            : selectedRecord.faceMatchScore >= 80
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${selectedRecord.faceMatchScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Health Data */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <HeartIcon className="w-5 h-5" />
                    Data Kesehatan
                  </h4>

                  {/* Blood Pressure */}
                  <div className="space-y-3">
                    <div
                      className={`p-3 rounded-lg border ${
                        getBloodPressureStatus(
                          selectedRecord.health.bloodPressureSystolic,
                          selectedRecord.health.bloodPressureDiastolic,
                        ).bg
                      }`}
                    >
                      <p className="text-xs text-gray-600 mb-1">
                        Tekanan Darah
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-gray-800">
                          {selectedRecord.health.bloodPressureSystolic}/
                          {selectedRecord.health.bloodPressureDiastolic}
                        </span>
                        <span className="text-xs">mmHg</span>
                      </div>
                      <p
                        className={`text-xs font-semibold mt-1 ${
                          getBloodPressureStatus(
                            selectedRecord.health.bloodPressureSystolic,
                            selectedRecord.health.bloodPressureDiastolic,
                          ).color
                        }`}
                      >
                        {
                          getBloodPressureStatus(
                            selectedRecord.health.bloodPressureSystolic,
                            selectedRecord.health.bloodPressureDiastolic,
                          ).label
                        }
                      </p>
                    </div>

                    {/* Body Temperature */}
                    <div
                      className={`p-3 rounded-lg border ${
                        getTemperatureStatus(
                          selectedRecord.health.bodyTemperature,
                        ).bg
                      }`}
                    >
                      <p className="text-xs text-gray-600 mb-1">Suhu Tubuh</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-gray-800">
                          {selectedRecord.health.bodyTemperature.toFixed(1)}
                        </span>
                        <span className="text-xs">°C</span>
                      </div>
                      <p
                        className={`text-xs font-semibold mt-1 ${
                          getTemperatureStatus(
                            selectedRecord.health.bodyTemperature,
                          ).color
                        }`}
                      >
                        {
                          getTemperatureStatus(
                            selectedRecord.health.bodyTemperature,
                          ).label
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Screening Results */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <ClipboardDocumentCheckIcon className="w-5 h-5" />
                    Screening Pra Kerja
                  </h4>

                  <div
                    className={`p-4 rounded-lg border-2 mb-3 ${
                      selectedRecord.screeningPassed
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <p
                      className={`font-bold ${
                        selectedRecord.screeningPassed
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {selectedRecord.screeningPassed
                        ? "✓ Lolos Screening"
                        : "✗ Tidak Lolos Screening"}
                    </p>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedRecord.screening.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 rounded-lg text-sm"
                      >
                        <p className="text-gray-700 mb-2">{item.question}</p>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-600">
                            Jawaban:
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              item.answer === "no"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {item.answer === "no" ? "Tidak" : "Ya"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-4 border-t">
                  {!selectedRecord.screeningPassed && (
                    <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-medium transition-colors">
                      Kirim ke Medical Review
                    </button>
                  )}
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
                    Export Detail
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 h-96 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <UserIcon className="w-16 h-16 mx-auto mb-3" />
                  <p>Pilih record absensi untuk melihat detail</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

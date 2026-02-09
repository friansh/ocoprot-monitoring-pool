import { useNavigate } from "react-router";
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface HeaderProps {
  title: string;
  subtitle?: string;
  companyName?: string;
}

export default function Header({
  title,
  subtitle,
  companyName = "PT Lorem Ipsum",
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 shadow-lg py-4 px-5 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Tombol Kembali ke Menu */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 bg-slate-600/50 hover:bg-slate-600 px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg group"
              title="Kembali ke Menu Utama"
            >
              <HomeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Menu Utama</span>
            </button>

            {/* Divider */}
            <div className="w-px h-10 bg-slate-600"></div>

            {/* Title Section */}
            <div>
              <h1 className="text-2xl font-semibold mb-1">{title}</h1>
              {subtitle && <p className="text-slate-300 text-sm">{subtitle}</p>}
              {!subtitle && (
                <p className="text-slate-300 text-sm">{companyName}</p>
              )}
            </div>
          </div>

          {/* Status Indicator */}
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">Sistem Aktif</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {new Date().toLocaleString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

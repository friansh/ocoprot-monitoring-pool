export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 px-5 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <p className="text-sm mb-2">🔹 Monitoring Real-time 24/7</p>
            <p className="text-sm mb-2">🔹 Multi-sensor Integration</p>
            <p className="text-sm">🔹 Data Analytics & Reporting</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm">
          <p>
            &copy; 2026 PT Lorem Ipsum. All rights reserved. | Sistem Monitoring
            Lingkungan v1.0
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useState } from "react";
import { Bar, Pie } from "recharts";
import { FiBell, FiUpload, FiDownload, FiSearch } from "react-icons/fi";
import { Sidebar } from "./components/Sidebar";
import { Notification } from "./components/Notification";

export default function DashboardPemohon() {
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Permohonan Anda sedang dalam proses audit." },
    { id: 2, message: "Dokumen tambahan diperlukan." },
  ]);

  const permohonan = [
    { id: "001", status: "Dalam Proses", date: "2024-02-06" },
    { id: "002", status: "Disetujui", date: "2024-01-30" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Dashboard Pemohon</h1>
          <FiBell className="text-gray-600 text-2xl cursor-pointer" />
        </div>

        {/* Progress Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Status Permohonan</h2>
          <div className="w-full bg-gray-200 h-4 rounded-lg overflow-hidden">
            <div className="bg-blue-500 h-full w-2/3"></div>
          </div>
          <p className="text-gray-600 mt-2">Progress: 67% (Dalam Proses Audit)</p>
        </div>

        {/* Riwayat Permohonan */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Riwayat Permohonan</h2>
            <div className="flex items-center border px-3 py-1 rounded-lg">
              <FiSearch className="text-gray-600" />
              <input
                type="text"
                placeholder="Cari..."
                className="ml-2 outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <table className="w-full border-collapse border rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">ID</th>
                <th className="p-2">Status</th>
                <th className="p-2">Tanggal</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {permohonan
                .filter((p) => p.id.includes(searchTerm))
                .map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-2">{p.id}</td>
                    <td className="p-2">{p.status}</td>
                    <td className="p-2">{p.date}</td>
                    <td className="p-2">
                      <button className="text-blue-500 flex items-center">
                        <FiDownload className="mr-1" /> Download
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Upload Dokumen */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Unggah Dokumen</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
            <FiUpload className="mr-2" /> Unggah
          </button>
        </div>
      </div>

      <Notification notifications={notifications} />
    </div>
  );
}

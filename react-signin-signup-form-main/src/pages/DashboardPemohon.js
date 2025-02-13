import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardPemohon() {
  const navigate = useNavigate();

  // Cek status login
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userEmail = localStorage.getItem("userEmail");

    if (!isLoggedIn || !userEmail) {
      // Redirect ke halaman login jika belum login
      navigate("/");
    }
  }, [navigate]);

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userEmail = localStorage.getItem("userEmail");

  if (!isLoggedIn || !userEmail) {
    return null; // Hentikan render jika belum login
  }

  // Fungsi untuk logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg flex">
          {/* Sidebar */}
          <div className="w-1/4 p-6 border-r">
            <div className="flex items-center mb-8">
              <img
                alt="Logo"
                className="mr-3"
                height="40"
                src="https://storage.googleapis.com/a1aa/image/VeaPu6ZJE_1J0AOeiqZw-ffuU5cgB2fI0zH1LvKyR14.jpg"
                width="40"
              />
              <span className="text-xl font-bold">Permit Dashboard</span>
            </div>
            <div className="mb-8">
              <input
                className="w-full p-2 border rounded-lg"
                placeholder="Search"
                type="text"
              />
            </div>
            <nav className="mb-8">
              <ul>
                <li className="mb-4">
                  <a className="text-gray-600" href="#">
                    Dashboard
                  </a>
                </li>
                <li className="mb-4">
                  <a className="text-gray-600 font-bold" href="#">
                    Application Status
                  </a>
                </li>
                <li className="mb-4">
                  <a className="text-gray-600" href="#">
                    Request History
                  </a>
                </li>
                <li className="mb-4">
                  <a className="text-gray-600" href="#">
                    Notifications
                  </a>
                </li>
                <li className="mb-4">
                  <a className="text-gray-600" href="#">
                    Upload Documents
                  </a>
                </li>
                <li className="mb-4">
                  <a className="text-gray-600" href="#">
                    Download Documents
                  </a>
                </li>
              </ul>
            </nav>
            <div className="flex items-center mb-8">
              <img
                alt="User Avatar"
                className="rounded-full mr-3"
                height="40"
                src="https://storage.googleapis.com/a1aa/image/1uLS9tTltAzturzR3uKjtLh4lp6Lapdmw2s-ffoHdYE.jpg"
                width="40"
              />
              <span className="text-gray-600">{userEmail}</span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          {/* Main Content */}
          <div className="w-3/4 p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <img
                  alt="Application Icon"
                  className="mr-3"
                  height="40"
                  src="https://storage.googleapis.com/a1aa/image/k_0xCJZN0rtjrj3UV8H7gD6a4TEd07Q1M4P9GoFZcOY.jpg"
                  width="40"
                />
                <div>
                  <h2 className="text-xl font-bold">Application Status</h2>
                  <span className="text-gray-600">
                    Application Number: 123456
                  </span>
                </div>
              </div>
              <button className="p-2 border rounded-lg">
                <i className="fas fa-calendar-alt"></i> Calendar
              </button>
            </div>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">
                  Submission Date: January 15, 2023
                </span>
                <span className="text-gray-600">Current Status: In Process</span>
              </div>
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Application Progress</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Submission</span>
                  <span>Document Evaluation</span>
                  <span>Audit</span>
                  <span>Decision</span>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Uploaded Documents</h3>
                <div className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      alt="Document Icon"
                      className="mr-3"
                      height="40"
                      src="https://storage.googleapis.com/a1aa/image/NE1S3laHlswB-VM9UcK8jlCFTNeac3vOSCBcZMFsOeM.jpg"
                      width="40"
                    />
                    <div>
                      <h4 className="text-md font-bold">Document 1</h4>
                      <span className="text-gray-600">Status: Verified</span>
                    </div>
                  </div>
                  <button className="p-2 border rounded-lg">
                    <i className="fas fa-download"></i>
                  </button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      alt="Document Icon"
                      className="mr-3"
                      height="40"
                      src="https://storage.googleapis.com/a1aa/image/NE1S3laHlswB-VM9UcK8jlCFTNeac3vOSCBcZMFsOeM.jpg"
                      width="40"
                    />
                    <div>
                      <h4 className="text-md font-bold">Document 2</h4>
                      <span className="text-gray-600">Status: Incomplete</span>
                    </div>
                  </div>
                  <button className="p-2 border rounded-lg">
                    <i className="fas fa-upload"></i>
                  </button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      alt="Document Icon"
                      className="mr-3"
                      height="40"
                      src="https://storage.googleapis.com/a1aa/image/NE1S3laHlswB-VM9UcK8jlCFTNeac3vOSCBcZMFsOeM.jpg"
                      width="40"
                    />
                    <div>
                      <h4 className="text-md font-bold">Document 3</h4>
                      <span className="text-gray-600">Status: Rejected</span>
                    </div>
                  </div>
                  <button className="p-2 border rounded-lg">
                    <i className="fas fa-upload"></i>
                  </button>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">
                  Notifications & Reminders
                </h3>
                <div className="bg-white p-4 rounded-lg shadow mb-4">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-bell text-yellow-500 mr-3"></i>
                    <span className="text-gray-600">
                      Permit validity ends in 30 days. Please renew.
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <i className="fas fa-bell text-yellow-500 mr-3"></i>
                    <span className="text-gray-600">
                      Additional documents needed for audit.
                    </span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-bell text-yellow-500 mr-3"></i>
                    <span className="text-gray-600">
                      Latest decision: In Process
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-1/4 p-6 border-l">
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4">Quick Access</h3>
              <div className="flex items-center mb-4">
                <img
                  alt="Status Icon"
                  className="mr-3"
                  height="40"
                  src="https://storage.googleapis.com/a1aa/image/aIDu8NW-zKH1pzHJTRAxjLlJG3jO0E7NS8pdqtixcYI.jpg"
                  width="40"
                />
                <div>
                  <h4 className="text-md font-bold">Check Status</h4>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <img
                  alt="Upload Icon"
                  className="mr-3"
                  height="40"
                  src="https://storage.googleapis.com/a1aa/image/EQHjAi44eAOMX5SAm8ymd3kWDkmJusBdBntnPpHGBkI.jpg"
                  width="40"
                />
                <div>
                  <h4 className="text-md font-bold">Upload Documents</h4>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <img
                  alt="Renew Icon"
                  className="mr-3"
                  height="40"
                  src="https://storage.googleapis.com/a1aa/image/sDf37Pu8N1BsPvN7njt7juxJQb1-vo36jmczFUV3-ow.jpg"
                  width="40"
                />
                <div>
                  <h4 className="text-md font-bold">Submit Renewal</h4>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <img
                  alt="History Icon"
                  className="mr-3"
                  height="40"
                  src="https://storage.googleapis.com/a1aa/image/_l0c1OlTVvGcm6-eAGpJcS5jafWghphLIzJG9jbYOx0.jpg"
                  width="40"
                />
                <div>
                  <h4 className="text-md font-bold">View History</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPemohon;
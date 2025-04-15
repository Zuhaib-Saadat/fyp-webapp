import { Toaster } from "./components/ui/toaster";
import { Dashboard } from "./components/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 border-b">
        <div className="flex justify-between items-start max-w-7xl mx-auto">
          <div>
            <h2 className="text-xl font-semibold accent-text">Pothole Detection Dashboard</h2>
            <p className="text-sm text-gray-600 mt-1 max-w-2xl">
              This Web App visualizes our Final Year Project: Computer-Vision Based Road Fault Detection Using Yolo11 & RTAB-Mapping.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              By Zohaib Saadat (i21-0946), Ilqa Shahid (i21-0958), Abdullah Naghman (i21-0905)
            </p>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4">
        <Dashboard />
      </main>
      <Toaster />
    </div>
  );
}

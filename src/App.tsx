import { useState } from "react";

import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import EmergencyContactsPage from "./components/EmergencyContactsPage";
import DriverRegistrationPage from "./components/DriverRegistrationPage";
import CameraCheckPage from "./components/CameraCheckPage";
import UserManagementPage from "./components/UserManagementPage";
import CriticalEventPage from "./components/CriticalEventPage";
import IncidentHistoryPage from "./components/IncidentHistoryPage";
import IncidentDetailPage from "./components/IncidentDetailPage";
import SystemPerformancePage from "./components/SystemPerformancePage";

type Page =
  | "login"
  | "dashboard"
  | "contacts"
  | "driverRegistration"
  | "cameraCheck"
  | "users"
  | "criticalEvent"
  | "incidentHistory"
  | "incidentDetail"
  | "performance";

const pages: { id: Page; label: string }[] = [
  { id: "login", label: "Login" },
  { id: "dashboard", label: "Dashboard" },
  { id: "contacts", label: "Contactos emergencia" },
  { id: "driverRegistration", label: "Registro conductor" },
  { id: "cameraCheck", label: "Verificación cámara" },
  { id: "criticalEvent", label: "Evento crítico" },
  { id: "incidentHistory", label: "Historial incidentes" },
  { id: "incidentDetail", label: "Detalle incidente" },
  { id: "performance", label: "Rendimiento sistema" },
  { id: "users", label: "Usuarios" },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login");

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <LoginPage />;
      case "dashboard":
        return <DashboardPage />;
      case "contacts":
        return <EmergencyContactsPage />;
      case "driverRegistration":
        return <DriverRegistrationPage />;
      case "cameraCheck":
        return <CameraCheckPage />;
      case "users":
        return <UserManagementPage />;
      case "criticalEvent":
        return <CriticalEventPage />;
      case "incidentHistory":
        return <IncidentHistoryPage />;
      case "incidentDetail":
        return <IncidentDetailPage />;
      case "performance":
        return <SystemPerformancePage />;
      default:
        return <LoginPage />;
    }
  };

  return (
    <>
      <QuickNavigation currentPage={currentPage} onChangePage={setCurrentPage} />
      {renderPage()}
    </>
  );
}

type QuickNavigationProps = {
  currentPage: Page;
  onChangePage: (page: Page) => void;
};

function QuickNavigation({ currentPage, onChangePage }: QuickNavigationProps) {
  return (
    <div className="fixed left-4 bottom-4 z-[9999] bg-white border border-[#EDE6CE] rounded-xl shadow-xl p-3 max-w-[280px]">
      <p className="text-xs font-bold text-[#706A5A] mb-2 tracking-wide">
        Navegación rápida de todas las paginas
      </p>

      <div className="grid grid-cols-1 gap-2 max-h-[320px] overflow-y-auto">
        {pages.map((page) => {
          const isActive = currentPage === page.id;

          return (
            <button
              key={page.id}
              onClick={() => onChangePage(page.id)}
              className={`text-left px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive
                  ? "bg-[#4A86C0] text-white"
                  : "bg-[#F9F5EC] text-[#2C2A24] hover:bg-[#EBF2FA] hover:text-[#195f97]"
              }`}
            >
              {page.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
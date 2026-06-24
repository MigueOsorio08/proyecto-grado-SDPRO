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

const AUTH_TOKEN_KEY = "safedrive_token";

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem(AUTH_TOKEN_KEY));
  });

  const [currentPage, setCurrentPage] = useState<Page>(() => {
    return localStorage.getItem(AUTH_TOKEN_KEY) ? "dashboard" : "login";
  });

  function handleLoginSuccess(): void {
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
  }

  function handleLogout(): void {
    localStorage.removeItem("safedrive_token");
    localStorage.removeItem("safedrive_user");

    setIsAuthenticated(false);
    setCurrentPage("login");
  }

  const renderPage = () => {
    if (!isAuthenticated) {
      return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }

    switch (currentPage) {
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
        return <DashboardPage />;
    }
  };

  return (
    <>
      {isAuthenticated && (
        <QuickNavigation
          currentPage={currentPage}
          onChangePage={setCurrentPage}
          onLogout={handleLogout}
        />
      )}

      {renderPage()}
    </>
  );
}

type QuickNavigationProps = {
  currentPage: Page;
  onChangePage: (page: Page) => void;
  onLogout: () => void;
};

function QuickNavigation({
  currentPage,
  onChangePage,
  onLogout,
}: QuickNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-4 bottom-4 z-[9999]">
      {isOpen && (
        <div className="mb-3 bg-white border border-[#EDE6CE] rounded-xl shadow-xl p-3 w-[260px] max-h-[420px]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-[#706A5A] tracking-wide">
              Navegación rápida
            </p>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="material-symbols-outlined text-[#706A5A] hover:text-[#195f97] transition-colors text-[20px]"
            >
              close
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1">
            {pages.map((page) => {
              const isActive = currentPage === page.id;

              return (
                <button
                  key={page.id}
                  onClick={() => {
                    onChangePage(page.id);
                    setIsOpen(false);
                  }}
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

          <button
            type="button"
            onClick={onLogout}
            className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 rounded-lg transition-all"
          >
            Cerrar sesión
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#195f97] text-white shadow-xl hover:bg-[#144d7b] active:scale-95 transition-all"
        title="Abrir navegación rápida"
      >
        <span className="material-symbols-outlined">
          {isOpen ? "close" : "menu"}
        </span>
      </button>
    </div>
  );
}
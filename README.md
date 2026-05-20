# SafeDrive

SafeDrive es un sistema web orientado al monitoreo de seguridad vial mediante detección de eventos de riesgo en conductores. La aplicación permite registrar conductores, asociar vehículos, configurar contactos de emergencia, verificar la cámara, iniciar sesiones de monitoreo y consultar incidentes registrados.

## Objetivo del proyecto

El objetivo principal de SafeDrive es apoyar la prevención de accidentes de tránsito mediante una interfaz web que permite visualizar el estado del conductor, detectar posibles eventos críticos como microsueño o distracción, y gestionar la información asociada a cada incidente.

## Funcionalidades principales

- Inicio de sesión para acceso al sistema.
- Dashboard principal de monitoreo.
- Registro de conductores y vehículos.
- Registro de contactos de emergencia.
- Verificación y calibración de cámara.
- Monitoreo activo del conductor.
- Visualización de eventos críticos.
- Historial de incidentes.
- Detalle individual de incidentes.
- Gestión de usuarios.
- Métricas de rendimiento del sistema.

## Pantallas del sistema

El proyecto incluye las siguientes vistas principales:

```txt
LoginPage.tsx
DashboardPage.tsx
DriverRegistrationPage.tsx
EmergencyContactsPage.tsx
CameraCheckPage.tsx
CriticalEventPage.tsx
IncidentHistoryPage.tsx
IncidentDetailPage.tsx
SystemPerformancePage.tsx
UserManagementPage.tsx

# Flujo general del sistema
Login
  ↓
Dashboard
  ↓
Registro de conductor y vehículo
  ↓
Contactos de emergencia
  ↓
Verificación de cámara
  ↓
Monitoreo activo
  ↓
Evento crítico
  ↓
Historial de incidentes
  ↓
Detalle del incidente


#Tecnologías utilizadas

* React
* TypeScript
* Vite
* Tailwind CSS
* Material Symbols Icons
* Google Fonts

#Estructura del proyecto

safedrive/
├── public/
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── components/
│   │   ├── CameraCheckPage.tsx
│   │   ├── CriticalEventPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── DriverRegistrationPage.tsx
│   │   ├── EmergencyContactsPage.tsx
│   │   ├── IncidentDetailPage.tsx
│   │   ├── IncidentHistoryPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SystemPerformancePage.tsx
│   │   └── UserManagementPage.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── mockData.ts
│   └── types.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
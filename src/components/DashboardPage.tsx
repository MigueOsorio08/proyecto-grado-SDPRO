import { useEffect, useRef, useState } from "react";

type AlertSeverity = "normal" | "warning" | "danger";

type DashboardPageProps = {
  onLogout?: () => void;
};

type AuthUser = {
  id: number;
  name: string;
  email: string;
  document_number?: string;
};

type ApiUserResponse = {
  user: AuthUser;
};

type DriverStateResponse = {
  [key: string]: unknown;

  status?: string;
  state?: string;
  driver_state?: string;
  alert_level?: string;
  alert_type?: string;
  event_type?: string;
  message?: string;

  is_microsleep?: boolean;
  microsleep?: boolean;
  microsleep_detected?: boolean;

  is_sleeping?: boolean;
  sleeping?: boolean;
  sleep_detected?: boolean;
  asleep?: boolean;

  is_critical?: boolean;
  critical?: boolean;

  eyes_closed?: boolean;
  is_eyes_closed?: boolean;

  no_face?: boolean;
  face_detected?: boolean;

  head_down?: boolean;
  is_head_down?: boolean;

  eyes_closed_seconds?: number;
  no_face_seconds?: number;
  head_down_seconds?: number;
  ear?: number | null;
};

type CameraStatus = "ACTIVE" | "OFFLINE";
type MonitoringStatus = "Healthy" | "Microsleep" | "Sleeping" | "Warning" | "Offline";

type SafetyFlag = {
  id: string;
  icon: string;
  label: string;
  time: string;
  muted?: boolean;
};


const AUTH_TOKEN_KEY = "safedrive_token";
const AUTH_USER_KEY = "safedrive_user";

const rawApiBaseUrl =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "http://localhost:8000";

const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, "");

const DRIVER_STATE_WS_URL =
  (import.meta.env.VITE_DRIVER_STATE_WS_URL as string | undefined) ??
  "ws://localhost:8001/api/v1/driver-state/live";

export default function DashboardPage({
  onLogout,
}: DashboardPageProps): React.JSX.Element {
  const lastIncidentSentAtRef = useRef<number>(0);
  const lastIncidentTypeRef = useRef<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const frameIntervalRef = useRef<number | null>(null);
  const durationIntervalRef = useRef<number | null>(null);
  const sessionStartedAtRef = useRef<Date>(new Date());
  const lastAlertTypeRef = useRef<string | null>(null);
  const isSendingFrameRef = useRef<boolean>(false);

  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedUser = localStorage.getItem(AUTH_USER_KEY);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as AuthUser;
    } catch {
      return null;
    }
  });

  const [cameraStatus, setCameraStatus] = useState<CameraStatus>("OFFLINE");
  const [monitoringStatus, setMonitoringStatus] =
    useState<MonitoringStatus>("Offline");
  const [monitoringTag, setMonitoringTag] = useState<string>("Camera");
  const [lastEvent, setLastEvent] = useState<string>("None");
  const [lastEventFooter, setLastEventFooter] =
    useState<string>("Sin eventos recientes");
  const [sessionDuration, setSessionDuration] = useState<string>("00:00:00");
  const [safetyFlags, setSafetyFlags] = useState<SafetyFlag[]>([]);

  const [sessionStart] = useState<string>(() => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(sessionStartedAtRef.current);
  });

  useEffect(() => {
    void initializeDashboard();

    durationIntervalRef.current = window.setInterval(() => {
      updateSessionDuration();
    }, 1000);

    return () => {
      stopFrameSender();
      closeDriverStateSocket();
      stopCamera();

      if (durationIntervalRef.current) {
        window.clearInterval(durationIntervalRef.current);
      }
    };
  }, []);

  async function initializeDashboard(): Promise<void> {
    await loadAuthenticatedUser();
    await startCamera();
    connectDriverStateSocket();
  }

  async function loadAuthenticatedUser(): Promise<void> {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (!token) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/user`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          handleLogout();
        }

        return;
      }

      const data = (await response.json()) as ApiUserResponse;

      if (data.user) {
        setUser(data.user);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
      }
    } catch (error) {
      console.error("Could not load authenticated user:", error);
    }
  }

  async function startCamera(): Promise<void> {
    try {
      if (streamRef.current) {
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: false,
      });

      streamRef.current = stream;

      if (!videoRef.current) {
        return;
      }

      videoRef.current.srcObject = stream;

      await videoRef.current.play();

      setCameraStatus("ACTIVE");
      setMonitoringStatus("Healthy");
      setMonitoringTag("Normal");
    } catch (error) {
      console.error("Could not start dashboard camera:", error);
      setCameraStatus("OFFLINE");
      setMonitoringStatus("Offline");
      setMonitoringTag("Camera");
    }
  }

  function stopCamera(): void {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }

  function connectDriverStateSocket(): void {
    if (
      socketRef.current &&
      socketRef.current.readyState !== WebSocket.CLOSED
    ) {
      return;
    }

    const socket = new WebSocket(DRIVER_STATE_WS_URL);

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Driver state WebSocket connected");
      startFrameSender();
    };

    socket.onmessage = (event: MessageEvent<string>) => {
      try {
        const payload = JSON.parse(event.data) as DriverStateResponse;
        handleDriverStateResponse(payload);
      } catch (error) {
        console.error("Invalid driver state response:", event.data, error);
      }
    };

    socket.onerror = (event) => {
      console.error("Driver state WebSocket error:", event);
      setMonitoringStatus("Offline");
      setMonitoringTag("Service");
    };

    socket.onclose = () => {
      console.warn("Driver state WebSocket closed");
      stopFrameSender();

      if (cameraStatus === "ACTIVE") {
        setMonitoringStatus("Offline");
        setMonitoringTag("Service");
      }
    };
  }

  function closeDriverStateSocket(): void {
    socketRef.current?.close();
    socketRef.current = null;
  }

  function startFrameSender(): void {
    if (frameIntervalRef.current) {
      return;
    }

    frameIntervalRef.current = window.setInterval(() => {
      void sendCurrentFrame();
    }, 350);
  }

  function stopFrameSender(): void {
    if (!frameIntervalRef.current) {
      return;
    }

    window.clearInterval(frameIntervalRef.current);
    frameIntervalRef.current = null;
  }

  async function sendCurrentFrame(): Promise<void> {
    const socket = socketRef.current;

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      return;
    }

    if (isSendingFrameRef.current) {
      return;
    }

    isSendingFrameRef.current = true;

    try {
      const blob = await captureCurrentFrame();

      if (!blob) {
        return;
      }

      const buffer = await blob.arrayBuffer();

      socket.send(buffer);
    } catch (error) {
      console.error("Could not send frame:", error);
    } finally {
      isSendingFrameRef.current = false;
    }
  }

  async function captureCurrentFrame(): Promise<Blob | null> {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      return null;
    }

    if (!video.videoWidth || !video.videoHeight) {
      return null;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      return null;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/jpeg",
        0.8
      );
    });
  }
  function getPayloadText(payload: DriverStateResponse): string {
  return [
    payload.status,
    payload.state,
    payload.driver_state,
    payload.alert_level,
    payload.alert_type,
    payload.event_type,
    payload.message,
  ]
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .toLowerCase();
}

function includesAny(value: string, words: string[]): boolean {
  return words.some((word) => value.includes(word));
}

function getCurrentTime(): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

async function getCurrentLocation(): Promise<{
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
}> {
  if (!navigator.geolocation) {
    return {
      latitude: null,
      longitude: null,
      accuracy: null,
    };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      () => {
        resolve({
          latitude: null,
          longitude: null,
          accuracy: null,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 10000,
      }
    );
  });
}

async function reportDriverIncident(
  eventType: string,
  severity: "warning" | "critical",
  message: string,
  payload: DriverStateResponse
): Promise<void> {
  const now = Date.now();

  if (
    lastIncidentTypeRef.current === eventType &&
    now - lastIncidentSentAtRef.current < 60_000
  ) {
    return;
  }

  lastIncidentTypeRef.current = eventType;
  lastIncidentSentAtRef.current = now;

  const token = localStorage.getItem("safedrive_token");

  if (!token) {
    return;
  }

  const location = await getCurrentLocation();
  const snapshot = await captureCurrentFrame();

  const formData = new FormData();

  formData.append("event_type", eventType);
  formData.append("severity", severity);
  formData.append("message", message);
  formData.append("detected_at", new Date().toISOString());
  formData.append("python_payload", JSON.stringify(payload));

  if (location.latitude !== null) {
    formData.append("latitude", String(location.latitude));
  }

  if (location.longitude !== null) {
    formData.append("longitude", String(location.longitude));
  }

  if (location.accuracy !== null) {
    formData.append("accuracy", String(location.accuracy));
  }

  if (snapshot) {
    formData.append(
      "snapshot",
      new File([snapshot], `driver-alert-${Date.now()}.jpg`, {
        type: "image/jpeg",
      })
    );
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/driver-alert-events`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json().catch(() => null);

    console.log("Driver incident report response:", {
      status: response.status,
      data,
    });
  } catch (error) {
    console.error("Could not report driver incident:", error);
  }
}

function handleDriverStateResponse(payload: DriverStateResponse): void {
  console.log("Driver state update:", payload);

  const payloadText = getPayloadText(payload);

  const isCritical =
    payload.is_critical === true ||
    payload.critical === true ||
    includesAny(payloadText, [
      "critical",
      "critico",
      "crítico",
      "danger",
      "high_risk",
      "high risk",
    ]);

  const isSleeping =
    payload.is_sleeping === true ||
    payload.sleeping === true ||
    payload.sleep_detected === true ||
    payload.asleep === true ||
    includesAny(payloadText, [
      "sleeping",
      "asleep",
      "sleep",
      "dormido",
      "sueño crítico",
      "sueno critico",
    ]);

  const isMicrosleep =
    payload.is_microsleep === true ||
    payload.microsleep === true ||
    payload.microsleep_detected === true ||
    includesAny(payloadText, [
      "microsleep",
      "micro_sleep",
      "micro sleep",
      "microsueño",
      "microsueno",
    ]);

  const isNoFace =
    payload.no_face === true ||
    payload.face_detected === false ||
    includesAny(payloadText, [
      "no_face",
      "no face",
      "face not detected",
      "driver face not detected",
      "sin rostro",
      "rostro no detectado",
    ]);

  const isHeadDown =
    payload.head_down === true ||
    payload.is_head_down === true ||
    includesAny(payloadText, [
      "head_down",
      "head down",
      "cabeza abajo",
    ]);

  const isEyesClosed =
    payload.eyes_closed === true ||
    payload.is_eyes_closed === true ||
    includesAny(payloadText, [
      "eyes_closed",
      "eyes closed",
      "closed eyes",
      "ojos cerrados",
    ]);

  const message =
    typeof payload.message === "string" && payload.message.trim().length > 0
      ? payload.message
      : null;

  if (isCritical || isSleeping) {
    setMonitoringStatus("Sleeping");
    setMonitoringTag("Critical");
    setLastEvent(message ?? "Critical Sleep Alert");
    setLastEventFooter(`Actualizado ${getCurrentTime()}`);
    registerSafetyFlag("sleeping", message ?? "Critical Sleep Alert", "bedtime");

    void reportDriverIncident(
        "sleeping",
        "critical",
        message ?? "Critical Sleep Alert",
        payload
      );
    return;
  }

  if (isMicrosleep) {
    setMonitoringStatus("Microsleep");
    setMonitoringTag("Alert");
    setLastEvent(message ?? "Microsleep Detected");
    setLastEventFooter(`Actualizado ${getCurrentTime()}`);
    registerSafetyFlag(
      "microsleep",
      message ?? "Microsleep Detected",
      "visibility_off"
    );

      void reportDriverIncident(
        "microsleep",
        "critical",
        message ?? "Microsleep Detected",
        payload
      );
    return;
  }

  if (isNoFace) {
    setMonitoringStatus("Warning");
    setMonitoringTag("No Face");
    setLastEvent(message ?? "Driver Face Not Detected");
    setLastEventFooter(`Actualizado ${getCurrentTime()}`);
    registerSafetyFlag(
      "no_face",
      message ?? "Driver Face Not Detected",
      "person_off"
    );
    return;
  }

  if (isHeadDown) {
    setMonitoringStatus("Warning");
    setMonitoringTag("Head Down");
    setLastEvent(message ?? "Head Down Detected");
    setLastEventFooter(`Actualizado ${getCurrentTime()}`);
    registerSafetyFlag(
      "head_down",
      message ?? "Head Down Detected",
      "south"
    );
    return;
  }

  if (isEyesClosed) {
    setMonitoringStatus("Warning");
    setMonitoringTag("Eyes");
    setLastEvent(message ?? "Eyes Closed Warning");
    setLastEventFooter(`Actualizado ${getCurrentTime()}`);
    registerSafetyFlag(
      "eyes_closed",
      message ?? "Eyes Closed Warning",
      "visibility_off"
    );
    return;
  }

  setMonitoringStatus("Healthy");
  setMonitoringTag("Normal");

  setLastEvent(message ?? "Normal");
  setLastEventFooter(`Actualizado ${getCurrentTime()}`);

  lastAlertTypeRef.current = null;
}

function registerSafetyFlag(
  type: string,
  label: string,
  icon: string
): void {
  const time = getCurrentTime();

  setLastEvent(label);
  setLastEventFooter(`Actualizado ${time}`);

  if (lastAlertTypeRef.current === type) {
    setSafetyFlags((currentFlags) => {
      if (currentFlags.length === 0) {
        return currentFlags;
      }

      const [firstFlag, ...restFlags] = currentFlags;

      return [
        {
          ...firstFlag,
          label,
          time,
          muted: false,
        },
        ...restFlags.map((flag) => ({
          ...flag,
          muted: true,
        })),
      ];
    });

    return;
  }

  lastAlertTypeRef.current = type;

  const newFlag: SafetyFlag = {
    id: `${type}-${Date.now()}`,
    icon,
    label,
    time,
  };

  setSafetyFlags((currentFlags) => {
    return [newFlag, ...currentFlags].slice(0, 5).map((flag, index) => ({
      ...flag,
      muted: index > 0,
    }));
  });
}

  function updateSessionDuration(): void {
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - sessionStartedAtRef.current.getTime()) / 1000
    );

    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    setSessionDuration(
      `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`
    );
  }

  function handleLogout(): void {
    stopFrameSender();
    closeDriverStateSocket();
    stopCamera();

    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);

    if (onLogout) {
      onLogout();
      return;
    }

    window.location.href = "/login";
  }

  function getAlertSeverity(): AlertSeverity {
  if (
    monitoringStatus === "Sleeping" ||
    monitoringStatus === "Microsleep" ||
    monitoringTag === "Critical" ||
    monitoringTag === "Alert"
  ) {
    return "danger";
  }

  if (
    monitoringStatus === "Warning" ||
    monitoringTag === "Eyes" ||
    monitoringTag === "No Face" ||
    monitoringTag === "Head Down"
  ) {
    return "warning";
  }

  return "normal";
}

const alertSeverity = getAlertSeverity();

const isDanger = alertSeverity === "danger";
const isWarning = alertSeverity === "warning";

const pageClassName = isDanger
  ? "bg-red-50 text-[#2C2A24] font-sans min-h-screen transition-colors duration-300"
  : isWarning
    ? "bg-amber-50 text-[#2C2A24] font-sans min-h-screen transition-colors duration-300"
    : "bg-[#FDFAF5] text-[#2C2A24] font-sans min-h-screen transition-colors duration-300";

const liveFeedClassName = isDanger
  ? "relative rounded-xl overflow-hidden border-4 border-red-500 shadow-[0px_0px_45px_rgba(220,38,38,0.45)] bg-red-100 aspect-video md:aspect-[21/9] animate-pulse"
  : isWarning
    ? "relative rounded-xl overflow-hidden border-4 border-amber-400 shadow-[0px_0px_35px_rgba(245,158,11,0.35)] bg-amber-100 aspect-video md:aspect-[21/9]"
    : "relative rounded-xl overflow-hidden border-4 border-white shadow-[0px_4px_20px_rgba(44,42,36,0.04)] bg-[#e7e8ed] aspect-video md:aspect-[21/9]";

const statusBadgeClassName = isDanger
  ? "flex items-center gap-2 bg-red-600 px-4 py-1.5 rounded-full shadow-sm"
  : isWarning
    ? "flex items-center gap-2 bg-amber-500 px-4 py-1.5 rounded-full shadow-sm"
    : "flex items-center gap-2 bg-[#EAF4EE] px-4 py-1.5 rounded-full shadow-sm";

const statusDotClassName = isDanger
  ? "w-2 h-2 rounded-full bg-white animate-ping"
  : isWarning
    ? "w-2 h-2 rounded-full bg-white animate-pulse"
    : "w-2 h-2 rounded-full bg-[#5DAB7D] animate-pulse";

const statusTextClassName = isDanger || isWarning
  ? "text-[14px] font-semibold text-white uppercase tracking-wider"
  : "text-[14px] font-semibold text-[#5DAB7D] uppercase tracking-wider";

  const driverName = user?.name ?? "Usuario no identificado";
  const driverDescription = user?.email ?? "Sesión biométrica activa";
  const documentNumber = user?.document_number ?? "N/A";

  
  return (
    <div className={pageClassName}>
      {isDanger && (
        <div className="fixed inset-0 z-[9997] pointer-events-none bg-red-600/10 animate-pulse" />
      )}
      <header className="bg-white text-[#195f97] shadow-sm border-b border-[#e1e2e7] flex justify-between items-center w-full px-5 md:px-10 h-16 z-50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#195f97]">
            shield_with_heart
          </span>

          <h1 className="text-[24px] font-bold text-[#195f97] tracking-tight">
            SafeDrive
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="material-symbols-outlined p-2 hover:bg-[#e7e8ed] transition-colors duration-200 rounded-full"
            type="button"
            title="Cerrar sesión"
            onClick={handleLogout}
          >
            account_circle
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        <aside className="hidden md:flex flex-col w-20 bg-[#F9F5EC] border-r border-[#F3EDD9] items-center py-8 gap-8">
          <nav className="flex flex-col gap-6 w-full items-center">
            <a
              className="group flex flex-col items-center justify-center bg-[#a3f4c1] text-[#207249] rounded-full px-4 py-2 transition-all duration-200"
              href="#"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                speed
              </span>
            </a>
            <a
              className="group flex flex-col items-center justify-center text-[#41474f] hover:text-[#195f97] transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">settings</span>
            </a>
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-5 md:p-10 pb-28 md:pb-10">
          <div className="max-w-6xl mx-auto space-y-8">
            <section className={liveFeedClassName}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover opacity-90"
              />

              <canvas ref={canvasRef} className="hidden" />

              <div className="absolute inset-0 pointer-events-none border-[1.5px] border-dashed border-[#C5DAF0] rounded-lg m-12 opacity-40" />

              <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className={statusBadgeClassName}>
                  <span className={statusDotClassName} />
                  <span className={statusTextClassName}>
                    {isDanger ? "DANGER" : isWarning ? "WARNING" : cameraStatus}
                  </span>
                </div>
              </div>
{alertSeverity !== "normal" && (
  <div className="absolute inset-x-6 top-20 z-20">
    <div
      className={`rounded-xl px-5 py-4 shadow-2xl border backdrop-blur-md ${
        isDanger
          ? "bg-red-600/95 border-red-300 text-white"
          : "bg-amber-400/95 border-amber-200 text-[#2C2A24]"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-[32px]">
          {isDanger ? "emergency_home" : "warning"}
        </span>

        <div>
          <p className="text-[18px] font-bold uppercase tracking-wide">
            {isDanger ? "Alerta crítica del conductor" : "Advertencia de seguridad"}
          </p>

          <p className="text-[14px] font-medium opacity-90">
            {lastEvent !== "None"
              ? lastEvent
              : isDanger
                ? "Posible microsueño o sueño detectado."
                : "Se detectó una condición que requiere atención."}
          </p>
        </div>
      </div>
    </div>
  </div>
)}
              <div className="absolute bottom-6 right-6">
                <div className="bg-black/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                  <p className="text-white text-[12px] font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">
                      videocam
                    </span>
                    Live Feed: Dashboard-01
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white border border-[#F3EDD9] rounded-xl p-4 shadow-[0px_4px_20px_rgba(44,42,36,0.04)]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F9F5EC] flex items-center justify-center text-[#4A86C0]">
                    <span className="material-symbols-outlined text-[32px]">
                      person
                    </span>
                  </div>

                  <div>
                    <h2 className="text-[24px] leading-[1.4] font-semibold text-[#2C2A24]">
                      {driverName}
                    </h2>
                    <p className="text-[16px] leading-[1.6] text-[#706A5A]">
                      {driverDescription}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-8 border-l border-[#F3EDD9] pl-0 md:pl-8">
                  <div className="space-y-1">
                    <p className="text-[12px] font-medium text-[#706A5A] uppercase">
                      Documento
                    </p>
                    <p className="text-[18px] font-semibold text-[#2C2A24]">
                      {documentNumber}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[12px] font-medium text-[#706A5A] uppercase">
                      Tiempo de inicio de sesión
                    </p>
                    <p className="text-[18px] font-semibold text-[#2C2A24]">
                      {sessionStart}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[12px] font-medium text-[#706A5A] uppercase">
                      Vehículo
                    </p>
                    <p className="text-[18px] font-semibold text-[#2C2A24]">
                      No asignado
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SummaryCard
              title="Estado de monitoreo"
              icon={isDanger ? "emergency_home" : isWarning ? "warning" : "analytics"}
              value={monitoringStatus}
              tag={monitoringTag}
              severity={alertSeverity}
            />

              <SummaryCard
                title="Duración de la sesión"
                icon="schedule"
                value={sessionDuration}
                footer="Viaje activo"
              />

            <SummaryCard
              title="Ultimo evento de seguridad"
              icon={isDanger || isWarning ? "warning" : "history"}
              value={lastEvent}
              footer={lastEventFooter}
              severity={alertSeverity}
            />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">


              <div className="bg-white border border-[#F3EDD9] rounded-xl p-4 shadow-[0px_4px_20px_rgba(44,42,36,0.04)]">
                <h3 className="text-[24px] font-semibold text-[#2C2A24] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4A86C0]">
                    warning
                  </span>
                  Alertas de seguridad recientes
                </h3>

                <ul className="space-y-2">
                  {safetyFlags.length === 0 ? (
                    <li className="flex items-center justify-between p-3 bg-[#FDFAF5] rounded-lg border border-[#F3EDD9] opacity-50">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#706A5A]">
                          verified
                        </span>
                        <span className="text-[16px]">Sin eventos recientes</span>
                      </div>
                      <span className="text-[#706A5A] text-sm">Ahora</span>
                    </li>
                  ) : (
                    safetyFlags.map((flag) => (
                      <li
                        key={flag.id}
                        className={`flex items-center justify-between p-3 bg-[#FDFAF5] rounded-lg border border-[#F3EDD9] ${
                          flag.muted ? "opacity-50" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-[#706A5A]">
                            {flag.icon}
                          </span>
                          <span className="text-[16px]">{flag.label}</span>
                        </div>
                        <span className="text-[#706A5A] text-sm">
                          {flag.time}
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </section>
          </div>
        </main>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white border-t border-[#e1e2e7] shadow-lg rounded-t-xl">
        <a
          className="flex flex-col items-center justify-center bg-[#a3f4c1] text-[#207249] rounded-full px-4 py-1 transition-all duration-200"
          href="#"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            speed
          </span>
          <span className="text-[12px] font-medium">Dashboard</span>
        </a>

        <MobileNavItem icon="visibility_lock" label="Safety" />
        <MobileNavItem icon="receipt_long" label="History" />
        <MobileNavItem icon="settings" label="Settings" />
      </nav>
    </div>
  );
}

type SummaryCardProps = {
  title: string;
  icon: string;
  value: string;
  tag?: string;
  footer?: string;
  severity?: AlertSeverity;
};

function SummaryCard({ title, icon, value, tag, footer, severity = 'normal' }: SummaryCardProps) {
  const cardClassName =
  severity === "danger"
    ? "bg-red-50 border border-red-300 rounded-xl p-4 shadow-[0px_0px_30px_rgba(220,38,38,0.25)] hover:shadow-[0px_0px_40px_rgba(220,38,38,0.35)] transition-all duration-300"
    : severity === "warning"
      ? "bg-amber-50 border border-amber-300 rounded-xl p-4 shadow-[0px_0px_25px_rgba(245,158,11,0.20)] hover:shadow-[0px_0px_35px_rgba(245,158,11,0.30)] transition-all duration-300"
      : "bg-[#F9F5EC] border border-[#F3EDD9] rounded-xl p-4 shadow-[0px_4px_20px_rgba(44,42,36,0.04)] hover:shadow-[0px_8px_30px_rgba(44,42,36,0.08)] transition-all duration-300";

const iconClassName =
  severity === "danger"
    ? "material-symbols-outlined text-red-600"
    : severity === "warning"
      ? "material-symbols-outlined text-amber-600"
      : "material-symbols-outlined text-[#4A86C0]";

const tagClassName =
  severity === "danger"
    ? "bg-red-600 text-white px-3 py-1 rounded-full text-[12px] font-bold"
    : severity === "warning"
      ? "bg-amber-500 text-white px-3 py-1 rounded-full text-[12px] font-bold"
      : "bg-[#EAF4EE] text-[#5DAB7D] px-3 py-1 rounded-full text-[12px] font-bold";
return (
  <div className={cardClassName}>
    <div className="flex justify-between items-start mb-4">
      <p className="text-[14px] font-semibold text-[#706A5A]">{title}</p>
      <span className={iconClassName}>{icon}</span>
    </div>

    <div className="flex items-end justify-between">
      <p className="text-[32px] font-semibold text-[#2C2A24]">{value}</p>

      {tag ? (
        <span className={tagClassName}>{tag}</span>
      ) : (
        <p className="text-[#706A5A] text-[12px] font-medium">{footer}</p>
      )}
    </div>
  </div>
);
}

type MobileNavItemProps = {
  icon: string;
  label: string;
};

function MobileNavItem({ icon, label }: MobileNavItemProps) {
  return (
    <a
      className="flex flex-col items-center justify-center text-[#41474f] hover:text-[#195f97] transition-colors"
      href="#"
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="text-[12px] font-medium">{label}</span>
    </a>
  );
}
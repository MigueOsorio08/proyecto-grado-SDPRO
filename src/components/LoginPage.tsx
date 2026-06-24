import React, {
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import logo from "../assets/logo.svg";

type LoginSuccessResponse = {
  message: string;
  token: string;
  token_type: "Bearer";
  user: {
    id: number;
    name: string;
    email: string;
    document_number: string;
  };
  face?: {
    matched?: boolean;
    authorized?: boolean;
    similarity_score?: number | null;
    distance?: number | null;
  };
};

type ApiErrorResponse = {
  message?: string;
  errors?: Record<string, string[]>;
};

const rawApiBaseUrl =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "http://localhost:8000";

const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, "");

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Error inesperado iniciando sesión.";
}

async function parseJsonResponse<T>(response: Response): Promise<T | null> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`La API no devolvió JSON válido. Respuesta: ${text}`);
  }
}



export default function LoginPage(): React.JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [documentNumber, setDocumentNumber] = useState<string>("");
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(false);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [capturedImages, setCapturedImages] = useState<File[]>([]);
  const [status, setStatus] = useState<string>("SafeDrive Secure Login Active");
  const [error, setError] = useState<string | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<LoginSuccessResponse | null>(null);

  const canSubmit = useMemo(() => {
    return (
      documentNumber.trim().length > 0 &&
      capturedImages.length >= 3 &&
      !isCapturing &&
      !isSubmitting
    );
  }, [documentNumber, capturedImages.length, isCapturing, isSubmitting]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  async function startCamera(): Promise<void> {
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
        audio: false,
      });

      streamRef.current = stream;

      if (!videoRef.current) {
        throw new Error("No se encontró el elemento de video.");
      }

      videoRef.current.srcObject = stream;

      await videoRef.current.play();

      setCameraEnabled(true);
      setStatus("Cámara encendida. Ubica tu rostro al centro.");
    } catch (error: unknown) {
      setError(
        "No fue posible encender la cámara. Revisa los permisos del navegador."
      );
      setStatus("Error de cámara");
      console.error("Camera error:", error);
    }
  }

  function stopCamera(): void {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }

  function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  async function captureFrameBlob(): Promise<Blob> {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      throw new Error("La cámara no está lista.");
    }

    if (!video.videoWidth || !video.videoHeight) {
      await sleep(300);
    }

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("No fue posible preparar la captura.");
    }

    context.drawImage(video, 0, 0, width, height);

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("No fue posible capturar la imagen."));
            return;
          }

          resolve(blob);
        },
        "image/jpeg",
        0.95
      );
    });
  }

  async function captureFaceSamples(): Promise<void> {
    setError(null);

    if (!cameraEnabled) {
      setError("Primero debes encender la cámara.");
      return;
    }

    setIsCapturing(true);
    setCapturedImages([]);

    try {
      const totalSamples = 8;
      const samples: File[] = [];

      for (let index = 1; index <= totalSamples; index++) {
        setStatus(`Capturando muestra facial ${index} de ${totalSamples}...`);

        const blob = await captureFrameBlob();

        const file = new File([blob], `login-face-${index}.jpg`, {
          type: "image/jpeg",
        });

        samples.push(file);

        await sleep(700);
      }

      setCapturedImages(samples);
      setStatus("Muestras capturadas. Ya puedes iniciar sesión.");
    } catch (error: unknown) {
      setError(
        getErrorMessage(error) ||
          "No fue posible capturar las muestras faciales."
      );
      setStatus("Error capturando rostro");
      console.error("Capture error:", error);
    } finally {
      setIsCapturing(false);
    }
  }

  function extractValidationMessage(data: ApiErrorResponse | null): string {
    return (
      data?.errors?.document_number?.[0] ??
      data?.errors?.face?.[0] ??
      data?.errors?.images?.[0] ??
      data?.message ??
      "No fue posible iniciar sesión."
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    setError(null);

    if (!documentNumber.trim()) {
      setError("Debes ingresar tu cédula.");
      return;
    }

    if (capturedImages.length < 3) {
      setError("Debes capturar al menos 3 muestras faciales.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Validando identidad biométrica...");

    try {
      const formData = new FormData();

      formData.append("document_number", documentNumber.trim());

      capturedImages.forEach((image) => {
        /**
         * Para Laravel, este nombre está bien.
         * Laravel lo interpretará como request()->file('images').
         */
        formData.append("images[]", image, image.name);
      });

      console.log("Sending biometric login request", {
        url: `${API_BASE_URL}/api/biometric/login`,
        documentNumber: documentNumber.trim(),
        imagesCount: capturedImages.length,
      });

      const response = await fetch(`${API_BASE_URL}/api/biometric/login`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const data = await parseJsonResponse<LoginSuccessResponse | ApiErrorResponse>(
        response
      );
      console.log("Biometric login response", {
        status: response.status,
        ok: response.ok,
        data,
      });

      if (!response.ok) {
        throw new Error(extractValidationMessage(data as ApiErrorResponse | null));
      }

      const successData = data as LoginSuccessResponse | null;

      if (!successData?.token || !successData?.user) {
        throw new Error("La API respondió exitosamente, pero no devolvió token o usuario.");
      }

      localStorage.setItem("safedrive_token", successData.token);
      localStorage.setItem("safedrive_user", JSON.stringify(successData.user));

      setLoggedInUser(successData);

      setStatus(`Login exitoso. Bienvenido, ${successData.user.name}.`);

      stopCamera();
    } catch (error: unknown) {
      setError(getErrorMessage(error));
      setStatus("Login fallido");
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 md:px-10 bg-[#FDFAF5] text-[#2C2A24]">
      <main className="w-full max-w-md">
        <div className="bg-[#F9F5EC] border border-[#F3EDD9] shadow-[0px_4px_20px_rgba(44,42,36,0.04)] rounded-xl overflow-hidden p-8 md:p-10 flex flex-col gap-8">
          <header className="flex flex-col items-center gap-2 text-center">
            <div className="w-16 h-16 mb-2">
              <img
                alt="SafeDrive Logo"
                className="w-full h-full object-contain"
                src={logo}
              />
            </div>

            <h1 className="font-bold text-[28px] md:text-[32px] leading-[1.3] tracking-tight text-[#195f97]">
              SafeDrive
            </h1>

            <p className="text-[16px] leading-[1.6] text-[#706A5A]">
              Assuring your focus, ensuring your safety.
            </p>
          </header>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label
                className="text-[14px] font-semibold text-[#706A5A]"
                htmlFor="document_number"
              >
                Cédula
              </label>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#c1c7d1] text-[20px]">
                  badge
                </span>

                <input
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#EDE6CE] bg-white text-[16px] leading-[1.6] focus:ring-2 focus:ring-[#4A86C0]/20 focus:border-[#4A86C0] outline-none transition-all placeholder:text-[#c1c7d1]"
                  id="document_number"
                  name="document_number"
                  placeholder="Ingresa tu cédula"
                  type="text"
                  value={documentNumber}
                  onChange={(event) => setDocumentNumber(event.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[14px] font-semibold text-[#706A5A]">
                Verificación facial
              </label>

              <div className="rounded-lg overflow-hidden bg-black border border-[#EDE6CE]">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-56 object-cover"
                />

                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  className="bg-[#195f97] hover:bg-[#144d7b] text-white text-[13px] font-semibold py-3 rounded-lg shadow-sm active:scale-[0.98] transition-all disabled:opacity-50"
                  type="button"
                  onClick={startCamera}
                  disabled={cameraEnabled || isSubmitting}
                >
                  Encender cámara
                </button>

                <button
                  className="bg-[#706A5A] hover:bg-[#5d574a] text-white text-[13px] font-semibold py-3 rounded-lg shadow-sm active:scale-[0.98] transition-all disabled:opacity-50"
                  type="button"
                  onClick={captureFaceSamples}
                  disabled={!cameraEnabled || isCapturing || isSubmitting}
                >
                  {isCapturing ? "Capturando..." : "Capturar rostro"}
                </button>
              </div>

              <div className="text-[12px] font-medium text-[#706A5A] bg-white border border-[#EDE6CE] rounded-lg p-3">
                {status}
                <br />
                Muestras capturadas: {capturedImages.length}
                <br />
              </div>

              {error && (
                <div className="text-[12px] font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                  {error}
                </div>
              )}
            </div>

            {loggedInUser && (
  <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
    <p className="font-bold text-green-900 mb-2">
      Sesión iniciada correctamente
    </p>

    <div className="space-y-1">
      <p>
        <span className="font-semibold">Nombre:</span>{" "}
        {loggedInUser.user.name}
      </p>

      <p>
        <span className="font-semibold">Email:</span>{" "}
        {loggedInUser.user.email}
      </p>

      <p>
        <span className="font-semibold">Cédula:</span>{" "}
        {loggedInUser.user.document_number}
      </p>

      <p>
        <span className="font-semibold">Token:</span>{" "}
        {loggedInUser.token.substring(0, 18)}...
      </p>

      {loggedInUser.face && (
        <>
          <p>
            <span className="font-semibold">Rostro autorizado:</span>{" "}
            {loggedInUser.face.authorized ? "Sí" : "No"}
          </p>

          <p>
            <span className="font-semibold">Coincidencia facial:</span>{" "}
            {loggedInUser.face.matched ? "Sí" : "No"}
          </p>

          {loggedInUser.face.similarity_score !== null &&
            loggedInUser.face.similarity_score !== undefined && (
              <p>
                <span className="font-semibold">Similitud:</span>{" "}
                {(loggedInUser.face.similarity_score * 100).toFixed(2)}%
              </p>
            )}
        </>
      )}
    </div>

    <button
      type="button"
      onClick={() => window.location.assign("/dashboard")}
      className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white text-[13px] font-semibold py-3 rounded-lg transition-all"
    >
      Ir al dashboard
    </button>
  </div>
)}

            <button
              className="bg-[#4A86C0] hover:bg-[#3d71a3] text-white text-[14px] font-semibold py-4 rounded-lg shadow-sm active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              {isSubmitting ? "Validando identidad..." : "Sign in"}
            </button>
          </form>

        </div>

        <div className="mt-8 flex justify-center items-center gap-2 px-6 py-3 bg-[#EAF4EE] rounded-full w-fit mx-auto">
          <span className="w-2 h-2 rounded-full bg-[#5DAB7D]" />
          <span className="text-[12px] font-medium text-[#5DAB7D]">
            SafeDrive Secure Login Active
          </span>
        </div>
      </main>
    </div>
  );
}
export default function CameraCheckPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFAF5] text-[#2C2A24] font-sans">
      <header className="bg-white flex justify-between items-center w-full px-5 md:px-10 h-16 border-b border-[#e1e2e7] shadow-sm z-50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#195f97]">
            shield_with_heart
          </span>
          <h1 className="text-[24px] font-bold text-[#195f97] tracking-tight">
            SafeDrive
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a className="text-[#41474f] hover:text-[#195f97] transition-colors text-[14px] font-semibold" href="#">
            Dashboard
          </a>
          <a className="text-[#195f97] border-b-2 border-[#195f97] pb-1 text-[14px] font-semibold" href="#">
            Safety
          </a>
          <a className="text-[#41474f] hover:text-[#195f97] transition-colors text-[14px] font-semibold" href="#">
            History
          </a>
          <a className="text-[#41474f] hover:text-[#195f97] transition-colors text-[14px] font-semibold" href="#">
            Settings
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined p-2 text-[#41474f] hover:bg-[#e7e8ed] transition-colors rounded-full">
            notifications
          </button>
          <button className="material-symbols-outlined p-2 text-[#41474f] hover:bg-[#e7e8ed] transition-colors rounded-full">
            account_circle
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center py-8 px-5 md:px-10 max-w-7xl mx-auto w-full pb-28 md:pb-8">
        <div className="w-full max-w-3xl mb-12">
          <div className="relative flex justify-between items-center w-full">
            <div className="absolute top-5 left-0 w-full h-[2px] bg-[#EDE6CE] -z-10" />
            <div className="absolute top-5 left-0 w-1/2 h-[2px] bg-[#5DAB7D] -z-10" />

            <StepItem status="complete" label="Select driver" value="check" />
            <StepItem status="active" label="Camera check" value="2" />
            <StepItem status="pending" label="Start monitoring" value="3" />
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-8 bg-white border border-[#F3EDD9] rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(44,42,36,0.04)] relative aspect-video flex items-center justify-center">
            <img
              alt="Driver camera view"
              className="absolute inset-0 w-full h-full object-cover opacity-90 grayscale-[20%]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp7l61qxtco66wvFD6IdED2__EwarKQRHSg4-pInreRrz-at81spHRXTIm4vDp_PJKNZwVBRtSA2ZfmqQ1IF9vj5CgwdONq_xUbWWok0kMb_rgUftWvLP8fezFxlI13SXeoDBube5gW5JNhIaMNebb9OoIiXy-A-V4ktk9IwTgnJEFt4Ixu_9DLUiw6pF33I5mUEZ6fClR8bNi_1OED7pvSyMxYblBAu1Fpi6loKp8JtljfJFOH4D1cE6wI_X2f9HfqXRXfAT7WjPH"
            />

            <div className="absolute w-48 h-48 border-2 border-dashed border-[#C5DAF0] bg-[#C5DAF0]/10 rounded-lg flex items-center justify-center pointer-events-none">
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#4A86C0]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#4A86C0]" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#4A86C0]" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#4A86C0]" />
            </div>

            <div className="absolute top-4 left-4 bg-[#ba1a1a]/90 text-white px-3 py-1 rounded-full flex items-center gap-2 text-[12px] font-medium uppercase tracking-wider">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Live Feed
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="bg-[#F9F5EC] border border-[#F3EDD9] rounded-xl p-4 shadow-[0px_4px_20px_rgba(44,42,36,0.04)]">
              <h2 className="text-[24px] font-semibold mb-4 text-[#2C2A24]">
                System Status
              </h2>

              <ul className="space-y-4">
                <StatusItem icon="videocam" label="Camera connected" />
                <StatusItem icon="face" label="Face detected" />
                <StatusItem icon="light_mode" label="Lighting OK" />
                <StatusItem icon="center_focus_strong" label="Position centered" />
              </ul>

              <div className="mt-8 p-4 bg-[#EAF4EE] rounded-lg flex items-start gap-3">
                <span className="material-symbols-outlined text-[#5DAB7D]">
                  info
                </span>
                <p className="text-[12px] leading-[1.4] text-[#207249]">
                  All systems are optimal. You can now proceed to start the
                  monitoring session for your trip.
                </p>
              </div>
            </div>

            <button className="w-full bg-[#4A86C0] hover:bg-[#3d72a6] text-white py-4 rounded-xl text-[24px] font-semibold shadow-[0px_4px_20px_rgba(44,42,36,0.04)] transition-all active:scale-[0.98] flex items-center justify-center gap-3">
              Start monitoring
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>

            <button className="w-full text-[#706A5A] py-2 text-[14px] font-semibold hover:underline transition-all">
              Reset Camera Calibration
            </button>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white border-t border-[#e1e2e7] md:hidden">
        <BottomNavItem icon="speed" label="Dashboard" />

        <div className="flex flex-col items-center justify-center bg-[#a3f4c1] text-[#207249] rounded-full px-4 py-1">
          <span className="material-symbols-outlined">visibility_lock</span>
          <span className="text-[12px] font-medium">Safety</span>
        </div>

        <BottomNavItem icon="receipt_long" label="History" />
        <BottomNavItem icon="settings" label="Settings" />
      </nav>
    </div>
  );
}

type StepItemProps = {
  status: "complete" | "active" | "pending";
  label: string;
  value: string;
};

function StepItem({ status, label, value }: StepItemProps) {
  const isComplete = status === "complete";
  const isActive = status === "active";

  const circleClass = isComplete
    ? "bg-[#5DAB7D] text-white"
    : isActive
      ? "bg-[#4A86C0] text-white"
      : "bg-[#A89E88] text-white";

  const labelClass = isComplete
    ? "text-[#5DAB7D]"
    : isActive
      ? "text-[#4A86C0]"
      : "text-[#A89E88]";

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-10 h-10 rounded-full ${circleClass} flex items-center justify-center shadow-[0px_4px_20px_rgba(44,42,36,0.04)] border-4 border-[#FDFAF5]`}
      >
        {isComplete ? (
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check
          </span>
        ) : (
          <span className="text-[14px] font-semibold">{value}</span>
        )}
      </div>

      <span className={`text-[14px] font-semibold ${labelClass}`}>{label}</span>
    </div>
  );
}

type StatusItemProps = {
  icon: string;
  label: string;
};

function StatusItem({ icon, label }: StatusItemProps) {
  return (
    <li className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#EDE6CE]">
      <div className="flex items-center gap-3">
        <span
          className="material-symbols-outlined text-[#5DAB7D]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
        <span className="text-[#41474f]">{label}</span>
      </div>

      <span className="material-symbols-outlined text-[#5DAB7D] font-bold">
        check_circle
      </span>
    </li>
  );
}

type BottomNavItemProps = {
  icon: string;
  label: string;
};

function BottomNavItem({ icon, label }: BottomNavItemProps) {
  return (
    <div className="flex flex-col items-center justify-center text-[#41474f]">
      <span className="material-symbols-outlined">{icon}</span>
      <span className="text-[12px] font-medium">{label}</span>
    </div>
  );
}
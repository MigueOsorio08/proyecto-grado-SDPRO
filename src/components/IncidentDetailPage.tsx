export default function IncidentDetailPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFAF5] text-[#191c20] font-sans pb-24 md:pb-0">
      <header className="bg-white shadow-sm border-b border-[#e1e2e7] flex justify-between items-center w-full px-5 md:px-10 h-16 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#195f97]">
            shield_with_heart
          </span>
          <span className="text-[24px] font-bold text-[#195f97] tracking-tight">
            SafeDrive
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a className="text-[14px] font-semibold text-[#195f97] border-b-2 border-[#195f97] pb-1" href="#">
            Dashboard
          </a>
          <HeaderNavItem label="Safety" />
          <HeaderNavItem label="History" />
          <HeaderNavItem label="Settings" />
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-[#e7e8ed] transition-colors duration-200 active:scale-95">
            <span className="material-symbols-outlined text-[#41474f]">
              notifications
            </span>
          </button>
          <button className="p-2 rounded-full hover:bg-[#e7e8ed] transition-colors duration-200 active:scale-95">
            <span className="material-symbols-outlined text-[#41474f]">
              account_circle
            </span>
          </button>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-5 md:px-10 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <nav className="flex items-center gap-2 mb-2 text-[#41474f]">
              <span className="material-symbols-outlined text-[16px]">
                arrow_back
              </span>
              <span className="text-[14px] font-semibold">Back to History</span>
            </nav>

            <h1 className="text-[28px] md:text-[32px] leading-[1.3] font-semibold text-[#191c20]">
              Incident ID: #SD-98421
            </h1>

            <p className="text-[#41474f] text-[16px] mt-1">
              October 24, 2023 at 14:32:10 • Microsleep Detection
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-6 py-2 rounded-full bg-[#EBF2FA] text-[#4A86C0] text-[14px] font-semibold hover:bg-[#d0e4ff] transition-all">
              Download Report
            </button>

            <button className="px-6 py-2 rounded-full bg-[#4A86C0] text-white text-[14px] font-semibold hover:brightness-95 transition-all">
              Archive Case
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 flex flex-col gap-6">
            <section className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(44,42,36,0.04)] p-4 border border-[#EDE6CE]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-[#edeef3] border-2 border-[#F3EDD9]">
                  <img
                    alt="Driver Profile"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxgsWq8xCm0jPF_1nsM9f8yNSZg9-VmDpMTHIfivUDsaeXQc20swATz92iNaujX-9nfrEz6HAxk4M6QqhJ_HiZ9GRWbHOiiarFE3e93E077DuI6xH9BBLqmpEyr6pQtQBUlFXsvRjWHpQeEaCY2xDI0blTOsa5GDKb2rxq4dY-QKupYDfdB3nSeF-J84aHCXCE7CMW5ldGOHxlR8HGzq13-h8iXJbJSXAgxm287wHuqV4OtDkAKqmN8b9x1AfDQtEtoRJkvJwarMlj"
                  />
                </div>

                <div>
                  <h3 className="text-[24px] font-semibold text-[#191c20]">
                    Marcus Chen
                  </h3>
                  <p className="text-[#41474f] text-[16px]">
                    Fleet ID: #FL-2204
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#F3EDD9]">
                <InfoRow label="Driving Hours" value="6h 12m" />
                <InfoRow label="Vehicle ID" value="Freight-09" />

                <div className="flex justify-between">
                  <span className="text-[#41474f] text-[14px] font-semibold">
                    License Grade
                  </span>
                  <span className="text-[#176c43] text-[14px] font-semibold bg-[#a3f4c1] px-2 py-0.5 rounded">
                    Excellent
                  </span>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(44,42,36,0.04)] p-4 border border-[#EDE6CE]">
              <h4 className="text-[14px] font-semibold text-[#41474f] mb-4 uppercase tracking-wider">
                Communication Status
              </h4>

              <div className="space-y-4">
                <CommunicationItem
                  icon="sms"
                  title="Driver SMS"
                  description="Sent to +1 (555) 012-3456"
                  status="Delivered"
                  variant="success"
                />

                <CommunicationItem
                  icon="call"
                  title="Dispatcher Call"
                  description="Line busy at central hub"
                  status="Failed"
                  variant="error"
                />
              </div>
            </section>
          </div>

          <div className="md:col-span-8 flex flex-col gap-6">
            <section className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(44,42,36,0.04)] overflow-hidden border border-[#EDE6CE] flex flex-col">
              <div className="p-4 border-b border-[#F3EDD9] flex justify-between items-center">
                <h4 className="text-[24px] font-semibold text-[#191c20]">
                  Camera Evidence
                </h4>

                <span className="text-[#41474f] text-[12px] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    videocam
                  </span>
                  Front Cabin Camera
                </span>
              </div>

              <div className="relative aspect-video bg-[#d9dadf]">
                <img
                  alt="Incident Frame"
                  className="w-full h-full object-cover grayscale opacity-80"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrQ1Q_aO6i_S7nVmS2HTzpfW0v29QbUMSmNup3w98gsnEbfgL_nR8Q5QIUrHFQkpRNJ-msOYapApYgOe_x5grBdAWk69n5bysb7FhKNqN-A35Pgk2rqacri1nGh9fKfjxMRiVHRzyRGA5xD32n21VLZpbN4vkXkdT_umrTOsg6kEXt_6JKFkXIoSQiP7UzbehgtykcEsSgGcEwVHdOog6dL_3mK2AT1gik5s8mgL49ks5OQ4bOWIF-xc8AjxGHCjFhBbeqCK_KujN8"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                  <div className="flex gap-4 text-white text-[14px] font-semibold">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined">timer</span>
                      14:32:10.452
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined">speed</span>
                      64 MPH
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="bg-[#FAEAEA] text-[#C0514F] px-3 py-1 rounded-full text-[12px] font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      warning
                    </span>
                    Eyes Closed &gt; 1.2s
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-[#F9F5EC] rounded-xl shadow-[0px_4px_20px_rgba(44,42,36,0.04)] h-64 border border-[#EDE6CE] relative overflow-hidden group">
              <div className="absolute inset-0 grayscale opacity-40 hover:opacity-60 transition-opacity">
                <div className="w-full h-full bg-[#e1e2e7] flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-[#41474f] opacity-20">
                    map
                  </span>
                </div>
              </div>

              <div className="absolute top-4 left-4 z-10">
                <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-[#EDE6CE] shadow-sm">
                  <p className="text-[14px] font-semibold text-[#191c20]">
                    I-90 Westbound
                  </p>
                  <p className="text-[12px] text-[#41474f]">
                    Mile Marker 142.5
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-[#ba1a1a] rounded-full border-4 border-white shadow-lg animate-pulse" />
              </div>
            </section>
          </div>
        </div>

        <section className="mt-6 bg-white rounded-xl shadow-[0px_4px_20px_rgba(44,42,36,0.04)] p-8 border border-[#EDE6CE]">
          <h4 className="text-[24px] font-semibold text-[#191c20] mb-8">
            Incident Progression
          </h4>

          <div className="relative px-6">
            <div className="absolute top-5 left-12 right-12 h-[2px] bg-[#C5DAF0]" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 relative z-10">
              <TimelineStep
                icon="analytics"
                title="Detection"
                time="14:32:10.4"
                description="Neural net flagged eye fatigue"
              />

              <TimelineStep
                icon="volume_up"
                title="Sound alert"
                time="14:32:10.8"
                description="Cabin speaker activated 75dB"
              />

              <TimelineStep
                icon="priority_high"
                title="Escalation"
                time="14:32:12.1"
                description="Seat haptic pulses engaged"
              />

              <TimelineStep
                icon="check_circle"
                title="Notification sent"
                time="14:32:15.5"
                description="Incident logged to fleet cloud"
                completed
              />
            </div>
          </div>
        </section>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white border-t border-[#e1e2e7] shadow-lg rounded-t-xl">
        <button className="flex flex-col items-center justify-center bg-[#a3f4c1] text-[#207249] rounded-full px-4 py-1 active:scale-90 transition-all duration-200">
          <span className="material-symbols-outlined">speed</span>
          <span className="text-[12px] font-medium">Dashboard</span>
        </button>

        <BottomNavItem icon="visibility_lock" label="Safety" />
        <BottomNavItem icon="receipt_long" label="History" />
        <BottomNavItem icon="settings" label="Settings" />
      </nav>

      <button className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-[#195f97] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 z-40">
        <span className="material-symbols-outlined">support_agent</span>
      </button>
    </div>
  );
}

function HeaderNavItem({ label }: { label: string }) {
  return (
    <a
      className="text-[14px] font-semibold text-[#41474f] hover:text-[#195f97] transition-colors duration-200"
      href="#"
    >
      {label}
    </a>
  );
}

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex justify-between">
      <span className="text-[#41474f] text-[14px] font-semibold">{label}</span>
      <span className="text-[#191c20] text-[16px]">{value}</span>
    </div>
  );
}

type CommunicationItemProps = {
  icon: string;
  title: string;
  description: string;
  status: string;
  variant: "success" | "error";
};

function CommunicationItem({
  icon,
  title,
  description,
  status,
  variant,
}: CommunicationItemProps) {
  const styles =
    variant === "success"
      ? {
          wrapper: "bg-[#EAF4EE]",
          icon: "text-[#5DAB7D]",
          badge: "bg-[#EAF4EE] text-[#5DAB7D]",
        }
      : {
          wrapper: "bg-[#FAEAEA]",
          icon: "text-[#C0514F]",
          badge: "bg-[#FAEAEA] text-[#C0514F]",
        };

  return (
    <div className="flex items-start gap-4">
      <div className={`p-2 rounded-full ${styles.wrapper}`}>
        <span
          className={`material-symbols-outlined text-lg ${styles.icon}`}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <p className="text-[14px] font-semibold text-[#191c20]">{title}</p>
          <span
            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${styles.badge}`}
          >
            {status}
          </span>
        </div>

        <p className="text-[#41474f] text-[12px]">{description}</p>
      </div>
    </div>
  );
}

type TimelineStepProps = {
  icon: string;
  title: string;
  time: string;
  description: string;
  completed?: boolean;
};

function TimelineStep({
  icon,
  title,
  time,
  description,
  completed = false,
}: TimelineStepProps) {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <div
        className={`w-10 h-10 rounded-full ${
          completed ? "bg-[#176c43]" : "bg-[#195f97]"
        } flex items-center justify-center text-white mb-3`}
      >
        <span
          className="material-symbols-outlined"
          style={completed ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          {icon}
        </span>
      </div>

      <p className="text-[14px] font-semibold text-[#191c20]">{title}</p>
      <p className="text-[12px] text-[#41474f] mt-1">{time}</p>
      <p className="text-[12px] text-[#41474f] mt-2 italic">{description}</p>
    </div>
  );
}

type BottomNavItemProps = {
  icon: string;
  label: string;
};

function BottomNavItem({ icon, label }: BottomNavItemProps) {
  return (
    <button className="flex flex-col items-center justify-center text-[#41474f] hover:text-[#195f97] transition-colors active:scale-90 duration-200">
      <span className="material-symbols-outlined">{icon}</span>
      <span className="text-[12px] font-medium">{label}</span>
    </button>
  );
}
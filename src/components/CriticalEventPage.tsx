export default function CriticalEventPage() {
  return (
    <div className="min-h-screen bg-[#FDFAF5] text-[#191c20] font-sans pb-24 md:pb-0">
      <header className="bg-white text-[#195f97] shadow-sm border-b border-[#e1e2e7] flex justify-between items-center w-full px-5 md:px-10 h-16 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#195f97]">
            shield_with_heart
          </span>
          <h1 className="text-[24px] font-bold text-[#195f97] tracking-tight">
            SafeDrive
          </h1>
        </div>

        <nav className="hidden md:flex gap-8 h-full items-center">
          <a
            className="text-[14px] font-semibold text-[#195f97] border-b-2 border-[#195f97] pb-1"
            href="#"
          >
            Dashboard
          </a>
          <a
            className="text-[14px] font-semibold text-[#41474f] hover:text-[#195f97]"
            href="#"
          >
            Safety
          </a>
          <a
            className="text-[14px] font-semibold text-[#41474f] hover:text-[#195f97]"
            href="#"
          >
            History
          </a>
          <a
            className="text-[14px] font-semibold text-[#41474f] hover:text-[#195f97]"
            href="#"
          >
            Settings
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined hover:bg-[#e7e8ed] transition-colors duration-200 p-2 rounded-full">
            notifications
          </button>
          <button className="material-symbols-outlined hover:bg-[#e7e8ed] transition-colors duration-200 p-2 rounded-full">
            account_circle
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 md:px-10 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="relative rounded-xl overflow-hidden border-4 border-[#D4893A] shadow-[0_0_0_0_rgba(212,137,58,0.4)] aspect-video bg-black group">
              <img
                alt="Driver monitor camera feed"
                className="w-full h-full object-cover opacity-80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoz_Gd3O9cok2JlRgZgu3mHvSw2WHo12U1JVPlnzfpzAj9xazZ7ppGdR0DnA92ujeowsl9LVzF63dqlUcJHYIc8Ymqbl-F-VH2zMw-A3JRWEvFcWre540Z9w06ytDDv4Z5gJc0sGrbaYhIB5oGIXzmutz8zhgT0kDB6NaJGdcauagF7m0Cwzh78uY8SkcCx3ZhgZCBQaetkcea2hdDrDTd0DW7dRZyVnH2KizFWJ6Rmbi5ieKde8LzuyjYTxpevAOv4mw2FqvRhztI"
              />

              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse" />
                <span className="text-white text-[12px] font-medium uppercase tracking-wider">
                  Live Monitoring
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-96 flex flex-col gap-4">
            <div className="bg-white border border-[#F3EDD9] rounded-xl p-4 shadow-[0px_4px_20px_rgba(44,42,36,0.04)]">
              <div className="flex flex-col gap-2 mb-4">
                <div className="inline-flex items-center gap-2 bg-[#FEF4E8] text-[#D4893A] px-3 py-1 rounded-full self-start">
                  <span className="material-symbols-outlined text-[18px]">
                    visibility_lock
                  </span>
                  <span className="text-[14px] font-semibold">
                    Microsleep detected
                  </span>
                </div>

                <h2 className="text-[24px] font-semibold text-[#191c20]">
                  Critical Event Log
                </h2>
              </div>

              <div className="space-y-4">
                <EventDetail label="Timestamp" value="14:32:05 PM" />
                <EventDetail label="Driver" value="Marcus Thompson" />
                <EventDetail label="Vehicle ID" value="SD-X882" />
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  className="w-full flex items-center justify-center gap-2 bg-[#EAF4EE] text-[#5DAB7D] py-3 rounded-lg text-[14px] font-semibold opacity-90 cursor-not-allowed"
                  disabled
                >
                  <span className="material-symbols-outlined">volume_up</span>
                  Sound alert sent
                </button>

                <button className="w-full flex items-center justify-center gap-2 border-2 border-[#C0514F] text-[#C0514F] py-3 rounded-lg text-[14px] font-semibold hover:bg-[#FAEAEA] transition-colors active:scale-95 duration-150">
                  <span className="material-symbols-outlined">
                    emergency_share
                  </span>
                  Send emergency notification
                </button>
              </div>
            </div>

            <div className="bg-[#F9F5EC] border border-[#F3EDD9] rounded-xl p-4 shadow-[0px_4px_20px_rgba(44,42,36,0.04)]">
              <h3 className="text-[14px] font-semibold text-[#706A5A] mb-2">
                Evidence Thumbnail
              </h3>

              <div className="aspect-video rounded-lg overflow-hidden border border-[#EDE6CE]">
                <img
                  alt="Incident evidence"
                  className="w-full h-full object-cover grayscale-[20%]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa7RzQF-fc_hFS5X3gzL-R8EYkmINev30e9unkOwYGAp5rNl4CTf9yBciUPfk_o88f4zyr5aYJoEPTjkTQIAhMgwJZT34lLBs1tsYQ6XgyzGUC2hG5TUys2Qrl4EUO14y8Wt1VjyDlQyLgnQppL9amzqJOXVzgTYCukwvX96AGSYVETvWjd7ye4YzCA-ZxvuXz2_eXGeVprC5QxdpLQgKDrzusDlDfOblX5QUkk6yO_ceapJNypV6N3EzFVGJlWJXvv_EkXWd4s3O5"
                />
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8">
          <h3 className="text-[24px] font-semibold text-[#191c20] mb-4">
            Nearby Safety Resources
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SafetyResource
              icon="local_hospital"
              title="Nearest Hospital"
              description="St. Jude Medical Center"
              distance="1.2 miles away"
            />

            <SafetyResource
              icon="local_police"
              title="Patrol Unit 04"
              description="South Highway Patrol"
              distance="0.8 miles away"
            />

            <SafetyResource
              icon="local_gas_station"
              title="Rest Stop Alpha"
              description="24/7 Safety Zone"
              distance="2.5 miles away"
            />
          </div>
        </section>
      </main>

      <footer className="md:hidden">
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white border-t border-[#e1e2e7] rounded-t-xl shadow-lg">
          <BottomNavItem icon="speed" label="Dashboard" />

          <div className="flex flex-col items-center justify-center bg-[#a3f4c1] text-[#207249] rounded-full px-4 py-1">
            <span className="material-symbols-outlined">visibility_lock</span>
            <span className="text-[12px] font-medium">Safety</span>
          </div>

          <BottomNavItem icon="receipt_long" label="History" />
          <BottomNavItem icon="settings" label="Settings" />
        </nav>
      </footer>
    </div>
  );
}

type EventDetailProps = {
  label: string;
  value: string;
};

function EventDetail({ label, value }: EventDetailProps) {
  return (
    <div className="flex justify-between items-center border-b border-[#F3EDD9] pb-2">
      <span className="text-[#706A5A] text-[14px] font-semibold">
        {label}
      </span>
      <span className="text-[#191c20] text-[14px] font-semibold">
        {value}
      </span>
    </div>
  );
}

type SafetyResourceProps = {
  icon: string;
  title: string;
  description: string;
  distance: string;
};

function SafetyResource({
  icon,
  title,
  description,
  distance,
}: SafetyResourceProps) {
  return (
    <div className="bg-white border border-[#F3EDD9] p-4 rounded-xl shadow-[0px_4px_20px_rgba(44,42,36,0.04)] flex items-start gap-4">
      <div className="bg-[#EBF2FA] text-[#4A86C0] p-3 rounded-lg">
        <span className="material-symbols-outlined">{icon}</span>
      </div>

      <div>
        <h4 className="text-[14px] font-semibold text-[#191c20]">
          {title}
        </h4>
        <p className="text-[12px] text-[#706A5A]">{description}</p>
        <p className="text-[12px] text-[#4A86C0] mt-1">{distance}</p>
      </div>
    </div>
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
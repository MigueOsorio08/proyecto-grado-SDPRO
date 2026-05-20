export default function DashboardPage() {
  return (
    <div className="bg-[#FDFAF5] text-[#2C2A24] font-sans min-h-screen">
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
          <button className="material-symbols-outlined p-2 hover:bg-[#e7e8ed] transition-colors duration-200 rounded-full">
            notifications
          </button>

          <button className="material-symbols-outlined p-2 hover:bg-[#e7e8ed] transition-colors duration-200 rounded-full">
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
              <span className="material-symbols-outlined">visibility_lock</span>
            </a>

            <a
              className="group flex flex-col items-center justify-center text-[#41474f] hover:text-[#195f97] transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined">receipt_long</span>
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
            <section className="relative rounded-xl overflow-hidden border-4 border-white shadow-[0px_4px_20px_rgba(44,42,36,0.04)] bg-[#e7e8ed] aspect-video md:aspect-[21/9]">
              <img
                alt="Driver monitoring feed"
                className="w-full h-full object-cover opacity-90"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNY1qZSZX1UBdwCsyFhbpZRo-Bcww2TuCAXPcsLbNFxuPvf77Kd59G5ncloKGvnsV7W-i-67pr-5opKtaeoJ8SBZRax3FlExxPUSdt5OfhJTW1wa1c-zh-P15hP0Te2luQz4z1iY21Di9lFBXiHNkKfptSkqlnryuJ5E0DH4xDd1Zficx_rl-NPuf6jMgvr6zZWQ6raXQ99tXQg6vjGhHWczhLAhi5dkMbth0nfxRYASYjEouRmW3BgV5x6hoVEqUR0s2lBrORmh8_"
              />

              <div className="absolute inset-0 pointer-events-none border-[1.5px] border-dashed border-[#C5DAF0] rounded-lg m-12 opacity-40" />

              <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[#EAF4EE] px-4 py-1.5 rounded-full shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#5DAB7D] animate-pulse" />
                  <span className="text-[14px] font-semibold text-[#5DAB7D] uppercase tracking-wider">
                    ACTIVE
                  </span>
                </div>
              </div>

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
                      Alex Johnson
                    </h2>
                    <p className="text-[16px] leading-[1.6] text-[#706A5A]">
                      Commercial Operator • Tier 1 Safety
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-8 border-l border-[#F3EDD9] pl-0 md:pl-8">
                  <div className="space-y-1">
                    <p className="text-[12px] font-medium text-[#706A5A] uppercase">
                      License Plate
                    </p>
                    <p className="text-[18px] font-semibold text-[#2C2A24]">
                      SAF-1234
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[12px] font-medium text-[#706A5A] uppercase">
                      Session Start
                    </p>
                    <p className="text-[18px] font-semibold text-[#2C2A24]">
                      08:45 AM
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[12px] font-medium text-[#706A5A] uppercase">
                      Vehicle
                    </p>
                    <p className="text-[18px] font-semibold text-[#2C2A24]">
                      Volvo FH16
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SummaryCard
                title="Detection Status"
                icon="analytics"
                value="Healthy"
                tag="Normal"
              />

              <SummaryCard
                title="Session Duration"
                icon="schedule"
                value="02:15:42"
                footer="Active Journey"
              />

              <SummaryCard
                title="Last Event"
                icon="history"
                value="None"
                footer="No flags detected"
              />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <div className="bg-white border border-[#F3EDD9] rounded-xl p-4 shadow-[0px_4px_20px_rgba(44,42,36,0.04)]">
                <h3 className="text-[24px] font-semibold text-[#2C2A24] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4A86C0]">
                    monitoring
                  </span>
                  Engagement Analytics
                </h3>

                <div className="h-48 w-full bg-[#FDFAF5] rounded-lg border border-[#F3EDD9] p-4 flex items-end gap-2 overflow-hidden">
                  <div className="bg-[#4A86C0] w-full rounded-t-sm opacity-20 h-1/4" />
                  <div className="bg-[#4A86C0] w-full rounded-t-sm opacity-40 h-2/4" />
                  <div className="bg-[#4A86C0] w-full rounded-t-sm opacity-60 h-3/4" />
                  <div className="bg-[#4A86C0] w-full rounded-t-sm opacity-80 h-4/5" />
                  <div className="bg-[#4A86C0] w-full rounded-t-sm h-full" />
                  <div className="bg-[#4A86C0] w-full rounded-t-sm opacity-90 h-5/6" />
                  <div className="bg-[#4A86C0] w-full rounded-t-sm opacity-70 h-3/5" />
                  <div className="bg-[#4A86C0] w-full rounded-t-sm opacity-50 h-2/5" />
                </div>
              </div>

              <div className="bg-white border border-[#F3EDD9] rounded-xl p-4 shadow-[0px_4px_20px_rgba(44,42,36,0.04)]">
                <h3 className="text-[24px] font-semibold text-[#2C2A24] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4A86C0]">
                    warning
                  </span>
                  Recent Safety Flags
                </h3>

                <ul className="space-y-2">
                  <li className="flex items-center justify-between p-3 bg-[#FDFAF5] rounded-lg border border-[#F3EDD9]">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#706A5A]">
                        coffee
                      </span>
                      <span className="text-[16px]">Fatigue Alert Low</span>
                    </div>
                    <span className="text-[#706A5A] text-sm">14:22</span>
                  </li>

                  <li className="flex items-center justify-between p-3 bg-[#FDFAF5] rounded-lg border border-[#F3EDD9] opacity-50">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#706A5A]">
                        phone_iphone
                      </span>
                      <span className="text-[16px]">Object Detection</span>
                    </div>
                    <span className="text-[#706A5A] text-sm">10:05</span>
                  </li>
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
};

function SummaryCard({ title, icon, value, tag, footer }: SummaryCardProps) {
  return (
    <div className="bg-[#F9F5EC] border border-[#F3EDD9] rounded-xl p-4 shadow-[0px_4px_20px_rgba(44,42,36,0.04)] hover:shadow-[0px_8px_30px_rgba(44,42,36,0.08)] transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <p className="text-[14px] font-semibold text-[#706A5A]">{title}</p>
        <span className="material-symbols-outlined text-[#4A86C0]">
          {icon}
        </span>
      </div>

      <div className="flex items-end justify-between">
        <p className="text-[32px] font-semibold text-[#2C2A24]">{value}</p>

        {tag ? (
          <span className="bg-[#EAF4EE] text-[#5DAB7D] px-3 py-1 rounded-full text-[12px] font-bold">
            {tag}
          </span>
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
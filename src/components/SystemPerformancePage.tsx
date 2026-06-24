export default function SystemPerformancePage() {
  return (
    <div className="min-h-screen bg-[#FDFAF5] text-[#191c20] font-sans pb-24 md:pb-0">
      <header className="bg-white flex justify-between items-center w-full px-5 md:px-10 h-16 border-b border-[#e1e2e7] shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#195f97]">
            shield_with_heart
          </span>
          <span className="text-[24px] font-bold text-[#195f97] tracking-tight">
            SafeDrive
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            className="text-[14px] font-semibold text-[#195f97] border-b-2 border-[#195f97] pb-1"
            href="#"
          >
            Dashboard
          </a>
          <HeaderNavItem label="Safety" />
          <HeaderNavItem label="History" />
          <HeaderNavItem label="Settings" />
        </nav>

        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-[#41474f] hover:bg-[#e7e8ed] p-2 rounded-full transition-colors active:scale-95">
            account_circle
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 md:px-10 py-8">
        <div className="mb-8">
          <h1 className="text-[28px] md:text-[32px] leading-[1.3] font-semibold text-[#191c20] tracking-tight">
            System Performance
          </h1>
          <p className="text-[16px] leading-[1.6] text-[#41474f] mt-2">
            Real-time metrics and safety diagnostics overview.
          </p>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard
            icon="speed"
            label="Accuracy"
            value="98.2%"
            trend="+2.4%"
            trendType="success"
          />

          <KpiCard
            icon="visibility_lock"
            label="Sensitivity"
            value="94.5%"
            trend="Stable"
            trendType="success"
          />

          <KpiCard
            icon="error_outline"
            label="False Alarm Rate"
            value="1.4%"
            trend="-0.8%"
            trendType="warning"
            iconType="error"
          />

          <KpiCard
            icon="timer"
            label="Response Time"
            value="142ms"
            trend="-12ms"
            trendType="success"
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white shadow-[0px_4px_20px_rgba(44,42,36,0.04)] rounded-xl p-6 border border-[#EDE6CE]">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8">
              <h3 className="text-[24px] font-semibold text-[#191c20]">
                Events vs False Alarms
              </h3>

              <div className="flex gap-4">
                <LegendItem color="#4A86C0" label="Events" />
                <LegendItem color="#C5DAF0" label="False Alarms" />
              </div>
            </div>

            <div className="flex items-end justify-between h-48 gap-2 mb-4">
              <BarGroup day="Mon" eventHeight="80%" falseAlarmHeight="15%" />
              <BarGroup day="Tue" eventHeight="90%" falseAlarmHeight="10%" />
              <BarGroup day="Wed" eventHeight="75%" falseAlarmHeight="20%" />
              <BarGroup day="Thu" eventHeight="95%" falseAlarmHeight="8%" />
              <BarGroup day="Fri" eventHeight="60%" falseAlarmHeight="12%" />
              <BarGroup day="Sat" eventHeight="40%" falseAlarmHeight="5%" />
            </div>
          </div>

          <div className="bg-white shadow-[0px_4px_20px_rgba(44,42,36,0.04)] rounded-xl p-6 border border-[#EDE6CE]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[24px] font-semibold text-[#191c20]">
                Accuracy Trend
              </h3>

              <button className="flex items-center gap-2 text-[14px] font-semibold text-[#41474f] hover:text-[#195f97]">
                Last 7 Days
                <span className="material-symbols-outlined text-[18px]">
                  expand_more
                </span>
              </button>
            </div>

            <div className="relative h-48 w-full border-b border-l border-[#e1e2e7]">
              <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                <path
                  d="M0,80 Q50,70 100,50 T200,40 T300,20 T400,10"
                  fill="none"
                  stroke="#4A86C0"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
                <circle cx="0" cy="80" fill="#4A86C0" r="3" />
                <circle cx="100" cy="50" fill="#4A86C0" r="3" />
                <circle cx="200" cy="40" fill="#4A86C0" r="3" />
                <circle cx="300" cy="20" fill="#4A86C0" r="3" />
                <circle cx="400" cy="10" fill="#4A86C0" r="3" />
              </svg>

              <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none opacity-20">
                <div className="border-t border-[#e1e2e7] w-full" />
                <div className="border-t border-[#e1e2e7] w-full" />
                <div className="border-t border-[#e1e2e7] w-full" />
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <span className="text-[12px] font-medium text-[#41474f]">
                Day 1
              </span>
              <span className="text-[12px] font-medium text-[#41474f]">
                Day 4
              </span>
              <span className="text-[12px] font-medium text-[#41474f]">
                Today
              </span>
            </div>
          </div>
        </section>

        <section className="bg-white shadow-[0px_4px_20px_rgba(44,42,36,0.04)] rounded-xl overflow-hidden border border-[#EDE6CE]">
          <div className="p-6 border-b border-[#F3EDD9]">
            <h3 className="text-[24px] font-semibold text-[#191c20]">
              Test Scenarios
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F5EC]">
                  <TableHeader>Scenario Name</TableHeader>
                  <TableHeader>Category</TableHeader>
                  <TableHeader>Last Run</TableHeader>
                  <TableHeader>Response</TableHeader>
                  <TableHeader>Status</TableHeader>
                </tr>
              </thead>

              <tbody>
                <ScenarioRow
                  name="Microsleep Detection @ 60mph"
                  category="Visual Monitoring"
                  lastRun="2 hours ago"
                  response="112ms"
                  status="Pass"
                  striped={false}
                />

                <ScenarioRow
                  name="Low-Light Perimeter Check"
                  category="Surround Sensing"
                  lastRun="4 hours ago"
                  response="164ms"
                  status="Pass"
                  striped
                />

                <ScenarioRow
                  name="Emergency Brake Assist Lag"
                  category="Active Control"
                  lastRun="Yesterday"
                  response="298ms"
                  status="Fail"
                  striped={false}
                />

                <ScenarioRow
                  name="Driver Distraction (Phone Use)"
                  category="Interior Monitor"
                  lastRun="Yesterday"
                  response="124ms"
                  status="Pass"
                  striped
                />
              </tbody>
            </table>
          </div>

          <div className="p-4 flex justify-center">
            <button className="text-[14px] font-semibold text-[#195f97] hover:bg-[#EBF2FA] px-4 py-2 rounded-lg transition-colors">
              View All Scenarios
            </button>
          </div>
        </section>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white border-t border-[#e1e2e7] shadow-lg rounded-t-xl">
        <button className="flex flex-col items-center justify-center bg-[#a3f4c1] text-[#207249] rounded-full px-4 py-1 active:scale-90 transition-all duration-200">
          <span className="material-symbols-outlined">speed</span>
          <span className="text-[12px] font-medium mt-0.5">Dashboard</span>
        </button>

        <BottomNavItem icon="visibility_lock" label="Safety" />
        <BottomNavItem icon="receipt_long" label="History" />
        <BottomNavItem icon="settings" label="Settings" />
      </nav>
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

type KpiCardProps = {
  icon: string;
  label: string;
  value: string;
  trend: string;
  trendType: "success" | "warning";
  iconType?: "default" | "error";
};

function KpiCard({
  icon,
  label,
  value,
  trend,
  trendType,
  iconType = "default",
}: KpiCardProps) {
  const trendClass =
    trendType === "success"
      ? "bg-[#a3f4c1] text-[#207249]"
      : "bg-[#FEF4E8] text-[#D4893A]";

  const iconClass =
    iconType === "error"
      ? "text-[#ba1a1a] bg-[#ffdad6]"
      : "text-[#195f97] bg-[#EBF2FA]";

  return (
    <div className="bg-white shadow-[0px_4px_20px_rgba(44,42,36,0.04)] rounded-xl p-6 border border-[#EDE6CE] hover:shadow-[0px_8px_30px_rgba(44,42,36,0.08)] transition-all">
      <div className="flex justify-between items-start mb-4">
        <span className={`material-symbols-outlined p-2 rounded-lg ${iconClass}`}>
          {icon}
        </span>
        <span className={`text-[12px] font-medium px-2 py-1 rounded-full ${trendClass}`}>
          {trend}
        </span>
      </div>

      <p className="text-[14px] font-semibold text-[#41474f] mb-1">{label}</p>
      <h3 className="text-[24px] font-semibold text-[#191c20]">{value}</h3>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-[12px] font-medium text-[#41474f]">{label}</span>
    </div>
  );
}

type BarGroupProps = {
  day: string;
  eventHeight: string;
  falseAlarmHeight: string;
};

function BarGroup({ day, eventHeight, falseAlarmHeight }: BarGroupProps) {
  return (
    <div className="flex-1 flex flex-col justify-end items-center gap-1">
      <div className="w-full flex gap-1 items-end h-full">
        <div
          className="flex-1 bg-[#4A86C0] rounded-t-sm"
          style={{ height: eventHeight }}
        />
        <div
          className="flex-1 bg-[#C5DAF0] rounded-t-sm"
          style={{ height: falseAlarmHeight }}
        />
      </div>
      <span className="text-[12px] font-medium text-[#41474f]">{day}</span>
    </div>
  );
}

function TableHeader({ children }: { children: string }) {
  return (
    <th className="px-6 py-4 text-[14px] font-semibold text-[#41474f]">
      {children}
    </th>
  );
}

type ScenarioStatus = "Pass" | "Fail";

type ScenarioRowProps = {
  name: string;
  category: string;
  lastRun: string;
  response: string;
  status: ScenarioStatus;
  striped: boolean;
};

function ScenarioRow({
  name,
  category,
  lastRun,
  response,
  status,
  striped,
}: ScenarioRowProps) {
  const isPass = status === "Pass";

  return (
    <tr
      className={`border-b border-[#F3EDD9] ${
        striped ? "bg-[#F9F5EC]" : "bg-white"
      } hover:bg-[#f2f3f9] transition-colors`}
    >
      <td className="px-6 py-4 font-medium">{name}</td>
      <td className="px-6 py-4 text-[#41474f]">{category}</td>
      <td className="px-6 py-4 text-[#41474f] text-sm">{lastRun}</td>
      <td className="px-6 py-4 text-[#41474f]">{response}</td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            isPass
              ? "bg-[#a3f4c1] text-[#207249]"
              : "bg-[#ffdad6] text-[#93000a]"
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">
            {isPass ? "check_circle" : "cancel"}
          </span>
          {status}
        </span>
      </td>
    </tr>
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
      <span className="text-[12px] font-medium mt-0.5">{label}</span>
    </button>
  );
}
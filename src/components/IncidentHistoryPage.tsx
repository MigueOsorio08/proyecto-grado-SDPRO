export default function IncidentHistoryPage() {
  return (
    <div className="min-h-screen bg-[#FDFAF5] text-[#191c20] font-sans pb-24 md:pb-0">
      <header className="bg-white shadow-sm border-b border-[#e1e2e7] flex justify-between items-center w-full px-5 md:px-10 h-16 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#195f97]">
            shield_with_heart
          </span>
          <span className="text-[24px] font-bold text-[#195f97] tracking-tight">
            SafeDrive
          </span>
        </div>

        <nav className="hidden md:flex gap-8 items-center h-full">
          <HeaderNavItem label="Dashboard" />
          <HeaderNavItem label="Safety" />
          <a
            className="text-[14px] font-semibold text-[#195f97] border-b-2 border-[#195f97] pb-1"
            href="#"
          >
            History
          </a>
          <HeaderNavItem label="Settings" />
        </nav>

        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-[#41474f] p-2 rounded-full hover:bg-[#e7e8ed] transition-colors">
            notifications
          </button>
          <button className="material-symbols-outlined text-[#41474f] p-2 rounded-full hover:bg-[#e7e8ed] transition-colors">
            account_circle
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 md:px-10 py-8">
        <div className="mb-8">
          <h1 className="text-[32px] leading-[1.3] font-semibold text-[#191c20] mb-2">
            Incident History
          </h1>
          <p className="text-[16px] leading-[1.6] text-[#41474f]">
            Review and manage safety event logs from your fleet.
          </p>
        </div>

        <section className="bg-white border border-[#F3EDD9] rounded-xl p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
            <FilterSelect
              label="Driver"
              options={["All Drivers", "Sarah Jenkins", "Marcus Thorne", "Elena Rodriguez"]}
            />

            <FilterSelect
              label="Vehicle"
              options={[
                "All Vehicles",
                "Ford Transit - SF-239",
                "Mercedes Sprinter - TX-882",
                "Tesla Model 3 - CA-101",
              ]}
            />

            <FilterSelect
              label="Event Type"
              options={[
                "All Events",
                "Microsleep",
                "Hard Braking",
                "Distracted Driving",
                "Lane Departure",
              ]}
            />

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#41474f]">
                Date Range
              </label>

              <div className="relative">
                <input
                  className="w-full bg-white border border-[#EDE6CE] rounded-lg px-3 py-2.5 text-[#191c20] focus:ring-2 focus:ring-[#195f97]/20 focus:border-[#195f97] outline-none"
                  readOnly
                  type="text"
                  value="Oct 12 - Oct 19, 2023"
                />
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#41474f] text-[20px]">
                  calendar_today
                </span>
              </div>
            </div>

            <div className="md:col-span-4 lg:col-span-1">
              <button className="w-full bg-[#4A86C0] text-white text-[14px] font-semibold py-3 rounded-lg hover:bg-[#3d72a6] transition-all flex items-center justify-center gap-2 active:scale-95">
                <span className="material-symbols-outlined text-[18px]">
                  filter_list
                </span>
                Apply Filters
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(44,42,36,0.04)] overflow-hidden border border-[#F3EDD9]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#F3EDD9]">
                <tr>
                  <TableHeader>Date & Time</TableHeader>
                  <TableHeader>Driver</TableHeader>
                  <TableHeader>Vehicle</TableHeader>
                  <TableHeader>Event Type</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <th className="px-6 py-4 text-[14px] font-semibold text-[#191c20] text-right">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F3EDD9]">
                <IncidentRow
                  striped={false}
                  date="Oct 19, 2023"
                  time="14:22:10"
                  driver="Sarah Jenkins"
                  image="https://lh3.googleusercontent.com/aida-public/AB6AXuCrO9l1hgJ6GCZCIpEFIOH0VQrbegF09BX7rPG4NZogWVveUIjFBVkdWvv8ttPU7ZxoZWIVuVoOKJxhKxCuWM6rqJSD4Q6e4Rc57xwimYi1w-z2YifUA806-P9J6J_5luuy4KoLqLk3_8RK2wxdLmM-gzJwTm8za7hiO6Q7HIa21ITK7FMLtqT_6YX7M4x9yT-NoC4-pqBAOT8B6-7sCkce_RAJmk5PmbxpFPpZrVsv4O8bxfC-O5sADHO0KWVk78joRPE-RlZyCkCo"
                  vehicle="SF-239-JK"
                  eventLabel="Microsleep Detected"
                  severity="high"
                  status="Emergency Logged"
                  action="View Details"
                  actionIcon="open_in_new"
                />

                <IncidentRow
                  striped
                  date="Oct 19, 2023"
                  time="11:05:45"
                  driver="Marcus Thorne"
                  image="https://lh3.googleusercontent.com/aida-public/AB6AXuCB2yLhS8bDo1swvXntV-uDNFFxPsnjqhUs34auJqjFOZn0ROd4avBYaG4Wz7XgbDirg6AzdhiirVjAfSrWmz4uzWTi0HjM-RpFsJ1r6nPJQKxWIr_tgVMnJIeGwUlXQ4MYgR0SBVWqUTAKBJa86zBD2UK7txZ0JRYzAWWReEXq5WXfwX1djFrsoCcUdB-B8j-Ag6V44OBiTddHvGKqeZR7NdprqVoG-yEn09tKCe1Eh1ZrSQwaFdyuXlnbHJdW5cpHypYAl2gADlid"
                  vehicle="TX-882-MT"
                  eventLabel="Distraction Alert"
                  severity="medium"
                  status="Driver Warned"
                  action="View Evidence"
                  actionIcon="visibility"
                />

                <IncidentRow
                  striped={false}
                  date="Oct 18, 2023"
                  time="16:50:22"
                  driver="David Chen"
                  image="https://lh3.googleusercontent.com/aida-public/AB6AXuAj3fFkIe-JM6YFMoxSnKt14XwsxBaVtv4FRzoXmjsJDUFvyotXj2rB_TTjYDQ1GvLV841mdqe0B6KKo1f9_xfTyE0niBobCPOh4B8ZOOzz34iKk90nOOWBo74pLUX5vf35vrehPNDKp2oPtwRbZxhadcqvA7aXp4MbG5OdmuRr6Tt7aAuzK-XwSO5uVViX1Rf86mA84Y6E3xginodbes7wPARF4M09hTGDZcSIW10Igz_7CYEMD5sRjFzjkvLhJs_Q88x8TGb2MSli"
                  vehicle="CA-101-DC"
                  eventLabel="False Alarm"
                  severity="neutral"
                  status="Dismissed"
                  action="Review"
                  actionIcon="history_edu"
                />

                <IncidentRow
                  striped
                  date="Oct 18, 2023"
                  time="08:12:00"
                  driver="Elena Rodriguez"
                  image="https://lh3.googleusercontent.com/aida-public/AB6AXuBO0YkWTjegsCaenyRYLhMzNJ5XSjsrhGc9_mjgHPjujWNkt4R8c4jfomyZJSQ0-uRCHfuj8kEtO5LlRJpVUgzAsAoJWN_ilD1YpSLFsnx5pkWtZ9elWPqtIkUqlE8TutoLVmXvxdYUtUEW4JqT1cBZ8IeJgc4bW4Ktg8x3DK-E8Hs183R97rggxMveYI_uPSOvB4NGZNu6XPq7sdGORbtFaIg4ihzGPTfE8OalWJNaRqWOsU6p7dKm8OPToG-ZjNnhuAQ1EtehG2-J"
                  vehicle="FL-445-ER"
                  eventLabel="Hard Braking"
                  severity="medium"
                  status="Logged"
                  action="View Evidence"
                  actionIcon="videocam"
                />
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-white border-t border-[#F3EDD9] flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#41474f]">
              Showing 4 of 128 incidents
            </span>

            <div className="flex gap-2">
              <button
                className="p-2 rounded-lg border border-[#EDE6CE] hover:bg-[#f2f3f9] transition-colors active:scale-95 disabled:opacity-50"
                disabled
              >
                <span className="material-symbols-outlined text-[20px]">
                  chevron_left
                </span>
              </button>

              <button className="px-4 py-2 rounded-lg bg-[#3a78b1] text-white text-[14px] font-semibold">
                1
              </button>
              <button className="px-4 py-2 rounded-lg hover:bg-[#f2f3f9] text-[14px] font-semibold">
                2
              </button>
              <button className="px-4 py-2 rounded-lg hover:bg-[#f2f3f9] text-[14px] font-semibold">
                3
              </button>

              <button className="p-2 rounded-lg border border-[#EDE6CE] hover:bg-[#f2f3f9] transition-colors active:scale-95">
                <span className="material-symbols-outlined text-[20px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white border-t border-[#e1e2e7] rounded-t-xl shadow-lg">
        <BottomNavItem icon="speed" label="Dashboard" />
        <BottomNavItem icon="visibility_lock" label="Safety" />

        <button className="flex flex-col items-center justify-center bg-[#a3f4c1] text-[#207249] rounded-full px-4 py-1 active:scale-90 transition-all duration-200">
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="text-[12px] font-medium">History</span>
        </button>

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

function TableHeader({ children }: { children: string }) {
  return (
    <th className="px-6 py-4 text-[14px] font-semibold text-[#191c20]">
      {children}
    </th>
  );
}

type FilterSelectProps = {
  label: string;
  options: string[];
};

function FilterSelect({ label, options }: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[14px] font-semibold text-[#41474f]">{label}</label>
      <select className="w-full bg-white border border-[#EDE6CE] rounded-lg px-3 py-2.5 text-[#191c20] focus:ring-2 focus:ring-[#195f97]/20 focus:border-[#195f97] outline-none">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

type Severity = "high" | "medium" | "neutral";

type IncidentRowProps = {
  striped: boolean;
  date: string;
  time: string;
  driver: string;
  image: string;
  vehicle: string;
  eventLabel: string;
  severity: Severity;
  status: string;
  action: string;
  actionIcon: string;
};

function IncidentRow({
  striped,
  date,
  time,
  driver,
  image,
  vehicle,
  eventLabel,
  severity,
  status,
  action,
  actionIcon,
}: IncidentRowProps) {
  const severityStyles: Record<
    Severity,
    { badge: string; dot: string; status: string }
  > = {
    high: {
      badge: "bg-[#FAEAEA] text-[#C0514F]",
      dot: "bg-[#C0514F]",
      status: "text-[#C0514F]",
    },
    medium: {
      badge: "bg-[#FEF4E8] text-[#D4893A]",
      dot: "bg-[#D4893A]",
      status: "text-[#D4893A]",
    },
    neutral: {
      badge: "bg-[#F3F4F6] text-[#A89E88]",
      dot: "bg-[#A89E88]",
      status: "text-[#717781]",
    },
  };

  const styles = severityStyles[severity];

  return (
    <tr className={`${striped ? "bg-[#F9F5EC]" : "bg-white"} hover:bg-[#f2f3f9] transition-colors`}>
      <td className="px-6 py-5">
        <p className="text-[14px] font-semibold text-[#191c20]">{date}</p>
        <p className="text-[12px] text-[#41474f]">{time}</p>
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#e1e2e7] overflow-hidden">
            <img
              className="w-full h-full object-cover"
              alt={driver}
              src={image}
            />
          </div>
          <span className="text-[16px] text-[#191c20]">{driver}</span>
        </div>
      </td>

      <td className="px-6 py-5">
        <span className="text-[12px] font-medium px-2 py-1 bg-[#e1e2e7] rounded text-[#41474f]">
          {vehicle}
        </span>
      </td>

      <td className="px-6 py-5">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold ${styles.badge}`}
        >
          <span className={`w-2 h-2 rounded-full ${styles.dot}`} />
          {eventLabel}
        </span>
      </td>

      <td className="px-6 py-5">
        <span className={`text-[12px] font-medium ${styles.status}`}>
          {status}
        </span>
      </td>

      <td className="px-6 py-5 text-right">
        <button className="text-[#4A86C0] text-[14px] font-semibold hover:underline inline-flex items-center gap-1">
          {action}
          <span className="material-symbols-outlined text-[16px]">
            {actionIcon}
          </span>
        </button>
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
    <button className="flex flex-col items-center justify-center text-[#41474f] active:scale-90 transition-all duration-200">
      <span className="material-symbols-outlined">{icon}</span>
      <span className="text-[12px] font-medium">{label}</span>
    </button>
  );
}
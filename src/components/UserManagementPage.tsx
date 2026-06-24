export default function UserManagementPage() {
  return (
    <div className="min-h-screen bg-[#FDFAF5] text-[#191c20] font-sans overflow-x-hidden pb-24 md:pb-0">
      <nav className="sticky top-0 z-40 bg-white flex justify-between items-center w-full px-5 md:px-10 h-16 border-b border-[#e1e2e7] shadow-sm">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#195f97]">
            shield_with_heart
          </span>
          <span className="text-[24px] font-bold text-[#195f97] tracking-tight">
            SafeDrive
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <NavLink label="Dashboard" />
          <NavLink label="Safety" />
          <NavLink label="History" />
          <a className="text-[14px] font-semibold text-[#195f97] border-b-2 border-[#195f97] pb-1" href="#">
            Settings
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-[#41474f] hover:bg-[#e7e8ed] p-2 rounded-full transition-all">
            account_circle
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-5 md:px-10 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex-1 max-w-2xl relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#706A5A]">
              search
            </span>
            <input
              className="w-full pl-12 pr-4 py-3 bg-white border border-[#EDE6CE] rounded-xl focus:ring-2 focus:ring-[#4A86C0]/20 focus:border-[#4A86C0] outline-none transition-all"
              placeholder="Search by name, email, or role..."
              type="text"
            />
          </div>

          <button className="bg-[#4A86C0] text-white px-6 py-3 rounded-xl text-[14px] font-semibold flex items-center justify-center gap-2 hover:brightness-95 active:scale-95 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            New user
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-[0px_4px_20px_rgba(44,42,36,0.04)] overflow-hidden border border-[#F3EDD9]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F5EC]/50">
                  <TableHeader>User</TableHeader>
                  <TableHeader>Role</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Last Active</TableHeader>
                  <th className="px-6 py-4 text-[14px] font-semibold text-[#706A5A] border-b border-[#F3EDD9] text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F3EDD9]">
                <UserRow
                  initials="JD"
                  name="Julianne Davis"
                  email="julianne.d@safedrive.io"
                  role="Admin"
                  roleType="admin"
                  active
                  lastActive="2 mins ago"
                  striped={false}
                />

                <UserRow
                  initials="MR"
                  name="Marcus Rodriguez"
                  email="m.rodriguez@safedrive.io"
                  role="Operator"
                  roleType="operator"
                  active
                  lastActive="1 hour ago"
                  striped
                />

                <UserRow
                  initials="SC"
                  name="Sarah Chen"
                  email="sarah.chen@analytics.com"
                  role="Researcher"
                  roleType="researcher"
                  lastActive="Yesterday"
                  striped={false}
                />

                <UserRow
                  initials="BK"
                  name="Ben Kingston"
                  email="ben.k@safedrive.io"
                  role="Operator"
                  roleType="operator"
                  active
                  lastActive="3 days ago"
                  striped
                />
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-[#F3EDD9] flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#706A5A]">
              Showing 4 of 128 users
            </span>

            <div className="flex gap-2">
              <button className="px-3 py-1 rounded border border-[#EDE6CE] text-[12px] font-medium hover:bg-[#F9F5EC] transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 rounded border border-[#EDE6CE] text-[12px] font-medium hover:bg-[#F9F5EC] transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="absolute inset-0 bg-[#191c20]/20 pointer-events-auto backdrop-blur-[2px]" />

        <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl pointer-events-auto flex flex-col border-l border-[#F3EDD9]">
          <div className="px-6 py-6 border-b border-[#F3EDD9] flex items-center justify-between">
            <h2 className="text-[24px] font-semibold text-[#191c20]">
              New User
            </h2>
            <button className="material-symbols-outlined text-[#706A5A] hover:text-[#ba1a1a]">
              close
            </button>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <DrawerInput label="Full Name" placeholder="e.g. Elena Gilbert" type="text" />
            <DrawerInput label="Email Address" placeholder="e.g. elena@company.com" type="email" />

            <div className="space-y-2">
              <label className="text-[14px] font-semibold text-[#41474f]">
                Assigned Role
              </label>

              <div className="grid grid-cols-1 gap-3">
                <RoleOption
                  title="Administrator"
                  description="Full access to system settings and users"
                  checked
                />

                <RoleOption
                  title="Operator"
                  description="Access to live monitors and alerts"
                />

                <RoleOption
                  title="Researcher"
                  description="Analytical and data export tools only"
                />
              </div>
            </div>

            <div className="bg-[#F9F5EC] p-4 rounded-xl border border-[#F3EDD9]">
              <p className="text-[12px] font-medium text-[#706A5A] italic">
                An invitation email will be sent to the user immediately after account creation.
              </p>
            </div>
          </div>

          <div className="p-6 border-t border-[#F3EDD9] flex gap-3">
            <button className="flex-1 bg-[#4A86C0] text-white py-3 rounded-xl text-[14px] font-semibold hover:brightness-95 active:scale-95 transition-all">
              Create User
            </button>
            <button className="px-6 py-3 border border-[#EDE6CE] rounded-xl text-[14px] font-semibold text-[#706A5A] hover:bg-[#F9F5EC] transition-all">
              Cancel
            </button>
          </div>
        </aside>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white border-t border-[#e1e2e7] shadow-lg rounded-t-xl">
        <BottomNavItem icon="speed" label="Dashboard" />
        <BottomNavItem icon="visibility_lock" label="Safety" />
        <BottomNavItem icon="receipt_long" label="History" />

        <div className="flex flex-col items-center justify-center bg-[#a3f4c1] text-[#207249] rounded-full px-4 py-1">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[12px] font-medium">Settings</span>
        </div>
      </nav>
    </div>
  );
}

function NavLink({ label }: { label: string }) {
  return (
    <a
      className="text-[14px] font-semibold text-[#41474f] hover:text-[#195f97] transition-colors duration-200"
      href="#"
    >
      {label}
    </a>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-6 py-4 text-[14px] font-semibold text-[#706A5A] border-b border-[#F3EDD9]">
      {children}
    </th>
  );
}

type UserRowProps = {
  initials: string;
  name: string;
  email: string;
  role: string;
  roleType: "admin" | "operator" | "researcher";
  active?: boolean;
  lastActive: string;
  striped: boolean;
};

function UserRow({
  initials,
  name,
  email,
  role,
  roleType,
  active = false,
  lastActive,
  striped,
}: UserRowProps) {
  const avatarClass =
    roleType === "admin"
      ? "bg-[#d0e4ff] text-[#00497a]"
      : roleType === "operator"
        ? "bg-[#a3f4c1] text-[#176c43]"
        : "bg-[#f7bd59] text-[#7b5500]";

  const roleClass =
    roleType === "admin"
      ? "bg-[#d0e4ff] text-[#00497a]"
      : roleType === "operator"
        ? "bg-[#a3f4c1] text-[#207249]"
        : "bg-[#ffdead] text-[#604100]";

  return (
    <tr className={`${striped ? "bg-[#F9F5EC]" : "bg-white"} hover:bg-[#F9F5EC]/30 transition-colors`}>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${avatarClass} flex items-center justify-center font-bold`}>
            {initials}
          </div>

          <div>
            <p className="text-[14px] font-semibold text-[#191c20]">{name}</p>
            <p className="text-[12px] font-medium text-[#706A5A]">{email}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${roleClass}`}>
          {role}
        </span>
      </td>

      <td className="px-6 py-4">
        <ToggleSwitch checked={active} />
      </td>

      <td className="px-6 py-4 text-[12px] font-medium text-[#706A5A]">
        {lastActive}
      </td>

      <td className="px-6 py-4 text-right">
        <button className="material-symbols-outlined text-[#706A5A] hover:text-[#4A86C0] transition-colors">
          more_vert
        </button>
      </td>
    </tr>
  );
}

function ToggleSwitch({ checked }: { checked: boolean }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input className="sr-only peer" type="checkbox" defaultChecked={checked} />
      <div className="w-11 h-6 bg-[#F3EDD9] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#176c43]" />
    </label>
  );
}

type DrawerInputProps = {
  label: string;
  placeholder: string;
  type: string;
};

function DrawerInput({ label, placeholder, type }: DrawerInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-[14px] font-semibold text-[#41474f]">
        {label}
      </label>
      <input
        className="w-full px-4 py-3 bg-white border border-[#EDE6CE] rounded-xl focus:ring-2 focus:ring-[#4A86C0]/20 focus:border-[#4A86C0] outline-none transition-all"
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}

type RoleOptionProps = {
  title: string;
  description: string;
  checked?: boolean;
};

function RoleOption({ title, description, checked = false }: RoleOptionProps) {
  return (
    <label className="flex items-center gap-3 p-4 border border-[#EDE6CE] rounded-xl cursor-pointer hover:bg-[#F9F5EC] transition-colors">
      <input
        className="w-4 h-4 text-[#4A86C0] focus:ring-[#4A86C0]"
        name="role"
        type="radio"
        defaultChecked={checked}
      />

      <div>
        <p className="text-[14px] font-semibold text-[#191c20]">{title}</p>
        <p className="text-[12px] font-medium text-[#706A5A]">
          {description}
        </p>
      </div>
    </label>
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
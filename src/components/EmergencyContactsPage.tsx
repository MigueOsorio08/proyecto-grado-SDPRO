export default function EmergencyContactsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFAF5] text-[#2C2A24] font-sans pb-24">
      <header className="bg-white shadow-sm border-b border-[#e1e2e7] flex justify-between items-center w-full px-5 md:px-10 h-16 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#4A86C0]">
            shield_with_heart
          </span>
          <span className="text-[24px] font-bold text-[#4A86C0] tracking-tight">
            SafeDrive
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-[#706A5A] hover:bg-[#F3EDD9] p-2 rounded-full transition-colors">
            notifications
          </button>
          <button className="material-symbols-outlined text-[#706A5A] hover:bg-[#F3EDD9] p-2 rounded-full transition-colors">
            account_circle
          </button>
        </div>
      </header>

      <main className="flex-grow w-full max-w-2xl mx-auto px-5 mt-4">
        <section className="bg-[#F9F5EC] border border-[#F3EDD9] rounded-xl p-4 mb-8 shadow-[0px_4px_20px_rgba(44,42,36,0.04)] flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-[#F3EDD9] flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              alt="Driver profile"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvJ9Pq5qf-IUOfaFPgPQ2hHXjM7TGz_R8ugN-DAcugjLoYu9ahhjeB8wSzZtv4fXnhnSxEe1ukMmgPKIq5mKy_kqO3mcG1-glVLA-6dXYSmSBRZkGxwZR6mr8pK5eNr5i17hj1rAK79IoUSCoag32dhhNDdxvhqsVCNMp_ffW6pgJRIp_bWFRulQJRVBZ62AOaqFeAZzBBpqxwxzBzBHHRgaqJ8Dw3wpzdp_XR2LNFoHNZCvuIYY0wgwlrYyb5eSnx9JK13hVskGLR"
            />
          </div>

          <div className="flex-grow">
            <h2 className="text-[18px] font-semibold text-[#2C2A24]">
              Marcus Sterling
            </h2>
            <p className="text-[#706A5A] text-[14px] font-semibold">
              Tesla Model 3 •{" "}
              <span className="bg-[#F3EDD9] px-2 py-0.5 rounded text-xs">
                ABC 1234
              </span>
            </p>
          </div>

          <div className="hidden sm:block">
            <span className="material-symbols-outlined text-[#4A86C0]">
              verified_user
            </span>
          </div>
        </section>

        <section className="bg-white rounded-xl p-8 shadow-[0px_4px_20px_rgba(44,42,36,0.04)] border border-[#EDE6CE] mb-8">
          <div className="mb-4">
            <h3 className="text-[24px] font-semibold text-[#2C2A24]">
              Register Emergency Contact
            </h3>
            <p className="text-[#706A5A] text-[14px] font-semibold">
              Who should we notify in case of an emergency detection?
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[14px] font-semibold text-[#706A5A] ml-1">
                Contact Full Name
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-[#EDE6CE] bg-white focus:border-[#4A86C0] focus:ring-1 focus:ring-[#4A86C0]/20 outline-none transition-all placeholder:text-[#c1c7d1]"
                placeholder="e.g. Elena Sterling"
                type="text"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[14px] font-semibold text-[#706A5A] ml-1">
                  Relationship
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-[#EDE6CE] bg-white focus:border-[#4A86C0] focus:ring-1 focus:ring-[#4A86C0]/20 outline-none transition-all placeholder:text-[#c1c7d1]"
                  placeholder="e.g. Spouse"
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-semibold text-[#706A5A] ml-1">
                  Phone Number
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-[#EDE6CE] bg-white focus:border-[#4A86C0] focus:ring-1 focus:ring-[#4A86C0]/20 outline-none transition-all placeholder:text-[#c1c7d1]"
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-semibold text-[#706A5A] ml-1">
                Notification Channel
              </label>
              <select className="w-full px-4 py-3 rounded-lg border border-[#EDE6CE] bg-white focus:border-[#4A86C0] focus:ring-1 focus:ring-[#4A86C0]/20 outline-none transition-all">
                <option>WhatsApp</option>
                <option>SMS</option>
                <option>Email</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                className="flex items-center gap-2 text-[#4A86C0] text-[14px] font-semibold border-2 border-[#4A86C0]/20 rounded-lg px-4 py-2 hover:bg-[#4A86C0]/5 transition-all active:scale-95"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">add</span>
                Add another contact
              </button>
            </div>
          </form>
        </section>

        <section className="space-y-2">
          <h4 className="text-[14px] font-semibold text-[#706A5A] uppercase tracking-wider px-1">
            Registered Contacts
          </h4>

          <ContactCard
            name="Sarah Connor"
            info="Sister • SMS • +1 (234) 567-8901"
          />

          <ContactCard
            name="John Doe"
            info="Friend • WhatsApp • +1 (987) 654-3210"
          />
        </section>

        <div className="mt-8 mb-8">
          <button className="w-full bg-[#4A86C0] text-white py-4 rounded-xl text-[18px] font-semibold hover:brightness-95 shadow-lg active:scale-[0.98] transition-all">
            Save contacts
          </button>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white border-t border-[#e1e2e7] shadow-lg rounded-t-xl">
        <BottomNavItem icon="speed" label="Dashboard" />
        <BottomNavItem icon="visibility_lock" label="Safety" />
        <BottomNavItem icon="receipt_long" label="History" />

        <a
          className="flex flex-col items-center justify-center bg-[#a3f4c1] text-[#207249] rounded-full px-4 py-1"
          href="#"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[12px] font-medium mt-1">Settings</span>
        </a>
      </nav>
    </div>
  );
}

type ContactCardProps = {
  name: string;
  info: string;
};

function ContactCard({ name, info }: ContactCardProps) {
  return (
    <div className="bg-[#F9F5EC] border border-[#F3EDD9] rounded-xl p-4 shadow-[0px_4px_20px_rgba(44,42,36,0.04)] flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#4A86C0]/10 flex items-center justify-center text-[#4A86C0]">
          <span className="material-symbols-outlined">person</span>
        </div>

        <div>
          <p className="text-[14px] font-semibold text-[#2C2A24]">{name}</p>
          <p className="text-xs text-[#706A5A]">{info}</p>
        </div>
      </div>

      <button className="p-2 text-[#C0514F] hover:bg-[#FAEAEA] rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
}

type BottomNavItemProps = {
  icon: string;
  label: string;
};

function BottomNavItem({ icon, label }: BottomNavItemProps) {
  return (
    <a
      className="flex flex-col items-center justify-center text-[#706A5A] hover:text-[#4A86C0] transition-colors"
      href="#"
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="text-[12px] font-medium mt-1">{label}</span>
    </a>
  );
}
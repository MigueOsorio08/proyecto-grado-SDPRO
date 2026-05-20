export default function DriverRegistrationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFAF5] text-[#191c20] font-sans antialiased">
      <header className="bg-white shadow-sm border-b border-[#e1e2e7] flex justify-between items-center w-full px-5 md:px-10 h-16 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#195f97] text-2xl">
            shield_with_heart
          </span>
          <span className="text-[24px] font-bold text-[#195f97] tracking-tight">
            SafeDrive
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-[#41474f] hover:bg-[#e7e8ed] transition-colors duration-200 p-2 rounded-full active:scale-95">
            notifications
          </button>
          <button className="material-symbols-outlined text-[#41474f] hover:bg-[#e7e8ed] transition-colors duration-200 p-2 rounded-full active:scale-95">
            account_circle
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-5 md:px-10 py-8 max-w-6xl pb-28 md:pb-8">
        <header className="mb-8">
          <h1 className="text-[28px] md:text-[32px] leading-[1.3] font-semibold text-[#191c20] mb-2">
            Registration
          </h1>
          <p className="text-[16px] leading-[1.6] text-[#706A5A]">
            Complete the details below to register a new driver and their primary vehicle.
          </p>
        </header>

        <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white border border-[#F3EDD9] rounded-xl p-4 shadow-[0px_4px_20px_rgba(44,42,36,0.04)]">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#F3EDD9]">
                <span className="material-symbols-outlined text-[#4A86C0]">
                  person
                </span>
                <h2 className="text-[24px] leading-[1.4] font-semibold text-[#191c20]">
                  Driver information
                </h2>
              </div>

              <div className="space-y-4">
                <FormInput label="Full name" placeholder="e.g. Jonathan Doe" type="text" />
                <FormInput label="ID number" placeholder="Government issued ID" type="text" />
                <FormInput label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
                <FormInput label="Email" placeholder="driver@safedrive.com" type="email" />
              </div>
            </section>

            <section className="bg-white border border-[#F3EDD9] rounded-xl p-4 shadow-[0px_4px_20px_rgba(44,42,36,0.04)]">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#F3EDD9]">
                <span className="material-symbols-outlined text-[#4A86C0]">
                  directions_car
                </span>
                <h2 className="text-[24px] leading-[1.4] font-semibold text-[#191c20]">
                  Vehicle information
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <FormInput label="License plate" placeholder="ABC-1234" type="text" />
                </div>

                <FormInput label="Make" placeholder="e.g. Toyota" type="text" />
                <FormInput label="Model" placeholder="e.g. Camry" type="text" />
                <FormInput label="Year" placeholder="2024" type="number" />
                <FormInput label="Color" placeholder="Metallic Grey" type="text" />
              </div>
            </section>
          </div>

          <section className="bg-white border-2 border-dashed border-[#EDE6CE] rounded-xl p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-[0px_4px_20px_rgba(44,42,36,0.04)]">
            <div className="w-16 h-16 bg-[#EBF2FA] rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[#4A86C0] text-4xl">
                photo_camera
              </span>
            </div>

            <h2 className="text-[24px] leading-[1.4] font-semibold text-[#191c20] mb-2">
              Facial registration
            </h2>

            <p className="text-[16px] leading-[1.6] text-[#706A5A] mb-4 max-w-md">
              Capture a clear photo of the driver's face for identity verification and
              microsleep detection calibration.
            </p>

            <div className="w-full max-w-sm">
              <label className="relative block border-2 border-dashed border-[#F3EDD9] rounded-lg p-8 cursor-pointer hover:bg-[#FDFAF5] transition-colors">
                <input
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  type="file"
                  accept="image/png,image/jpeg"
                />
                <span className="text-[14px] font-semibold text-[#4A86C0]">
                  Upload or capture driver photo
                </span>
                <p className="text-xs text-[#706A5A] mt-1">PNG, JPG up to 10MB</p>
              </label>
            </div>
          </section>

          <footer className="flex items-center justify-end gap-4 pt-4">
            <button
              className="px-6 py-2 border border-[#F3EDD9] rounded-lg text-[14px] font-semibold text-[#706A5A] hover:bg-[#FDFAF5] transition-colors active:scale-95"
              type="button"
            >
              Cancel
            </button>

            <button
              className="px-8 py-2 bg-[#4A86C0] text-white rounded-lg text-[14px] font-semibold shadow-sm hover:brightness-95 transition-all active:scale-95"
              type="submit"
            >
              Save driver
            </button>
          </footer>
        </form>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white border-t border-[#e1e2e7] shadow-lg rounded-t-xl">
        <BottomNavItem icon="speed" label="Dashboard" />

        <a
          className="flex flex-col items-center justify-center bg-[#a3f4c1] text-[#207249] rounded-full px-4 py-1"
          href="#"
        >
          <span className="material-symbols-outlined">visibility_lock</span>
          <span className="text-[12px] font-medium">Safety</span>
        </a>

        <BottomNavItem icon="receipt_long" label="History" />
        <BottomNavItem icon="settings" label="Settings" />
      </nav>
    </div>
  );
}

type FormInputProps = {
  label: string;
  placeholder: string;
  type: string;
};

function FormInput({ label, placeholder, type }: FormInputProps) {
  return (
    <div>
      <label className="block text-[14px] font-semibold text-[#706A5A] mb-1">
        {label}
      </label>
      <input
        className="w-full bg-white border border-[#EDE6CE] rounded-lg px-4 py-2 text-[#2C2A24] focus:ring-2 focus:ring-[#4A86C0]/20 focus:border-[#4A86C0] outline-none transition-all"
        placeholder={placeholder}
        type={type}
      />
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
      className="flex flex-col items-center justify-center text-[#41474f] hover:text-[#195f97] transition-colors"
      href="#"
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="text-[12px] font-medium">{label}</span>
    </a>
  );
}
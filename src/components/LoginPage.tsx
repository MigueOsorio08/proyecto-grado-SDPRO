import React from "react";
// @ts-ignore: allow importing svg assets without type declarations
import logo from "../assets/logo.svg";

export default function LoginPage() {
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

          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#706A5A]" htmlFor="email">
                Email Address
              </label>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#c1c7d1] text-[20px]">
                  mail
                </span>

                <input
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#EDE6CE] bg-white text-[16px] leading-[1.6] focus:ring-2 focus:ring-[#4A86C0]/20 focus:border-[#4A86C0] outline-none transition-all placeholder:text-[#c1c7d1]"
                  id="email"
                  placeholder="name@company.com"
                  type="email"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#706A5A]" htmlFor="password">
                Password
              </label>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#c1c7d1] text-[20px]">
                  lock
                </span>

                <input
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-[#EDE6CE] bg-white text-[16px] leading-[1.6] focus:ring-2 focus:ring-[#4A86C0]/20 focus:border-[#4A86C0] outline-none transition-all placeholder:text-[#c1c7d1]"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                />

                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c1c7d1] hover:text-[#195f97] transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  className="w-4 h-4 rounded border-[#c1c7d1] text-[#195f97] focus:ring-[#195f97]/20"
                  type="checkbox"
                />
                <span className="text-[12px] font-medium text-[#706A5A]">
                  Remember me
                </span>
              </label>
            </div>

            <button
              className="bg-[#4A86C0] hover:bg-[#3d71a3] text-white text-[14px] font-semibold py-4 rounded-lg shadow-sm active:scale-[0.98] transition-all"
              type="submit"
            >
              Sign in
            </button>

            <div className="text-center">
              <a
                className="text-[12px] font-medium text-[#706A5A] hover:text-[#195f97] transition-colors underline-offset-4 hover:underline"
                href="#"
              >
                Forgot password?
              </a>
            </div>
          </form>

          <footer className="pt-4 border-t border-[#F3EDD9] text-center">
            <p className="text-[12px] font-medium text-[#706A5A]">
              Don&apos;t have an account?{" "}
              <a className="text-[#195f97] font-bold hover:underline" href="#">
                Register now
              </a>
            </p>
          </footer>
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
// Register.jsx
import React, {useEffect, useState} from "react";
import {signupApi} from "../api"
const colors = {
  primary: "#2463eb",
  backgroundLight: "#f6f6f8",
  backgroundDark: "#111621",
  slate800: "#1e293b",
  slate900: "#0f172a",
  slate200: "#e2e8f0",
  slate400: "#94a3b8",
  slate500: "#64748b",
  slate600: "#475569",
  slate700: "#334155",
};


const isDark = false; // implement logic if you want dark mode toggle
const col = (light, dark) => (isDark ? dark : light);

export default function Signup() {
 const [fullName, setFullName] = useState("");
 const [email, setEmail] = useState("") 
 const [password, setPassword] = useState("")
 const [conformPassword, setConformPassword] = useState("")


  const formSubmit = async (e) => {
  e.preventDefault()
   let res = await signupApi({fullName, email, password, conformPassword});
   console.log(res)

}
  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden"
      style={{
        backgroundColor: col(colors.backgroundLight, colors.backgroundDark),
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="flex h-full grow flex-col">
        <div className="px-4 flex flex-1 justify-center py-5">
          <div className="flex flex-col w-full max-w-[960px] flex-1">
            {/* Header */}
            <header
              className="flex items-center justify-between whitespace-nowrap px-4 sm:px-10 py-3"
              style={{
                color: col(colors.slate800, colors.slate200),
              }}
            >
              <div className="flex items-center gap-4">
                <div className="size-6" style={{ color: colors.primary }}>
                  <svg fill="none" viewBox="0 0 48 48">
                    <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
                  </svg>
                </div>
                <h2
                  className="text-lg font-bold leading-tight"
                  style={{ letterSpacing: "-0.015em" }}
                >
                  ShopSmart
                </h2>
              </div>
              <div className="flex gap-2">
                <a
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
                  style={{
                    background: colors.primary,
                    color: "#fff",
                  }}
                  href="#"
                >
                  <span className="truncate">Sign In</span>
                </a>
                <a
                  className="hidden sm:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  style={{
                    background: col("rgba(226,232,240,0.8)", "rgba(51,65,85,0.5)"),
                    color: col(colors.slate800, colors.slate200),
                  }}
                  href="#"
                >
                  <span className="truncate">Help</span>
                </a>
              </div>
            </header>
            {/* Main Content */}
            <main className="flex flex-1 items-center justify-center py-10">
              <div className="flex flex-col w-full max-w-md">
                <div className="flex flex-col gap-3 p-4 text-center">
                  <h1
                    className="text-4xl font-black leading-tight"
                    style={{
                      color: col("#1e293b", "#fff"),
                      letterSpacing: "-0.033em",
                    }}
                  >
                    Create Your Account
                  </h1>
                  <p
                    className="text-base font-normal leading-normal"
                    style={{
                      color: col("#64748b", "#94a3b8"),
                    }}
                  >
                    Join us to get the best deals and personalized offers.
                  </p>
                </div>
                <div
                  className="rounded-xl shadow-sm border p-6 sm:p-8 mt-6"
                  style={{
                    background: col("#fff", "rgba(51,65,85,0.5)"),
                    borderColor: col(colors.slate200, colors.slate700),
                  }}
                >
                  <form className="flex flex-col gap-6" onSubmit={formSubmit}>
                    {/* Full Name */}
                    <label className="flex flex-col flex-1">
                      <p
                        className="text-sm font-medium leading-normal pb-2"
                        style={{
                          color: col(colors.slate800, colors.slate200),
                        }}
                      >
                        Full Name
                      </p>
                      <input
                        className="form-input flex w-full resize-none rounded-lg h-12 p-3 text-base font-normal leading-normal"
                        style={{
                          color: col(colors.slate800, colors.slate200),
                          background: col(colors.backgroundLight, colors.backgroundDark),
                          borderColor: col(colors.slate200, colors.slate600),
                        }}
                        placeholder="Enter your full name"
                        type="text"
                        autoComplete="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </label>
                    {/* Email Address */}
                    <label className="flex flex-col flex-1">
                      <p
                        className="text-sm font-medium leading-normal pb-2"
                        style={{
                          color: col(colors.slate800, colors.slate200),
                        }}
                      >
                        Email Address
                      </p>
                      <input
                        className="form-input flex w-full resize-none rounded-lg h-12 p-3 text-base font-normal leading-normal"
                        style={{
                          color: col(colors.slate800, colors.slate200),
                          background: col(colors.backgroundLight, colors.backgroundDark),
                          borderColor: col(colors.slate200, colors.slate600),
                        }}
                        placeholder="john.doe@example.com"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                    {/* Password */}
                    <label className="flex flex-col flex-1">
                      <p
                        className="text-sm font-medium leading-normal pb-2"
                        style={{
                          color: col(colors.slate800, colors.slate200),
                        }}
                      >
                        Password
                      </p>
                      <div className="relative flex w-full items-stretch">
                        <input
                          className="form-input flex w-full resize-none rounded-lg h-12 p-3 pr-10 text-base font-normal leading-normal"
                          style={{
                            color: col(colors.slate800, colors.slate200),
                            background: col(colors.backgroundLight, colors.backgroundDark),
                            borderColor: col(colors.slate200, colors.slate600),
                          }}
                          placeholder="Enter your password"
                          type="password"
                          autoComplete="new-password"
                          value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          className="absolute inset-y-0 right-0 flex items-center pr-3 hover:text-primary"
                          style={{
                            color: col(colors.slate500, colors.slate400),
                          }}
                          type="button"
                          tabIndex={-1}
                        >
                          <span className="material-symbols-outlined">visibility</span>
                        </button>
                      </div>
                    </label>
                    {/* Confirm Password */}
                    <label className="flex flex-col flex-1">
                      <p
                        className="text-sm font-medium leading-normal pb-2"
                        style={{
                          color: col(colors.slate800, colors.slate200),
                        }}
                      >
                        Confirm Password
                      </p>
                      <div className="relative flex w-full items-stretch">
                        <input
                          className="form-input flex w-full resize-none rounded-lg h-12 p-3 pr-10 text-base font-normal leading-normal"
                          style={{
                            color: col(colors.slate800, colors.slate200),
                            background: col(colors.backgroundLight, colors.backgroundDark),
                            borderColor: col(colors.slate200, colors.slate600),
                          }}
                          placeholder="Confirm your password"
                          type="password"
                          autoComplete="new-password"
                          value={conformPassword}
                        onChange={(e) => setConformPassword(e.target.value)}
                        />
                        <button
                          className="absolute inset-y-0 right-0 flex items-center pr-3 hover:text-primary"
                          style={{
                            color: col(colors.slate500, colors.slate400),
                          }}
                          type="button"
                          tabIndex={-1}
                        >
                          <span className="material-symbols-outlined">visibility_off</span>
                        </button>
                      </div>
                    </label>
                    {/* Terms & Policies */}
                    <div
                      className="text-center text-xs"
                      style={{ color: col(colors.slate500, colors.slate400) }}
                    >
                      By registering, you agree to our{" "}
                      <a
                        className="font-medium hover:underline"
                        style={{ color: colors.primary }}
                        href="#"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        className="font-medium hover:underline"
                        style={{ color: colors.primary }}
                        href="#"
                      >
                        Privacy Policy
                      </a>
                      .
                    </div>
                    {/* Register Button */}
                    <button
                      className="flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-lg h-12 px-4 text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
                      style={{
                        background: colors.primary,
                        color: "#fff",
                      }}
                    >
                      <span className="truncate">Register</span>
                    </button>
                  </form>
                </div>
                <div
                  className="mt-6 text-center text-sm"
                  style={{ color: col(colors.slate600, colors.slate400) }}
                >
                  Already have an account?{" "}
                  <a
                    className="font-medium hover:underline"
                    style={{ color: colors.primary }}
                    href="#"
                  >
                    Sign In
                  </a>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

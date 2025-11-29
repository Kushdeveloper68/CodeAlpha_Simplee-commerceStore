// Login.jsx
import React , {useState} from "react";
import {loginApi} from "../api"
const colors = {
  primary: "#2764e7",
  backgroundLight: "#f6f6f8",
  backgroundDark: "#111621",
};

const isDark = false; // Add logic for dark mode if needed
const col = (light, dark) => (isDark ? dark : light);

export default function Login() {
 
   const [email, setEmail] = useState("") 
   const [password, setPassword] = useState("")
  
  
    const formSubmit = async (e) => {
    e.preventDefault()
     let res = await loginApi(email, password);
     console.log(res)
  
  }
  return (
    <form onSubmit={formSubmit}>
    <div
      className="relative flex h-auto min-h-screen w-full flex-col items-center justify-center p-4 group/design-root"
      style={{
        backgroundColor: col(colors.backgroundLight, colors.backgroundDark),
        fontFamily: "'Inter', 'Noto Sans', sans-serif"
      }}
    >
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div
          className="flex items-center gap-3"
          style={{ color: col("#0e121b", "#fff") }}
        >
          <div className="size-8" style={{ color: colors.primary }}>
            <svg fill="none" viewBox="0 0 48 48">
              <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold leading-tight"
            style={{ letterSpacing: "-0.015em" }}>ShopSmart</h2>
        </div>
        <div
          className="flex w-full flex-col items-center rounded-xl border p-6 shadow-sm sm:p-8"
          style={{
            borderColor: col("#E5E7EB", "#22223B"),
            background: col("#fff", "rgba(17,22,33,0.5)"),
          }}
        >
          <div className="flex w-full flex-col items-center gap-2">
            <h1
              className="text-center text-2xl font-bold leading-tight"
              style={{ color: col("#1f2937", "#D1D5DB") }}
            >
              Welcome Back
            </h1>
            <p
              className="text-center text-base font-normal"
              style={{ color: col("#6b7280", "#9ca3af") }}
            >
              Log in to your ShopSmart account
            </p>
          </div>
          <div className="mt-8 flex w-full flex-col gap-4">
            {/* Email */}
            <div className="flex w-full flex-col">
              <label className="flex flex-col">
                <p className="pb-2 text-sm font-medium"
                  style={{ color: col("#1f2937", "#d1d5db") }}>Email Address</p>
                <input
                  className="form-input h-11 w-full resize-none rounded-lg border p-[15px] text-base font-normal leading-normal"
                  style={{
                    borderColor: col("#d0d7e7", "#374151"),
                    background: col("#fff", colors.backgroundDark),
                    color: col("#1f2937", "#D1D5DB"),
                  }}
                  placeholder="Enter your email"
                  type="email"
                  defaultValue=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            {/* Password */}
            <div className="flex w-full flex-col">
              <div className="flex items-center justify-between">
                <label
                  className="pb-2 text-sm font-medium"
                  htmlFor="password"
                  style={{ color: col("#1f2937", "#d1d5db") }}
                >
                  Password
                </label>
                <a className="text-sm font-medium hover:underline"
                  style={{ color: colors.primary }}
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="flex w-full flex-1 items-stretch">
                <input
                  className="form-input h-11 w-full resize-none rounded-lg border p-[15px] text-base font-normal leading-normal"
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  style={{
                    borderColor: col("#d0d7e7", "#374151"),
                    background: col("#fff", colors.backgroundDark),
                    color: col("#1f2937", "#D1D5DB"),
                  }}
                  defaultValue=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Login Button */}
          <button
            className="mt-6 flex h-11 w-full items-center justify-center rounded-lg px-6 text-base font-semibold shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            style={{ background: colors.primary, color: "#fff" }}
          >
            Log In
          </button>
          {/* Divider */}
          <div className="relative mt-6 flex w-full items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div
                className="w-full border-t"
                style={{ borderColor: col("#E5E7EB", "#22223B") }}
              ></div>
            </div>
            <div
              className="relative px-2 text-sm"
              style={{
                background: col("#fff", "rgba(17,22,33,0.5)"),
                color: col("#6b7280", "#9ca3af"),
              }}
            >OR</div>
          </div>
          {/* Social Buttons */}
          <div className="mt-6 flex w-full flex-col gap-3">
            <button
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              style={{
                borderColor: col("#E5E7EB", "#22223B"),
                background: col("#fff", colors.backgroundDark),
                color: col("#1f2937", "#D1D5DB"),
              }}
            >
              {/* Google Icon */}
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                <path d="M22.5777 12.2592C22.5777 11.4593 22.5118 10.6777 22.3856 9.91455H12V14.3312H18.1811C17.923 15.7608 17.1011 16.9723 15.8996 17.8136V20.5011H19.7247C21.5791 18.7845 22.5777 15.8159 22.5777 12.2592Z" fill="#4285F4"></path>
                <path d="M12 23C14.9539 23 17.4828 22.0182 19.7247 20.5011L15.8996 17.8136C14.9539 18.4414 13.5959 18.8468 12 18.8468C9.30553 18.8468 7.02245 17.1118 6.17725 14.7564H2.21094V17.5409C4.435 21.0373 7.93317 23 12 23Z" fill="#34A853"></path>
                <path d="M6.17725 14.7564C5.95318 14.1286 5.82114 13.4636 5.82114 12.7818C5.82114 12.0999 5.95318 11.435 6.17725 10.8072V8.02273H2.21094C1.46455 9.50455 1 11.0864 1 12.7818C1 14.4772 1.46455 16.0591 2.21094 17.5409L6.17725 14.7564Z" fill="#FBBC05"></path>
                <path d="M12 6.71682C13.7845 6.71682 15.0605 7.43545 15.6591 7.99818L19.8164 3.96682C17.4828 1.79818 14.9539 1 12 1C7.93317 1 4.435 2.96273 2.21094 6.45909L6.17725 9.24364C7.02245 6.88818 9.30553 5.15318 12 5.15318" fill="#EA4335"></path>
              </svg>
              <span>Continue with Google</span>
            </button>
            <button
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              style={{
                borderColor: col("#E5E7EB", "#22223B"),
                background: col("#fff", colors.backgroundDark),
                color: col("#1f2937", "#D1D5DB"),
              }}
            >
              {/* Apple Icon */}
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                <path d="M17.4296 16.1102C17.4296 16.1102 18.0601 14.8693 19.3897 14.8693C20.6212 14.8693 21.0827 15.6881 21.826 15.6881C22.5694 15.6881 23.4913 14.721 23.4913 13.0678C23.4913 10.512 21.5796 9.07065 20.0825 9.03531C20.0825 9.03531 18.5167 8.92929 17.4611 10.0924C17.4611 10.0924 16.7177 10.9113 16.3359 10.9113C15.9542 10.9113 15.0638 9.94411 13.6355 9.9803C12.242 10.0156 11.0105 10.9827 10.3458 10.9827C9.68102 10.9827 8.44955 10.0156 7.21808 10.0924C5.75549 10.1639 4.36203 11.4391 4.36203 13.9298C4.36203 17.1723 6.65555 18.548 7.85272 18.548C8.97402 18.548 9.5358 17.7645 10.7673 17.7645C11.9987 17.7645 12.5262 18.548 13.8901 18.548C15.1559 18.548 16.0817 17.7292 16.0817 17.7292" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <path d="M14.9818 6.50586C15.5436 5.50332 16.5647 4.9082 17.7619 4.9082C17.8654 4.9082 18.4959 4.94443 19.092 5.50332" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
              <span>Continue with Apple</span>
            </button>
          </div>
          {/* Sign Up */}
          <p
            className="mt-8 text-center text-sm"
            style={{ color: col("#6b7280", "#9ca3af") }}
          >
            Don't have an account?{" "}
            <a
              className="font-semibold hover:underline"
              style={{ color: colors.primary }}
              href="#">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
    </form>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtpApi, verifySignupApi } from "../api";
import { useAuth } from "../context/authContext";

const colors = {
  primary: "#2764e7",
  backgroundLight: "#f6f6f8",
  backgroundDark: "#111621",
};

const isDark = false;
const col = (light, dark) => (isDark ? dark : light);

export default function Signup() {
  const { setToken } = useAuth(); // keep context usage as-is
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // OTP flow state
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let t;
    if (resendCooldown > 0) {
      t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    }
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
    if (serverError) setServerError("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    else if (formData.fullName.trim().length < 3) newErrors.fullName = "Full name must be at least 3 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // First step: send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");

    if (!validateForm()) return;

    setOtpLoading(true);
    try {
      const res = await sendOtpApi(formData.email.trim());
      if (res && res.success) {
        setOtpSent(true);
        setSuccessMessage("OTP sent to your email. Enter it below to complete signup.");
        setResendCooldown(60); // 60s cooldown for resend
      } else {
        setServerError(res?.message || "Failed to send OTP. Try again.");
      }
    } catch (err) {
      setServerError(err?.message || err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  // Second step: verify OTP and create account
  const handleVerifyAndSignup = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");

    if (!otp || String(otp).trim().length < 4) {
      setServerError("Enter the 6-digit OTP sent to your email");
      return;
    }

    setVerifyLoading(true);
    try {
      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        otp: String(otp).trim(),
      };
      const res = await verifySignupApi(payload);
      if (res && res.success) {
        // set token in context and localStorage
        if (res.token) {
          try {
            setToken(res.token);
          } catch (e) {
            // ignore if context setter not available
          }
          localStorage.setItem("token", res.token);
        }
        if (res.user) localStorage.setItem("user", JSON.stringify(res.user));

        setSuccessMessage("Signup successful. Redirecting...");
        setOtpSent(false);
        setOtp("");
        setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });

        setTimeout(() => navigate("/"), 1200);
      } else {
        setServerError(res?.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setServerError(err?.message || err?.response?.data?.message || "Error verifying OTP");
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setServerError("");
    setSuccessMessage("");
    setOtpLoading(true);
    try {
      const res = await sendOtpApi(formData.email.trim());
      if (res && res.success) {
        setSuccessMessage("OTP resent to your email.");
        setResendCooldown(60);
      } else {
        setServerError(res?.message || "Failed to resend OTP");
      }
    } catch (err) {
      setServerError(err?.message || err?.response?.data?.message || "Error resending OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleEditDetails = () => {
    setOtpSent(false);
    setOtp("");
    setServerError("");
    setSuccessMessage("");
  };

  return (
    <form onSubmit={otpSent ? handleVerifyAndSignup : handleSendOtp}>
      <div
        className="relative flex h-auto min-h-screen w-full flex-col items-center justify-center p-4 group/design-root"
        style={{
          backgroundColor: col(colors.backgroundLight, colors.backgroundDark),
          fontFamily: "'Inter', 'Noto Sans', sans-serif",
        }}
      >
        <div className="flex w-full max-w-md flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3" style={{ color: col("#0e121b", "#fff") }}>
            <div className="size-8" style={{ color: colors.primary }}>
              <svg fill="none" viewBox="0 0 48 48">
                <path
                  d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold leading-tight" style={{ letterSpacing: "-0.015em" }}>
              ShopSmart
            </h2>
          </div>

          {/* Form Card */}
          <div
            className="flex w-full flex-col items-center rounded-xl border p-6 shadow-sm sm:p-8"
            style={{
              borderColor: col("#E5E7EB", "#22223B"),
              background: col("#fff", "rgba(17,22,33,0.5)"),
              position: "relative",
            }}
          >
            {/* Header */}
            <div className="flex w-full flex-col items-center gap-2">
              <h1 className="text-center text-2xl font-bold leading-tight" style={{ color: col("#1f2937", "#D1D5DB") }}>
                Create Account
              </h1>
              <p className="text-center text-base font-normal" style={{ color: col("#6b7280", "#9ca3af") }}>
                Join ShopSmart and start shopping today
              </p>
            </div>

            {/* Success / Server Messages */}
            {successMessage && (
              <div className="mt-4 w-full rounded-md bg-green-50 border border-green-200 p-3 text-sm text-green-700">
                ✓ {successMessage}
              </div>
            )}
            {serverError && (
              <div className="mt-4 w-full rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                ✗ {serverError}
              </div>
            )}

            {/* Form Fields (disabled when otpSent) */}
            <div className="mt-8 flex w-full flex-col gap-4" style={{ pointerEvents: otpSent ? "none" : "auto", opacity: otpSent ? 0.45 : 1 }}>
              {/* Full Name */}
              <div className="flex w-full flex-col">
                <label className="flex flex-col">
                  <p className="pb-2 text-sm font-medium" style={{ color: col("#1f2937", "#d1d5db") }}>
                    Full Name
                  </p>
                  <input
                    className={`form-input h-11 w-full resize-none rounded-lg border p-[15px] text-base font-normal leading-normal transition-colors ${errors.fullName ? "border-red-500 bg-red-50" : ""}`}
                    style={{
                      borderColor: errors.fullName ? "#ef4444" : col("#d0d7e7", "#374151"),
                      background: errors.fullName ? "#fef2f2" : col("#fff", colors.backgroundDark),
                      color: col("#1f2937", "#D1D5DB"),
                    }}
                    placeholder="Enter your full name"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={otpSent}
                  />
                  {errors.fullName && <span className="mt-1 text-xs text-red-600">{errors.fullName}</span>}
                </label>
              </div>

              {/* Email */}
              <div className="flex w-full flex-col">
                <label className="flex flex-col">
                  <p className="pb-2 text-sm font-medium" style={{ color: col("#1f2937", "#d1d5db") }}>
                    Email Address
                  </p>
                  <input
                    className={`form-input h-11 w-full resize-none rounded-lg border p-[15px] text-base font-normal leading-normal transition-colors ${errors.email ? "border-red-500 bg-red-50" : ""}`}
                    style={{
                      borderColor: errors.email ? "#ef4444" : col("#d0d7e7", "#374151"),
                      background: errors.email ? "#fef2f2" : col("#fff", colors.backgroundDark),
                      color: col("#1f2937", "#D1D5DB"),
                    }}
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={otpSent}
                  />
                  {errors.email && <span className="mt-1 text-xs text-red-600">{errors.email}</span>}
                </label>
              </div>

              {/* Password */}
              <div className="flex w-full flex-col">
                <label className="flex flex-col">
                  <p className="pb-2 text-sm font-medium" style={{ color: col("#1f2937", "#d1d5db") }}>
                    Password
                  </p>
                  <input
                    className={`form-input h-11 w-full resize-none rounded-lg border p-[15px] text-base font-normal leading-normal transition-colors ${errors.password ? "border-red-500 bg-red-50" : ""}`}
                    style={{
                      borderColor: errors.password ? "#ef4444" : col("#d0d7e7", "#374151"),
                      background: errors.password ? "#fef2f2" : col("#fff", colors.backgroundDark),
                      color: col("#1f2937", "#D1D5DB"),
                    }}
                    placeholder="Enter a strong password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={otpSent}
                  />
                  {errors.password && <span className="mt-1 text-xs text-red-600">{errors.password}</span>}
                  <span className="mt-1 text-xs" style={{ color: col("#6b7280", "#9ca3af") }}>
                    Must be at least 6 characters
                  </span>
                </label>
              </div>

              {/* Confirm Password */}
              <div className="flex w-full flex-col">
                <label className="flex flex-col">
                  <p className="pb-2 text-sm font-medium" style={{ color: col("#1f2937", "#d1d5db") }}>
                    Confirm Password
                  </p>
                  <input
                    className={`form-input h-11 w-full resize-none rounded-lg border p-[15px] text-base font-normal leading-normal transition-colors ${errors.confirmPassword ? "border-red-500 bg-red-50" : ""}`}
                    style={{
                      borderColor: errors.confirmPassword ? "#ef4444" : col("#d0d7e7", "#374151"),
                      background: errors.confirmPassword ? "#fef2f2" : col("#fff", colors.backgroundDark),
                      color: col("#1f2937", "#D1D5DB"),
                    }}
                    placeholder="Confirm your password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={otpSent}
                  />
                  {errors.confirmPassword && <span className="mt-1 text-xs text-red-600">{errors.confirmPassword}</span>}
                </label>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input className="mt-1 h-4 w-4 rounded border" id="terms" type="checkbox" style={{ borderColor: col("#d0d7e7", "#374151"), accentColor: colors.primary }} disabled={otpSent} />
                <label htmlFor="terms" className="text-sm" style={{ color: col("#6b7280", "#9ca3af") }}>
                  I agree to the{" "}
                  <a className="font-medium hover:underline" style={{ color: colors.primary }} href="#">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            {/* Primary Button: Send OTP or Verify */}
            <div style={{ width: "100%", marginTop: 18 }}>
              {!otpSent ? (
                <button
                  type="submit"
                  disabled={loading || otpLoading}
                  className="mt-6 flex h-11 w-full items-center justify-center rounded-lg px-6 text-base font-semibold shadow-sm transition-colors disabled:opacity-70"
                  style={{ background: colors.primary, color: "#fff", cursor: loading ? "not-allowed" : "pointer" }}
                >
                  {otpLoading ? "Sending OTP..." : "Create Account"}
                </button>
              ) : (
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="submit"
                    disabled={verifyLoading}
                    className="mt-6 flex h-11 flex-1 items-center justify-center rounded-lg px-6 text-base font-semibold shadow-sm transition-colors disabled:opacity-70"
                    style={{ background: colors.primary, color: "#fff", cursor: verifyLoading ? "not-allowed" : "pointer" }}
                  >
                    {verifyLoading ? "Verifying..." : "Verify & Create Account"}
                  </button>

                  <button
                    type="button"
                    onClick={handleEditDetails}
                    className="mt-6 flex h-11 items-center justify-center rounded-lg px-4 text-base font-medium border"
                    style={{ background: "#fff", borderColor: "#d1d5db" }}
                  >
                    Edit Details
                  </button>
                </div>
              )}
            </div>

            {/* Divider / Social buttons kept same UI */}
            <div className="relative mt-6 flex w-full items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: col("#E5E7EB", "#22223B") }}></div>
              </div>
              <div className="relative px-2 text-sm" style={{ background: col("#fff", "rgba(17,22,33,0.5)"), color: col("#6b7280", "#9ca3af") }}>
                OR
              </div>
            </div>

            {/* Social Buttons */}
            <div className="mt-6 flex w-full flex-col gap-3">
              <button type="button" className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2" style={{ borderColor: col("#E5E7EB", "#22223B"), background: col("#fff", colors.backgroundDark), color: col("#1f2937", "#D1D5DB") }}>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24"><path d="M22.5777 12.2592..." fill="#4285F4"></path></svg>
                <span>Sign up with Google</span>
              </button>
              <button type="button" className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2" style={{ borderColor: col("#E5E7EB", "#22223B"), background: col("#fff", colors.backgroundDark), color: col("#1f2937", "#D1D5DB") }}>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24"><path d="M17.4296 16.1102..." stroke="currentColor"></path></svg>
                <span>Sign up with Apple</span>
              </button>
            </div>

            {/* Login Link */}
            <p className="mt-8 text-center text-sm" style={{ color: col("#6b7280", "#9ca3af") }}>
              Already have an account?{" "}
              <a className="font-semibold hover:underline" style={{ color: colors.primary }} href="/login">
                Log In
              </a>
            </p>

            {/* OTP overlay box (visible when otpSent) */}
            {otpSent && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(10,11,13,0.4)",
                  padding: 20,
                  borderRadius: 12,
                }}
              >
                <div style={{ width: "100%", maxWidth: 420, background: col("#fff", "#0b1220"), padding: 18, borderRadius: 10 }}>
                  <h3 style={{ marginBottom: 6 }}>Enter OTP</h3>
                  <p style={{ marginBottom: 12, color: "#6b7280" }}>We sent a 6-digit code to <strong>{formData.email}</strong>. It expires in {OTP_DISPLAY_MINUTES()} minutes.</p>

                  <div style={{ marginBottom: 12 }}>
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="Enter OTP"
                      style={{ width: "100%", padding: 10, borderRadius: 6, borderColor: "#d1d5db" }}
                    />
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={handleVerifyAndSignup} disabled={verifyLoading} className="flex-1" style={{ padding: 10, background: colors.primary, color: "#fff", borderRadius: 6 }}>
                      {verifyLoading ? "Verifying..." : "Verify & Create"}
                    </button>

                    <button onClick={handleResendOtp} disabled={otpLoading || resendCooldown > 0} className="px-4" style={{ padding: 10, background: "#f3f4f6", borderRadius: 6 }}>
                      {otpLoading ? "Resending..." : resendCooldown > 0 ? `Resend (${resendCooldown}s)` : "Resend"}
                    </button>
                  </div>

                  <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <button type="button" onClick={handleEditDetails} style={{ color: "#374151" }}>Edit details</button>
                    <button type="button" onClick={() => { setOtp(""); setServerError(""); }} style={{ color: "#374151" }}>Clear</button>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

// helper to display OTP TTL in minutes (kept value consistent with backend 10 min)
function OTP_DISPLAY_MINUTES() {
  return 10;
}
import React from 'react'
const isDark = false; // Replace with dark mode logic if needed
 const t = isDark;
function get(mode, light, dark) {
  return mode ? dark : light;
}
const colors = {
  primary: "#2563EB",
  backgroundLight: "#FFFFFF",
  backgroundDark: "#111827",
  cardLight: "#F3F4F6",
  cardDark: "#1F2937",
  textLight: "#111827",
  textDark: "#F3F4F6",
  textSubtleLight: "#6B7280",
  textSubtleDark: "#9CA3AF",
};

function Footer() {
  return (
   <footer
          className="text-text-subtle-light dark:text-text-subtle-dark"
          style={{
            background: get(t, colors.cardLight, colors.cardDark),
            color: get(t, colors.textSubtleLight, colors.textSubtleDark)
          }}
        >
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4 md:col-span-1">
                <div className="flex items-center gap-3" style={{ color: get(t, colors.textLight, colors.textDark) }}>
                  <div className="size-6" style={{ color: colors.primary }}>
                    <svg fill="none" viewBox="0 0 48 48">
                      <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold">ShopSmart</h2>
                </div>
                <p className="text-sm">
                  Quality products, unbeatable prices, delivered fast to your door.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:col-span-3">
                {/* 3 Footer Nav Blocks */}
                {[
                  {
                    heading: "Shop",
                    links: ["Categories", "New Arrivals", "Sale", "Gift Cards"],
                  },
                  {
                    heading: "About",
                    links: ["Our Story", "Careers", "Press"],
                  },
                  {
                    heading: "Support",
                    links: ["Contact Us", "FAQ", "Shipping", "Returns"],
                  },
                ].map((col) => (
                  <div key={col.heading}>
                    <h3 className="text-sm font-bold uppercase tracking-wider"
                      style={{ color: get(t, colors.textLight, colors.textDark) }}>
                      {col.heading}
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {col.links.map(txt => (
                        <li key={txt}>
                          <a className="text-sm hover:text-primary transition-colors"
                            style={{ color: get(t, colors.textSubtleLight, colors.textSubtleDark) }} href="#">
                            {txt}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            {/* Newsletter + Social */}
            <div className="mt-12 border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
              style={{ borderColor: get(t, "#D1D5DB", "#374151") }}>
              <form className="flex w-full max-w-sm">
                <input className="form-input w-full rounded-l-lg border-gray-300 dark:border-gray-600"
                  style={{
                    background: get(t, colors.backgroundLight, colors.backgroundDark),
                    color: get(t, colors.textLight, colors.textDark),
                    borderColor: get(t, "#D1D5DB", "#4B5563"),
                  }}
                  placeholder="Enter your email" type="email"
                />
                <button
                  className="px-4 py-2 font-semibold rounded-r-lg hover:bg-primary/90 transition-colors"
                  type="submit"
                  style={{
                    background: colors.primary,
                    color: "#fff"
                  }}
                >Subscribe</button>
              </form>
              <div className="flex space-x-6">
                {/* Social Icons */}
                <a className="hover:text-primary transition-colors" href="#">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path>
                  </svg>
                </a>
                <a className="hover:text-primary transition-colors" href="#">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a className="hover:text-primary transition-colors" href="#">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.156 12.352c.45-.277.733-.78.733-1.352 0-.966-.784-1.75-1.75-1.75s-1.75.784-1.75 1.75c0 .572.283 1.075.733 1.352-1.63.42-2.887 1.83-2.887 3.515v.133h8v-.133c0-1.685-1.257-3.095-2.886-3.515zM9.5 12.1a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" fillRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-8 text-center text-sm">
              <p>© 2024 ShopSmart. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
  )
}

export default Footer
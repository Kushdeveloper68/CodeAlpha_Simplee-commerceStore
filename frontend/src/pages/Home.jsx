// ShopSmart.jsx
import React from "react";
import {TrendingProducts} from "../components"
// Style helpers (define once for reuse)
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

// Optionally, use this for dark mode detection (manual toggle in real use)
const isDark = false; // Replace with dark mode logic if needed
 const t = isDark;
function get(mode, light, dark) {
  return mode ? dark : light;
}



const Testimonial = () => {
  const testimonialData = [
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRmyIZ1ibBi3MDbSHxSmN9GJFPNJ2lXHGc43mQh8yGA3eMJFn7nX711EJwJBcJa3UxaOtwCmR8me63tRIgZEjiQzAYybbIh2CI6b0w4lCLCeP2iowv7cV6Gk91k4fTpTwG0ja_R-2oJG4KPzPdJgxl5HRhcdY7NDpONbpkTFdzwys77b0nOp-b2FhRZXGCrU-Cybe8VYPLqbPiBZef3aE0Cg7_JvbAtTdXuQpt2A1koGiqCJHpYu-I-knf7n4Z1RIcrOYCwLmCSQd9",
    name: "Sarah J.",
    quote:
      "Incredible selection and fast shipping! I found exactly what I was looking for, and it arrived in two days. Will definitely shop here again.",
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOv0O_6C5goDWYQ47U-8RqC3RQ6FnxwVggGQirBpRIxChODGEhAODEq81Lvb-f1gY_Z5Ha_1_FQGQndJIyuk0iJCDNn_nVpJohwUff4Yh8VEWzeLUywHTnFkrYz4QX9e9Q_5cfuHoO_P2cast5q2zq98k5EJEjQ-KjN1PmEIdQ-rKIzv24W8SUmdbG0mgdy-LiKLPC4WmmnNkmnWxxARScfIDvO6XA8CrEGr3BKoQypLM_h7xJSzAkSlD2j5L-TCGNrzvmvutKgmRe",
    name: "Michael B.",
    quote:
      "The quality of the products is top-notch. Customer service was also very helpful when I had a question about my order.",
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk4p-tAU9kln18B0WGDgxCReADFKF1KdaOjcBPrsikV1nYlm_w3DNGVlnQvksiCLsw92_mwzsGO762chuQZ6oc6MrWOQ659fxabOez3GcDmcjeOUtZzK8HbexQPiyokBw2Cb_2aBWDkPgQVqDFHdQmoiIXm-o6-RPL-kZIWCENx4Ur_eSkifkU3nBGrRtzwUp78fdvMoVu8mNwH7LNtkav86V1JDsZJtBL48xElc7SWSBLlNiVR-feUuVA2nG9ycjOBe1n-PzepDvC",
    name: "Emily R.",
    quote:
      "ShopSmart has become my go-to for tech gadgets. The prices are competitive and the website is so easy to navigate.",
  },
];
  return (
     <section className="rounded-lg p-8 sm:p-12"
              style={{ background: get(t, colors.cardLight, colors.cardDark) }}>
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em] text-center mb-8"
                style={{ color: get(t, colors.textLight, colors.textDark) }}>
                What Our Customers Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonialData.map(testi => (
                  <div key={testi.name} className="flex flex-col items-center text-center">
                    <img alt={`Portrait of ${testi.name}`} className="w-20 h-20 rounded-full mb-4" src={testi.img} />
                    <blockquote className="italic"
                      style={{ color: get(t, colors.textSubtleLight, colors.textSubtleDark) }}>
                      "{testi.quote}"
                    </blockquote>
                    <p className="mt-4 font-bold">- {testi.name}</p>
                  </div>
                ))}
              </div>
            </section>
  ) 
}

const Category = () => {

  const categories = [
    {
      title: "Electronics",
      subtitle: "Latest Gadgets",
      img: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA37PrePvXqwXvZI6ecOoJi4j9MKSjYZyS5S2QjoGUZ_KA7SbvFfnz2QhA-_szLWl7UmfqVDPMy0YqFEn1N_3bQWOyccIgDIP4NaMH8UQIO5R_Sso1x0wI-OkSmFpj8hSwcNouFXQbB7uTXPVvWG3HXMaKdkO9rPcHe6ZhCMMOOk33s-PAvhkC14T6RMxttg1q42-kIfuq5oDpDT6h2jcdhlZ58vBUIADESHUYfr8lvk4ORMy4EKEFhtdNT-ct4rwbJJu2eo_elTIWo")',
    },
    {
      title: "Fashion",
      subtitle: "Top Trends",
      img: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBx_os7vTGVyto8ZmEL7dtWfspCsLZBMdN4iP0h1ba9zNY39ggD3XxSUfucWYEvHx5bsjkQh5XwxlgMSiYx0l9IaZZUuRY_tPdJv6pFakOhLHWqBDqVVk-AuKJRnGoVG77cefinpsdMWlyKAOtheBJ8tlmD7M2QRA1R2CYrgu-a1cwduW8RgP4oecaWDcT85bccudx3xxfZhSjp6_nN-JC6OJuDIq4meKXm11AKcr00lvGPU0AwdkkKqEw0JNZs4TkRZy9ST1Y_BdRe")',
    },
    {
      title: "Accessories",
      subtitle: "Must-Have Pieces",
      img: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD1FwMh2zu7jzVvaQwGGG87mkjhcXOLKOjhxj5DDGyiq1O9jksgdg6qziA946IoPztLHycSQqrzKovJLG6WStteQjPH4XXbTAe-fzZXeRd8S2yfTS3gsR9SAJlbS-DM2axRlLjMSNnoIgBxuK4P-eYcmQQRt3GTJSKCjoghfXsBLQMCW28yqO1K7rC-4eQ8d7O5hB59ujUEFekzpuHqoJCLr8-cigvOwEtSiHkZUPknLXHIkQUqKk3wwJcNaijFmSUPkEoY0IXSGtRS")',
    },
    {
      title: "Lifestyle",
      subtitle: "Home & More",
      img: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAtTpftShTf21HccpTGKHrlFiMECS6-r7cT44H8wpsGbHcZRp6HrSBcJtstAmw00D6CwTxY0AYi_QkTXOYF1qufQZ34Bcr7NwJI_k0Nv8ofuLGda7YRqG-UjQIKQWVSzSvn3__cWcwyFeRutAskWS1s9ZwVYQIW0kX_Pn-LVj0CU1PJEyOM-GSbCPVOUJ9Ty0xs8DUA6qBXAVaEFQWroU4ocL93pUjrVDBb85DkONyFDuVspu4FrPc6Vm57s1gQJGWtR238SLAs4big")',
    },
  ];



return (
    <section>
      <h2
        className="text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4 pt-5"
        style={{ color: get(t, colors.textLight, colors.textDark) }}>
        Shop by Category
      </h2>
      <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-full items-stretch p-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <a key={cat.title} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60 group" href="#">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col overflow-hidden transform group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: cat.img }}
              ></div>
              <div>
                <p className="text-lg font-medium leading-normal" style={{ color: get(t, colors.textLight, colors.textDark) }}>
                  {cat.title}
                </p>
                <p className="text-sm font-normal leading-normal" style={{ color: get(t, colors.textSubtleLight, colors.textSubtleDark) }}>
                  {cat.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  
  // Main color mode helpers
 
  return (
    <div
      className="font-display relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden"
      style={{
        backgroundColor: get(t, colors.backgroundLight, colors.backgroundDark),
        color: get(t, colors.textLight, colors.textDark),
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="flex h-full grow flex-col">
        {/* Header */}
        <header
          className="sticky top-0 z-50 flex items-center justify-center border-b border-solid backdrop-blur-sm"
          style={{
            backgroundColor: get(t, "#ffffffcc", "#111827cc"),
            borderColor: get(t, colors.cardLight, colors.cardDark),
          }}
        >
          <div className="flex items-center justify-between whitespace-nowrap px-4 sm:px-10 py-3 w-full max-w-7xl">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3"
                style={{ color: get(t, colors.textLight, colors.textDark) }}>
                <div
                  className="size-6"
                  style={{ color: colors.primary, width: 24, height: 24 }}
                >
                  <svg fill="none" viewBox="0 0 48 48">
                    <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-bold leading-tight" style={{ letterSpacing: "-0.015em" }}>
                  ShopSmart
                </h2>
              </div>
              <nav className="hidden md:flex items-center gap-9">
                {["Categories", "New Arrivals", "Sale"].map((t) => (
                  <a key={t} className="text-sm font-medium leading-normal hover:text-primary transition-colors"
                    style={{ color: get(t, colors.textLight, colors.textDark) }} href="#">
                    {t}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex flex-1 justify-end items-center gap-4">
              <label className="hidden sm:flex flex-col min-w-40 !h-10 max-w-64">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div
                    className="flex border-none items-center justify-center pl-3 rounded-l-lg border-r-0"
                    style={{
                      color: get(t, colors.textSubtleLight, colors.textSubtleDark),
                      background: get(t, colors.cardLight, colors.cardDark),
                    }}>
                    <span className="material-symbols-outlined" style={{
                      fontSize: 20,
                      fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                    }}>search</span>
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none h-full px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
                    style={{
                      color: get(t, colors.textLight, colors.textDark),
                      background: get(t, colors.cardLight, colors.cardDark),
                      placeholder: get(t, colors.textSubtleLight, colors.textSubtleDark)
                    }}
                    placeholder="Search" />
                </div>
              </label>
              <div className="flex gap-2">
                <button
                  className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 transition-colors"
                  style={{ background: get(t, colors.cardLight, colors.cardDark), color: get(t, colors.textLight, colors.textDark) }}>
                  <span className="material-symbols-outlined">person</span>
                </button>
                <button
                  className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 transition-colors"
                  style={{ background: get(t, colors.cardLight, colors.cardDark), color: get(t, colors.textLight, colors.textDark) }}>
                  <span className="material-symbols-outlined">shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
        </header>
        {/* Main Content */}
        <main className="flex flex-1 justify-center py-5 sm:py-10 px-4 sm:px-10">
          <div className="flex flex-col w-full max-w-7xl flex-1 gap-12 sm:gap-16">
            {/* Hero Section */}
            <div>
              <div>
                <div
                  className="flex min-h-[480px] sm:min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-lg items-center justify-center text-center p-6 sm:p-8"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDtIXn8sVo_QoHpmf_-PefKvN4BJaOs6ikvkYmg_yVge-BLgvspy36tiyhIefLBIE9UXUOAUxclavy0_E-Lep4k6PiQJs5uPJEMogNorcQQZAa8zPwSZf9ffRyKUQSJemsLN4F98adS6vFYwnv3JaMxu7Phv06TCDqJLO3ANzMSL8-jiEQwUyxi5E9vFRGh54DglAViHw5NML3N9N9EzBBovRjl_6o-YnHfr-d6d9g-o8cwQBcGuUXSgV6-zV7tqr8LvkqYec8dET5_")',
                  }}>
                  <div className="flex flex-col gap-4 max-w-2xl">
                    <h1 className="text-white text-4xl font-black leading-tight" style={{ letterSpacing: "-0.033em" }}>
                      Shop Smart. Shop Fast.
                    </h1>
                    <h2 className="text-gray-200 text-base font-normal leading-normal">
                      Discover the latest trends in electronics, fashion, and accessories all in one place. Quality products, unbeatable prices.
                    </h2>
                  </div>
                  <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 text-base font-bold leading-normal tracking-[0.015em] shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-300"
                    style={{ background: colors.primary, color: "#fff" }}>
                    <span className="truncate">Shop Now</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Categories */}
            <Category />
            {/* Products */}
           <TrendingProducts/>
            {/* Testimonials */}
           <Testimonial/>
          </div>
        </main>
        {/* Footer */}
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
      </div>
    </div>
  );
}



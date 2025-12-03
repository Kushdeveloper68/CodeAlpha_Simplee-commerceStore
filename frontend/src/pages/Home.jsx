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
        
      </div>
    </div>
  );
}



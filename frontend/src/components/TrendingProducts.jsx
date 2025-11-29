import React from 'react'
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


const products = [
  {
    name: "Wireless Headphones",
    price: "$129.99",
    img:
      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDlXPmrP9gTKzKqsLWD5ue9Oikv_Xc6TsFHaxIs1QDJ6EG51-if23AszJuF8V7MGEoqQjWS4FEGs96O9OAWvJUVTOC8te3IbDqfSHb8YU3uH6HtrHO9M4Iuxo1XgZz5LC00cgWpX4uW8S3b8B87Ez7tbVWrZ0zzeRiSU2avPe4Ejk16dwLJvht2sdFU-_I21J__OVHKBgyENDoXwcy6Wov62UvzxcZC8Jg2je7rLchAtIdvJhprVOxN0w3F9-AI5q_DLVzv8sy6IOzT")',
  },
  {
    name: "Smartwatch Series 8",
    price: "$399.00",
    img:
      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC6dOvurR7E8fKqUrFeOWQAft-esbBTM7V-D5PayegFujXA-rAUgope9fEcBmgX7uRhRRerDtaGU-WUT53c2hHPwXKsPAgrSa1Pgf-Y4_tEMKJON_fvojoUg2FWtdIU9NbskSLUnc0PFkIf49ifosIvrKn5zrgoCVCeU3zJgMASddYUkVHUAPjsgeRzMlLjCjk5Y0GrocTD41t7JAuWaRaI2a63EIvYfJYRjbJpJ5V-looQDxUIy2IcoojYQ-GCz8vCzFfYAGGdwQbY")',
  },
  {
    name: "Minimalist Backpack",
    price: "$85.50",
    img:
      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAPR1AKIcDg8t3Tbe6MfJnnN-IDR5Zu9FmN9YAfrULgjFmMO7uigMoWP5vHBN0chNZ-t3X_f9vqnZ2WOLzo9lO69bPWZXebF7q3tKsD5wH7kw56PFbtLlybCzF1FQUjNHWtOGEPRLGnoSxZa_xVw_71Pvvy7eF8Pmte4frhflfan2BwS0rsW_sTLAJ9DN-5te99I5zNc3WpuzyWngjlzlR9KLvYICtVzDj7SvDbGuMgKRLjudt2ghW7RQI3osrLmqqayAWdAOkC0uDn")',
  },
  {
    name: "Running Sneakers",
    price: "$110.00",
    img:
      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCRTmqKDkPAyPPB5BrS_t6AecKFfOatG-TiqO8QtPN5FExLk9i3IMg55d3xrBlS23UDHKoz1M6SnCYAhERKqzNVMIdDJ77dbAaPvh4Z1jwQh51Uw3nhB6p_dAW4QcBQQSywDXU5S2l7oB2rgVpihOXZAWV-g-57xv6w54vmENBlIEL2M43i2S2iSSRpNVKPfmpTXkfR6r2KAMSpK4IcJOd__WB22-oTYJQN1jlNQr1jnXXCSDQSFHjWytrJVowVVOjclW0qI03u2vZM")',
  },
  {
    img: "url(https://lh3.googleusercontent.com/aida-public/AB6AXuAvgQrEuu03DSw0t2i0PVO26YLGqaGar7GX2MD7YsmpK9JPnrPS5cLYrlNJdS10__SeWUaFVNC-4uGOlz0edjuRbNFyY1XujBkfyRKEFt0B2cY47iPlgRz6PIMCoWDghEtCrWNd6c60bV2B6rFP87OVL8djxOfQAIpsMUc9JDC7Y-OF-eG5rwrYrYwoUjJp8hHLl21e34MUlfYJrpPk2k0X8ULkvBiiwIH7YxSNla4BMHOShXkeSB7VpqrLDfYW9l2hsWI-ksgM7z_3)",
    name: "AURA Mouse",
    price: "$79.00",
  },
  {
    img: "url(https://lh3.googleusercontent.com/aida-public/AB6AXuBXFFsRk6Dve3_ASqAVEHO4hGzlR--0NEK_DHegggwJjwGjRpCFjuXxVzAZXdEyQOnkg4HZlfQm0HsJs8eMGGfv-uYXVwkp8Ims1S8FO0BV0H4ONmCw8JhOa2HRg9gdZJHc84XKsHlfxUC65idXgHH-GdXk57F7DTOJdr7XMz1RtTPHbpFkJ1oj9ojU_a2t7F-QHhKpSxUoqWh0eCU2aUDa14VCp3Zm5J8DBH_JZajrRGYn1ifTtzEAv6mF7VMeyEz7BaJvG6aZDUyw)",
    name: "AURA Keyboard",
    price: "$149.00",
  },
   {
    img: "url(https://lh3.googleusercontent.com/aida-public/AB6AXuDzz4-TTUpJUiMEyFvv431pHm4edxCXnbhD33DfF_D6ChZUU4V3twPyrTZJnC6_ReSiLXtePR-9fIuti13TOHOKoqUdW6TA4l2cPkr0VyH9Pf_uQoNEmNIOOnTAgOcdSJelDWL8IPXaazVpyspzMpq6jTYqMo7ys4bpnIRq5ueVNirWkQ18uvBc4tTe8MpDJiM7-ZVGBn3WIk5liHIvVKGyf1eBxPnB6yCmi8mZL-PqnjjiZhJEPMGWcKcqYfqWNRy-uhiihr0MP_YC)",
    name: "AURA Headphones",
    price: "$249.00",
  },
  {
    img: "url(https://lh3.googleusercontent.com/aida-public/AB6AXuBaF5qGl3dIRj9Ux8L6XlV6hMriXfrAdadCmwi4SXM289zObWfuBPVY43AIAibjvup1rL8xuEifIEiYWFlNeBIjdsXtpzhOT7azCoemaI4CvZxKeKtSY4Vb_skhifgrmPMxznDI6CPa-mfF868vMTkr1d7Gf61m27vBKzd3m_HxTZV9XaSE_OMxwSQhnXDjc_Y9aIdbWbEsaXpuLhFveO845CItS0fnwSIf1G5ZqpvWgf-My4N0SJyOYZZGMfO1FVBswiBV4VsKq8NS)",
    name: "AURA Webcam",
    price: "$199.00",
  }
];
const isDark = false; // Replace with dark mode logic if needed
const t = isDark;
function get(mode, light, dark) {
  return mode ? dark : light;
}

function TrendingProducts() {
  return (
    <section>
      <h2
        className="text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4 pt-5"
        style={{ color: get(t, colors.textLight, colors.textDark) }}>
        Trending Now
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {products.map((p) => (
          <div
            key={p.name}
            className="flex flex-col gap-4 rounded-lg p-4 group overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            style={{ background: get(t, colors.cardLight, colors.cardDark) }}
          >
            <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{ backgroundImage: p.img }} />
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-medium leading-normal truncate"
                style={{ color: get(t, colors.textLight, colors.textDark) }}>{p.name}</h3>
              <p className="text-lg font-bold"
                style={{ color: colors.primary }}>{p.price}</p>
            </div>
            <button className="flex items-center justify-center w-full rounded-lg h-10 px-4 text-sm font-bold transition-colors duration-300"
              style={{
                background: get(t, "rgba(37,99,235,0.2)", "rgba(37,99,235,0.3)"),
                color: colors.primary,
              }}>
              <span className="material-symbols-outlined text-base mr-2">add_shopping_cart</span>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrendingProducts
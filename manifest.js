export default function manifest() {
  return {
    name: "Tạp Hóa MMO",
    short_name: "MMO",
    description: "Nền tảng thương mại điện tử chuyên về sản phẩm số.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      }, {
        src: "/icons/icon-256x256.png",
        sizes: "256x256",
        type: "image/png"
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  }
}